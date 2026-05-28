<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '@/services/api.ts'

type ChatbotCompany = {
  company_key: string
  company_name: string
}

type ChatbotConversationSummary = {
  conversation_id: string
  company_key: string
  company_name: string
  language: string
  status: string
  message_count: number
  preview: string | null
  created_at: string | null
  updated_at: string | null
  expires_at: string | null
}

type ChatbotMessage = {
  message_id: number
  sequence_number: number
  role: string
  content: string
  created_at: string | null
}

type ChatbotConversationDetail = ChatbotConversationSummary & {
  ended_at: string | null
  messages: ChatbotMessage[]
}

const { t, locale } = useI18n()
const router = useRouter()

const isLoading = ref(true)
const reloadLoading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const openConversationId = ref<string | null>(null)
const loadingDetailId = ref<string | null>(null)
const deleteLoadingConversationId = ref<string | null>(null)
const selectedCompanyKey = ref('')

const deleteStage = ref<Record<string, number>>({})
const detailsById = reactive<Record<string, ChatbotConversationDetail | undefined>>({})
const companies = ref<ChatbotCompany[]>([])
const conversations = ref<ChatbotConversationSummary[]>([])

async function goBack() {
  await router.push('/account')
}

function formatDate(dateString: string | null) {
  if (!dateString) return '-'

  try {
    return new Intl.DateTimeFormat(locale.value === 'de' ? 'de-CH' : 'en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(dateString))
  } catch {
    return dateString
  }
}

function getDeleteStage(conversationId: string) {
  return deleteStage.value[conversationId] ?? 0
}

function getStatusLabel(status: string) {
  const normalized = String(status || '').toLowerCase()
  if (normalized === 'completed') return t('accountPage.chatbotStatusCompleted')
  if (normalized === 'rejected') return t('accountPage.chatbotStatusRejected')
  if (normalized === 'error') return t('accountPage.chatbotStatusError')
  return t('accountPage.chatbotStatusActive')
}

function getRoleLabel(role: string) {
  return role === 'user' ? t('accountPage.chatbotUser') : t('accountPage.chatbotAssistant')
}

function startDelete(conversationId: string) {
  successMsg.value = ''
  errorMsg.value = ''
  deleteStage.value[conversationId] = 1
}

function continueDelete(conversationId: string) {
  deleteStage.value[conversationId] = 2
}

function cancelDelete(conversationId: string) {
  deleteStage.value[conversationId] = 0
}

async function loadCompanies() {
  const response = await api.get('/api/admin/chatbot/companies')
  companies.value = response.data?.data ?? []

  if (!selectedCompanyKey.value && companies.value.length) {
    selectedCompanyKey.value = companies.value[0]?.company_key ?? ''
  }
}

async function loadConversations(showLoader = true) {
  if (!selectedCompanyKey.value) {
    conversations.value = []
    return
  }

  if (showLoader) {
    isLoading.value = true
  } else {
    reloadLoading.value = true
  }

  errorMsg.value = ''

  try {
    const response = await api.get('/api/admin/chatbot/conversations', {
      params: {
        companyKey: selectedCompanyKey.value,
      },
    })
    conversations.value = response.data?.data ?? []
    openConversationId.value = null
  } catch (error: any) {
    console.error('Error loading chatbot conversations:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.chatbotConversationsError')
  } finally {
    isLoading.value = false
    reloadLoading.value = false
  }
}

async function loadDetail(conversationId: string) {
  if (detailsById[conversationId]) return

  loadingDetailId.value = conversationId

  try {
    const response = await api.get(`/api/admin/chatbot/conversations/${conversationId}`)
    detailsById[conversationId] = response.data?.data
  } catch (error: any) {
    console.error('Error loading chatbot conversation:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.chatbotConversationError')
  } finally {
    loadingDetailId.value = null
  }
}

async function toggleConversation(conversationId: string) {
  successMsg.value = ''
  errorMsg.value = ''

  if (openConversationId.value === conversationId) {
    openConversationId.value = null
    return
  }

  openConversationId.value = conversationId
  await loadDetail(conversationId)
}

async function reloadConversations() {
  successMsg.value = ''
  errorMsg.value = ''
  await loadConversations(false)
}

async function confirmDelete(conversationId: string) {
  successMsg.value = ''
  errorMsg.value = ''
  deleteLoadingConversationId.value = conversationId

  try {
    const response = await api.delete(`/api/admin/chatbot/conversations/${conversationId}`)
    deleteStage.value[conversationId] = 0
    delete detailsById[conversationId]

    if (openConversationId.value === conversationId) {
      openConversationId.value = null
    }

    successMsg.value = response.data?.message || t('accountPage.chatbotConversationDeletedSuccess')
    await loadConversations(false)
  } catch (error: any) {
    console.error('Error deleting chatbot conversation:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.deleteChatbotConversationError')
  } finally {
    deleteLoadingConversationId.value = null
  }
}

watch(selectedCompanyKey, async (current, previous) => {
  if (current && previous && current !== previous) {
    await loadConversations(false)
  }
})

onMounted(async () => {
  isLoading.value = true
  errorMsg.value = ''

  try {
    await loadCompanies()
    await loadConversations()
  } catch (error: any) {
    console.error('Error loading chatbot companies:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.chatbotCompaniesError')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="admin-page">
    <div class="admin-wrapper">
      <div class="hero-card">
        <div class="top-row">
          <button class="nav-icon-button" @click="goBack" :title="t('accountPage.back')">&larr;</button>

          <button
            class="nav-icon-button"
            :disabled="reloadLoading"
            @click="reloadConversations"
            :title="reloadLoading ? t('authPage.loading') : t('accountPage.reloadChatbotConversations')"
          >
            &#8635;
          </button>
        </div>

        <h1>{{ t('accountPage.chatbotConversationsTitle') }}</h1>
        <p class="subtitle">{{ t('accountPage.chatbotConversationsText') }}</p>

        <label class="company-select-label" for="chatbot-company">
          {{ t('accountPage.chatbotCompanyLabel') }}
        </label>
        <select
          id="chatbot-company"
          v-model="selectedCompanyKey"
          class="company-select"
          :disabled="companies.length <= 1"
        >
          <option v-for="company in companies" :key="company.company_key" :value="company.company_key">
            {{ company.company_name }}
          </option>
        </select>
      </div>

      <div v-if="successMsg" class="status-bar success-bar">
        {{ successMsg }}
      </div>

      <div v-if="errorMsg" class="status-bar error-bar">
        {{ errorMsg }}
      </div>

      <div v-if="isLoading" class="state-card">
        <p>{{ t('accountPage.chatbotConversationsLoading') }}</p>
      </div>

      <div v-else-if="!conversations.length" class="state-card">
        <p>{{ t('accountPage.chatbotConversationsEmpty') }}</p>
      </div>

      <div v-else class="list">
        <div
          v-for="conversation in conversations"
          :key="conversation.conversation_id"
          class="accordion-item"
        >
          <button class="accordion-header" @click="toggleConversation(conversation.conversation_id)">
            <div class="accordion-main">
              <div class="conversation-main">
                <span class="primary-text">
                  {{ conversation.preview || t('accountPage.chatbotNoPreview') }}
                </span>

                <span class="subject-preview">
                  {{ getStatusLabel(conversation.status) }} &middot;
                  {{ conversation.language.toUpperCase() }} &middot;
                  {{ conversation.message_count }} {{ t('accountPage.chatbotMessagesLabel') }}
                </span>
              </div>

              <div class="meta-side">
                <span class="secondary-text">{{ formatDate(conversation.created_at) }}</span>
              </div>
            </div>
          </button>

          <div v-if="openConversationId === conversation.conversation_id" class="accordion-body">
            <div class="details-grid">
              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.chatbotCompanyLabel') }}</span>
                <span class="detail-value">{{ conversation.company_name }}</span>
              </div>

              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.chatbotStatusLabel') }}</span>
                <span class="detail-value">{{ getStatusLabel(conversation.status) }}</span>
              </div>

              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.chatbotCreated') }}</span>
                <span class="detail-value">{{ formatDate(conversation.created_at) }}</span>
              </div>

              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.chatbotExpires') }}</span>
                <span class="detail-value">{{ formatDate(conversation.expires_at) }}</span>
              </div>
            </div>

            <div v-if="loadingDetailId === conversation.conversation_id" class="state-card detail-loading">
              <p>{{ t('accountPage.chatbotConversationLoading') }}</p>
            </div>

            <div v-else class="message-thread">
              <div
                v-for="message in detailsById[conversation.conversation_id]?.messages || []"
                :key="message.message_id || message.sequence_number"
                class="message-row"
                :class="message.role === 'user' ? 'message-user' : 'message-assistant'"
              >
                <div class="message-bubble">
                  <div class="message-meta">
                    <span>{{ getRoleLabel(message.role) }}</span>
                    <span>{{ formatDate(message.created_at) }}</span>
                  </div>
                  <p>{{ message.content }}</p>
                </div>
              </div>
            </div>

            <div class="action-row">
              <button
                class="danger-button"
                :disabled="deleteLoadingConversationId === conversation.conversation_id"
                @click.stop="startDelete(conversation.conversation_id)"
              >
                {{ t('accountPage.deleteChatbotConversation') }}
              </button>
            </div>

            <div v-if="getDeleteStage(conversation.conversation_id) >= 1" class="delete-warning-box">
              <p>{{ t('accountPage.deleteChatbotConversationWarning') }}</p>

              <div class="delete-actions">
                <button
                  v-if="getDeleteStage(conversation.conversation_id) === 1"
                  class="danger-button"
                  @click.stop="continueDelete(conversation.conversation_id)"
                >
                  {{ t('accountPage.deleteStepTwo') }}
                </button>

                <button
                  v-if="getDeleteStage(conversation.conversation_id) === 2"
                  class="danger-button"
                  :disabled="deleteLoadingConversationId === conversation.conversation_id"
                  @click.stop="confirmDelete(conversation.conversation_id)"
                >
                  {{ t('accountPage.deleteConfirm') }}
                </button>

                <button class="secondary-button" @click.stop="cancelDelete(conversation.conversation_id)">
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
  margin: 0 0 1.2rem;
  color: #cfcfcf;
  line-height: 1.6;
  max-width: 760px;
}

.company-select-label {
  display: block;
  color: #9ea4aa;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 0.45rem;
  text-transform: uppercase;
}

.company-select {
  width: min(360px, 100%);
  background-color: #1b1b1b;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  color: #ffffff;
  font: inherit;
  padding: 0.8rem 0.9rem;
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

.error-bar {
  background-color: rgba(255, 123, 123, 0.12);
  border: 1px solid rgba(255, 123, 123, 0.25);
  color: #ff7b7b;
}

.state-card {
  margin-bottom: 1rem;
}

.detail-loading {
  margin-top: 1rem;
  padding: 1rem;
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

.conversation-main {
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

.subject-preview {
  color: #42b883;
  font-size: 0.9rem;
  font-weight: 600;
  word-break: break-word;
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

.message-thread {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 1.1rem;
}

.message-row {
  display: flex;
}

.message-user {
  justify-content: flex-end;
}

.message-assistant {
  justify-content: flex-start;
}

.message-bubble {
  max-width: min(760px, 88%);
  background-color: #262626;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 0.95rem 1rem;
}

.message-user .message-bubble {
  background-color: rgba(66, 184, 131, 0.14);
  border-color: rgba(66, 184, 131, 0.28);
}

.message-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.7rem;
  color: #9ea4aa;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 0.45rem;
  text-transform: uppercase;
}

.message-bubble p {
  margin: 0;
  color: #f1f1f1;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.secondary-button,
.danger-button {
  border: none;
  border-radius: 10px;
  padding: 0.78rem 1.05rem;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
}

.secondary-button:hover,
.danger-button:hover {
  transform: translateY(-1px);
}

.secondary-button {
  background-color: transparent;
  color: #d0d0d0;
  border: 1px solid #3a3a3a;
}

.danger-button {
  background-color: #9b3535;
  color: white;
}

.secondary-button:disabled,
.danger-button:disabled {
  cursor: not-allowed;
  transform: none;
  opacity: 0.6;
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

  .message-bubble {
    max-width: 100%;
  }
}
</style>
