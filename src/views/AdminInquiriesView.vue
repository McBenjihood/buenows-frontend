<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import api from '@/services/api.ts'

const { t } = useI18n()
const router = useRouter()

const isLoading = ref(true)
const errorMsg = ref('')
const successMsg = ref('')
const reloadLoading = ref(false)
const deleteLoadingInquiryId = ref<number | null>(null)
const openInquiryId = ref<number | null>(null)
const deleteStage = ref<Record<number, number>>({})
const currentPage = ref(0)
const pageSize = 20
const hasNextPage = ref(false)

type PageResponse<T> = {
  items: T[]
  page: number
  size: number
  has_next: boolean
}

type Inquiry = {
  inquiry_id: number
  email: string
  title: string
  message: string
  created_at: string | null
}

const inquiries = ref<Inquiry[]>([])

function readPageResponse<T>(payload: unknown): PageResponse<T> {
  if (payload && typeof payload === 'object' && Array.isArray((payload as PageResponse<T>).items)) {
    return payload as PageResponse<T>
  }

  const items = Array.isArray(payload) ? (payload as T[]) : []
  return {
    items: items.slice(0, pageSize),
    page: currentPage.value,
    size: pageSize,
    has_next: items.length > pageSize,
  }
}

async function goBack() {
  await router.push('/account')
}

function toggleInquiry(id: number) {
  openInquiryId.value = openInquiryId.value === id ? null : id
  successMsg.value = ''
  errorMsg.value = ''
}

function getDeleteStage(inquiryId: number) {
  return deleteStage.value[inquiryId] ?? 0
}

function startDelete(inquiryId: number) {
  successMsg.value = ''
  errorMsg.value = ''

  if (!Number.isInteger(inquiryId) || inquiryId <= 0) {
    errorMsg.value = 'Ungültige Anfrage-ID.'
    return
  }

  deleteStage.value[inquiryId] = 1
}

function continueDelete(inquiryId: number) {
  if (!Number.isInteger(inquiryId) || inquiryId <= 0) {
    errorMsg.value = 'Ungültige Anfrage-ID.'
    deleteStage.value[inquiryId] = 0
    return
  }

  deleteStage.value[inquiryId] = 2
}

