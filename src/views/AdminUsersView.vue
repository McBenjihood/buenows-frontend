<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '@/services/api.ts'

const { t } = useI18n()
const router = useRouter()

const isLoading = ref(true)
const errorMsg = ref('')
const successMsg = ref('')
const openUserId = ref<string | null>(null)
const roleLoadingUserId = ref<string | null>(null)
const deleteLoadingUserId = ref<string | null>(null)
const saveLoadingUserId = ref<string | null>(null)
const reloadLoading = ref(false)

const deleteStage = ref<Record<string, number>>({})
const editMode = ref<Record<string, boolean>>({})
const editFields = reactive<Record<string, { first_name: string; last_name: string }>>({})

const adminUsers = ref<
  {
    user_id: string
    email: string
    first_name: string | null
    last_name: string | null
    authorities: string[]
    created_at: string | null
  }[]
>([])

async function goBack() {
  await router.push('/account')
}

function toggleUser(id: string) {
  openUserId.value = openUserId.value === id ? null : id
  successMsg.value = ''
  errorMsg.value = ''

  const user = adminUsers.value.find((entry) => entry.user_id === id)
  if (user && !editFields[id]) {
    editFields[id] = {
      first_name: user.first_name ?? '',
      last_name: user.last_name ?? '',
    }
  }
}

function getDeleteStage(userId: string) {
  return deleteStage.value[userId] ?? 0
}

function startDelete(userId: string) {
  deleteStage.value[userId] = 1
  successMsg.value = ''
  errorMsg.value = ''
}

function continueDelete(userId: string) {
  deleteStage.value[userId] = 2
}

function cancelDelete(userId: string) {
  deleteStage.value[userId] = 0
}

function startEditing(userId: string) {
  const user = adminUsers.value.find((entry) => entry.user_id === userId)
  if (!user) return

  editFields[userId] = {
    first_name: user.first_name ?? '',
    last_name: user.last_name ?? '',
  }

  editMode.value[userId] = true
}

function cancelEditing(userId: string) {
  const user = adminUsers.value.find((entry) => entry.user_id === userId)
  if (!user) return

  editFields[userId] = {
    first_name: user.first_name ?? '',
    last_name: user.last_name ?? '',
  }

  editMode.value[userId] = false
}

function hasUnsavedChanges(userId: string) {
  const user = adminUsers.value.find((entry) => entry.user_id === userId)
  const fields = editFields[userId]

  if (!user || !fields) return false

  return (
    (fields.first_name ?? '').trim() !== (user.first_name ?? '').trim() ||
    (fields.last_name ?? '').trim() !== (user.last_name ?? '').trim()
  )
}

function formatDate(dateString: string | null) {
  if (!dateString) return '-'

  try {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(dateString))
  } catch {
    return dateString
  }
}

function getRoleClass(authorities: string[] = []) {
  if (authorities.includes('ROLE_ADMIN')) return 'role-chip role-admin'
  if (authorities.includes('ROLE_USER')) return 'role-chip role-user'
  return 'role-chip'
}

async function loadUsers(showLoader = true) {
  if (showLoader) {
    isLoading.value = true
  } else {
    reloadLoading.value = true
  }

  errorMsg.value = ''

  try {
    const response = await api.get('/api/admin/users')
    adminUsers.value = response.data?.data ?? []

    for (const user of adminUsers.value) {
      editFields[user.user_id] = {
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
      }
    }
  } catch (error: any) {
    console.error('Error loading users:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.usersError')
  } finally {
    isLoading.value = false
    reloadLoading.value = false
  }
}

async function reloadUsers() {
  successMsg.value = ''
  errorMsg.value = ''
  await loadUsers(false)
}

async function updateRole(userId: string, nextRole: 'ROLE_USER' | 'ROLE_ADMIN') {
  roleLoadingUserId.value = userId
  successMsg.value = ''
  errorMsg.value = ''

  try {
    const response = await api.put(`/api/admin/users/${userId}/role`, {
      role: nextRole,
    })

    successMsg.value = response.data?.message || t('accountPage.roleUpdatedSuccess')
    await loadUsers(false)
  } catch (error: any) {
    console.error('Error updating role:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.roleUpdateError')
  } finally {
    roleLoadingUserId.value = null
  }
}

async function saveProfile(userId: string) {
  if (!hasUnsavedChanges(userId)) return

  saveLoadingUserId.value = userId
  successMsg.value = ''
  errorMsg.value = ''

  try {
    const fields = editFields[userId]

    const response = await api.put(`/api/admin/users/${userId}/profile`, {
      first_name: fields.first_name,
      last_name: fields.last_name,
    })

    successMsg.value = response.data?.message || t('accountPage.userProfileUpdatedSuccess')
    editMode.value[userId] = false
    await loadUsers(false)
  } catch (error: any) {
    console.error('Error updating user profile:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.userProfileUpdateError')
  } finally {
    saveLoadingUserId.value = null
  }
}