function cancelDelete(inquiryId: number) {
  deleteStage.value[inquiryId] = 0
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

async function loadInquiries(showLoader = true) {
  if (showLoader) {
    isLoading.value = true
  } else {
    reloadLoading.value = true
  }

  errorMsg.value = ''

  try {
    const response = await api.get('/api/admin/inquiries', {
      params: {
        page: currentPage.value,
        size: pageSize,
      },
    })
    const pageData = readPageResponse<Inquiry>(response.data?.data)
    const loadedInquiries = pageData.items

    if (!loadedInquiries.length && currentPage.value > 0) {
      currentPage.value -= 1
      await loadInquiries(false)
      return
    }

    inquiries.value = loadedInquiries
    hasNextPage.value = pageData.has_next
    openInquiryId.value = null
  } catch (error: any) {
    console.error('Error loading inquiries:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.inquiriesError')
  } finally {
    isLoading.value = false
    reloadLoading.value = false
  }
}

async function reloadInquiries() {
  errorMsg.value = ''
  successMsg.value = ''
  await loadInquiries(false)
}

async function goToPreviousPage() {
  if (currentPage.value <= 0 || reloadLoading.value) return
  currentPage.value -= 1
  await loadInquiries(false)
}

async function goToNextPage() {
  if (!hasNextPage.value || reloadLoading.value) return
  currentPage.value += 1
  await loadInquiries(false)
}

async function confirmDelete(inquiryId: number) {
  successMsg.value = ''
  errorMsg.value = ''

  if (!Number.isInteger(inquiryId) || inquiryId <= 0) {
    errorMsg.value = 'Ungültige Anfrage-ID.'
    deleteStage.value[inquiryId] = 0
    return
  }

  if (deleteLoadingInquiryId.value === inquiryId) {
    return
  }

  deleteLoadingInquiryId.value = inquiryId

  try {
    const response = await api.delete(`/api/admin/inquiries/${inquiryId}`)

    deleteStage.value[inquiryId] = 0

    if (openInquiryId.value === inquiryId) {
      openInquiryId.value = null
    }

    successMsg.value = response.data?.message || t('accountPage.inquiryDeletedSuccess')
    await loadInquiries(false)
  } catch (error: any) {
    console.error('Error deleting inquiry:', error)
    errorMsg.value = error.response?.data?.message || t('accountPage.deleteInquiryError')
  } finally {
    deleteLoadingInquiryId.value = null
  }
}

onMounted(async () => {
  await loadInquiries()
})
</script>

<template>
  <section class="admin-page">
    <div class="admin-wrapper">
      <div class="hero-card">
        <div class="top-row">
          <button class="nav-icon-button" @click="goBack" :title="t('accountPage.back')">←</button>

          <button
            class="nav-icon-button"
            :disabled="reloadLoading"
            @click="reloadInquiries"
            :title="reloadLoading ? t('authPage.loading') : t('accountPage.reloadInquiries')"
          >
            ↻
          </button>
        </div>

        <h1>{{ t('accountPage.inquiriesTitle') }}</h1>
        <p class="subtitle">{{ t('accountPage.inquiriesText') }}</p>
      </div>

      <div v-if="successMsg" class="status-bar success-bar">
        {{ successMsg }}
      </div>

      <div v-if="errorMsg" class="status-bar error-bar">
        {{ errorMsg }}
      </div>

      <div v-if="isLoading" class="state-card">
        <p>{{ t('accountPage.inquiriesLoading') }}</p>
      </div>

      <div v-else-if="!inquiries.length" class="state-card">
        <p>{{ t('accountPage.inquiriesEmpty') }}</p>
      </div>

      <div v-else class="list">
        <div v-for="inquiry in inquiries" :key="inquiry.inquiry_id" class="accordion-item">
          <button class="accordion-header" @click="toggleInquiry(inquiry.inquiry_id)">
            <div class="accordion-main">
              <div class="inquiry-main">
                <span class="primary-text">{{ inquiry.email }}</span>
                <span class="subject-preview">
                  {{ inquiry.title || '-' }}
                </span>
              </div>

              <div class="meta-side">
                <span class="secondary-text">{{ formatDate(inquiry.created_at) }}</span>
              </div>
            </div>
          </button>

          <div v-if="openInquiryId === inquiry.inquiry_id" class="accordion-body">
            <div class="details-grid">
              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.inquiryEmail') }}</span>
                <span class="detail-value">{{ inquiry.email || '-' }}</span>
              </div>

              <div class="detail-box">
                <span class="detail-label">{{ t('accountPage.inquiryCreated') }}</span>
                <span class="detail-value">{{ formatDate(inquiry.created_at) }}</span>
              </div>

              <div class="detail-box detail-box-wide">
                <span class="detail-label">{{ t('accountPage.inquirySubject') }}</span>
                <span class="detail-value">{{ inquiry.title || '-' }}</span>
              </div>

              <div class="detail-box detail-box-wide">
                <span class="detail-label">{{ t('accountPage.inquiryMessage') }}</span>
                <span class="detail-value detail-message">{{ inquiry.message || '-' }}</span>
              </div>
            </div>

            <div class="action-row">
              <button
                class="danger-button"
                :disabled="deleteLoadingInquiryId === inquiry.inquiry_id"
                @click.stop="startDelete(inquiry.inquiry_id)"
              >
                {{ t('accountPage.deleteInquiry') }}
              </button>
            </div>

            <div v-if="getDeleteStage(inquiry.inquiry_id) >= 1" class="delete-warning-box">
              <p>{{ t('accountPage.deleteInquiryWarning') }}</p>

              <div class="delete-actions">
                <button
                  v-if="getDeleteStage(inquiry.inquiry_id) === 1"
                  class="danger-button"
                  @click.stop="continueDelete(inquiry.inquiry_id)"
                >
                  {{ t('accountPage.deleteStepTwo') }}
                </button>

                <button
                  v-if="getDeleteStage(inquiry.inquiry_id) === 2"
                  class="danger-button"
                  :disabled="deleteLoadingInquiryId === inquiry.inquiry_id"
                  @click.stop="confirmDelete(inquiry.inquiry_id)"
                >
                  {{ t('accountPage.deleteConfirm') }}
                </button>

                <button class="secondary-button" @click.stop="cancelDelete(inquiry.inquiry_id)">
                  {{ t('accountPage.cancel') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="pagination-row">
          <button class="secondary-button" :disabled="currentPage === 0 || reloadLoading" @click="goToPreviousPage">
            &larr;
          </button>
          <span>{{ currentPage + 1 }}</span>
          <button class="secondary-button" :disabled="!hasNextPage || reloadLoading" @click="goToNextPage">
            &rarr;
          </button>
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

.error-bar {
  background-color: rgba(255, 123, 123, 0.12);
  border: 1px solid rgba(255, 123, 123, 0.25);
  color: #ff7b7b;
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

.inquiry-main {
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

.detail-box-wide {
  grid-column: 1 / -1;
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

.detail-message {
  white-space: pre-wrap;
  line-height: 1.6;
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
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
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

.pagination-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  color: #d0d0d0;
  font-weight: 700;
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

  .detail-box-wide {
    grid-column: auto;
  }
}
</style>