async function confirmDelete(userId: string) {
  deleteLoadingUserId.value = userId
  successMsg.value = ''
  errorMsg.value = ''

  try {
    const response = await api.delete(`/api/admin/users/${userId}`)

    deleteStage.value[userId] = 0

    if (openUserId.value === userId) {
      openUserId.value = null
    }

    successMsg.value = response.data?.message || t('accountPage.userDeletedSuccess')
    await loadUsers(false)
  } catch (error: any) {
    console.error('Error deleting user:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.deleteUserError')
  } finally {
    deleteLoadingUserId.value = null
  }
}

onMounted(async () => {
  await loadUsers()
})
</script>

<template>
  <section class="admin-page">
    <div class="admin-wrapper">
      <div class="hero-card">
        <div class="top-row">
          <button class="nav-icon-button" @click="goBack" :title="t('editorPage.back')">←</button>

          <button
            class="nav-icon-button"
            :disabled="reloadLoading"
            @click="reloadUsers"
            :title="reloadLoading ? 'Loading...' : 'Reload users'"
          >
            ↻
          </button>
        </div>

        <h1>{{ t('accountPage.usersTitle') }}</h1>
        <p class="subtitle">{{ t('accountPage.usersText') }}</p>
      </div>

      <div v-if="successMsg" class="status-bar success-bar">
        {{ successMsg }}
      </div>

      <div v-if="isLoading" class="state-card">
        <p>{{ t('accountPage.usersLoading') }}</p>
      </div>

      <div v-else-if="errorMsg" class="state-card">
        <p class="error-text">{{ errorMsg }}</p>
      </div>

      <div v-else-if="!adminUsers.length" class="state-card">
        <p>{{ t('accountPage.usersEmpty') }}</p>
      </div>

      <div v-else class="list">
        <div v-for="user in adminUsers" :key="user.user_id" class="accordion-item">
          <button class="accordion-header" @click="toggleUser(user.user_id)">
            <div class="accordion-main">
              <div class="user-main">
                <span class="primary-text">{{ user.email }}</span>
                <span :class="getRoleClass(user.authorities)">
                  {{ user.authorities?.join(', ') || '-' }}
                </span>
              </div>

              <div class="meta-side">
                <span class="secondary-text">{{ formatDate(user.created_at) }}</span>
              </div>
            </div>
          </button>

          <div v-if="openUserId === user.user_id" class="accordion-body">
            <div class="details-grid">
              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.userFirstName') }}</span>

                <template v-if="editMode[user.user_id]">
                  <input
                    v-model="editFields[user.user_id].first_name"
                    class="edit-input"
                    type="text"
                  />
                </template>
                <template v-else>
                  <span class="detail-value">{{ user.first_name || '-' }}</span>
                </template>
              </div>

              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.userLastName') }}</span>

                <template v-if="editMode[user.user_id]">
                  <input
                    v-model="editFields[user.user_id].last_name"
                    class="edit-input"
                    type="text"
                  />
                </template>
                <template v-else>
                  <span class="detail-value">{{ user.last_name || '-' }}</span>
                </template>
              </div>

              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.roleLabel') }}</span>
                <span class="detail-value">{{ user.authorities?.join(', ') || '-' }}</span>
              </div>

              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.userCreated') }}</span>
                <span class="detail-value">{{ formatDate(user.created_at) }}</span>
              </div>
            </div>

            <div class="action-row">
              <button
                v-if="!user.authorities?.includes('ROLE_ADMIN')"
                class="primary-button"
                :disabled="roleLoadingUserId === user.user_id"
                @click.stop="updateRole(user.user_id, 'ROLE_ADMIN')"
              >
                {{ t('accountPage.makeAdmin') }}
              </button>

              <button
                v-else
                class="secondary-button"
                :disabled="roleLoadingUserId === user.user_id"
                @click.stop="updateRole(user.user_id, 'ROLE_USER')"
              >
                {{ t('accountPage.makeUser') }}
              </button>

              <button
                v-if="!editMode[user.user_id]"
                class="secondary-button"
                @click.stop="startEditing(user.user_id)"
              >
                {{ t('accountPage.editUser') }}
              </button>

              <button v-else class="secondary-button" @click.stop="cancelEditing(user.user_id)">
                {{ t('accountPage.cancel') }}
              </button>

              <button
                class="save-button"
                :class="{ 'save-button-active': hasUnsavedChanges(user.user_id) }"
                :disabled="saveLoadingUserId === user.user_id || !hasUnsavedChanges(user.user_id)"
                @click.stop="saveProfile(user.user_id)"
              >
                {{ t('accountPage.saveUser') }}
              </button>

              <button
                class="danger-button"
                :disabled="deleteLoadingUserId === user.user_id"
                @click.stop="startDelete(user.user_id)"
              >
                {{ t('accountPage.deleteUser') }}
              </button>
            </div>

            <div v-if="getDeleteStage(user.user_id) >= 1" class="delete-warning-box">
              <p>{{ t('accountPage.deleteWarning') }}</p>

              <div class="delete-actions">
                <button
                  v-if="getDeleteStage(user.user_id) === 1"
                  class="danger-button"
                  @click.stop="continueDelete(user.user_id)"
                >
                  {{ t('accountPage.deleteStepTwo') }}
                </button>

                <button
                  v-if="getDeleteStage(user.user_id) === 2"
                  class="danger-button"
                  :disabled="deleteLoadingUserId === user.user_id"
                  @click.stop="confirmDelete(user.user_id)"
                >
                  {{ t('accountPage.deleteConfirm') }}
                </button>

                <button class="secondary-button" @click.stop="cancelDelete(user.user_id)">
                  {{ t('accountPage.cancel') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
  padding: 4rem 2rem;
}

.admin-wrapper {
  max-width: 1100px;
  margin: 0 auto;
}

.hero-card,
.state-card {
  background-color: #252525;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.hero-card {
  margin-bottom: 1.25rem;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.4rem;
}

.nav-icon-button {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #3a3a3a;
  background: transparent;
  color: #e1e1e1;
  font-size: 1.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease,
    border-color 0.2s ease;
}

.nav-icon-button:hover {
  background-color: #2b2b2b;
  border-color: #4a4a4a;
}

.nav-icon-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hero-card h1 {
  margin: 0 0 0.75rem 0;
  font-size: 2.2rem;
}

.subtitle {
  margin: 0;
  color: #cfcfcf;
  line-height: 1.6;
  max-width: 700px;
}

.status-bar {
  border-radius: 14px;
  padding: 0.95rem 1.15rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.success-bar {
  background-color: rgba(66, 184, 131, 0.12);
  border: 1px solid rgba(66, 184, 131, 0.25);
  color: #42b883;
}

.state-card {
  margin-bottom: 1rem;
}

.error-text {
  color: #ff7b7b;
  font-weight: 600;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.accordion-item {
  background-color: #252525;
  border: 1px solid #343434;
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.accordion-item:hover {
  border-color: #444;
}

.accordion-header {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 1rem 1.2rem;
  text-align: left;
}

.accordion-header:hover {
  background-color: #2a2a2a;
}

.accordion-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.user-main {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
}

.primary-text {
  font-weight: 700;
  color: #ffffff;
  word-break: break-word;
  font-size: 1rem;
}

.role-chip {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  padding: 0.28rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 700;
  border: 1px solid transparent;
}

.role-admin {
  background-color: rgba(88, 101, 242, 0.14);
  color: #93a0ff;
  border-color: rgba(88, 101, 242, 0.24);
}

.role-user {
  background-color: rgba(66, 184, 131, 0.12);
  color: #42b883;
  border-color: rgba(66, 184, 131, 0.2);
}

.meta-side {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.secondary-text {
  color: #aeb3b9;
  font-size: 0.92rem;
  text-align: right;
}

.accordion-body {
  border-top: 1px solid #343434;
  background-color: #202020;
  padding: 1.2rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.detail-box {
  background-color: #262626;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.detail-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ea4aa;
  font-weight: 700;
}

.detail-value {
  color: #f1f1f1;
  font-weight: 600;
  word-break: break-word;
}

.edit-input {
  background-color: #1b1b1b;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  color: white;
  padding: 0.7rem 0.8rem;
  font-size: 0.95rem;
  font-family: inherit;
}

.edit-input:focus {
  outline: none;
  border-color: #42b883;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.primary-button,
.secondary-button,
.danger-button,
.save-button {
  border: none;
  border-radius: 10px;
  padding: 0.78rem 1.05rem;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.primary-button:hover,
.secondary-button:hover,
.danger-button:hover,
.save-button:hover {
  transform: translateY(-1px);
}

.primary-button {
  background-color: #42b883;
  color: white;
}

.secondary-button {
  background-color: transparent;
  color: #d0d0d0;
  border: 1px solid #3a3a3a;
}

.save-button {
  background-color: #3a3a3a;
  color: #bcbcbc;
}

.save-button-active {
  background-color: #42b883;
  color: white;
}

.save-button:disabled {
  cursor: not-allowed;
  transform: none;
  opacity: 1;
}

.danger-button {
  background-color: #9b3535;
  color: white;
}

.delete-warning-box {
  margin-top: 1rem;
  border: 1px solid #5f2f2f;
  background-color: #2b1c1c;
  border-radius: 12px;
  padding: 1rem;
}

.delete-warning-box p {
  margin: 0;
  color: #ffd4d4;
  line-height: 1.5;
}

.delete-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.85rem;
}

@media (max-width: 768px) {
  .admin-page {
    padding: 2rem 1rem;
  }

  .hero-card,
  .state-card {
    padding: 1.4rem;
  }

  .hero-card h1 {
    font-size: 1.8rem;
  }

  .accordion-main {
    flex-direction: column;
    align-items: flex-start;
  }

  .meta-side {
    width: 100%;
    justify-content: space-between;
  }

  .secondary-text {
    text-align: left;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
