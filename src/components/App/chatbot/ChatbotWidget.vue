<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { resolveSupportedLocale } from '@/i18n/index.ts'

type ChatbotRegistry = Record<string, { destroy?: () => void }>
type ChatbotWindow = Window & { BuenoWebsiteChatbots?: ChatbotRegistry }

const rootId = 'bws-chatbot'
const localChatbotBaseUrl = 'http://localhost:3001'
const chatbotBaseUrl = getChatbotBaseUrl()

const { locale } = useI18n({ useScope: 'global' })

let stylesheetElement: HTMLLinkElement | null = null
let scriptElement: HTMLScriptElement | null = null
let createdRoot = false

onMounted(() => {
  loadWidget()
})

onBeforeUnmount(() => {
  unloadWidget()
})

watch(
  () => resolveSupportedLocale(locale.value),
  (currentLanguage, previousLanguage) => {
    if (currentLanguage !== previousLanguage) {
      reloadWidget()
    }
  },
)

function reloadWidget(): void {
  unloadWidget()
  loadWidget()
}

function getChatbotBaseUrl(): string {
  const configuredBaseUrl = import.meta.env.VITE_CHATBOT_BASE_URL?.trim()

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '')
  }

  return import.meta.env.DEV ? localChatbotBaseUrl : ''
}

function loadWidget(): void {
  if (!chatbotBaseUrl) {
    return
  }

  ensureRoot()
  loadStylesheet()
  loadScript()
}

function ensureRoot(): HTMLElement {
  const existingRoot = document.getElementById(rootId)

  if (existingRoot) {
    return existingRoot
  }

  const root = document.createElement('div')
  root.id = rootId
  document.body.appendChild(root)
  createdRoot = true
  return root
}

function loadStylesheet(): void {
  stylesheetElement = document.createElement('link')
  stylesheetElement.rel = 'stylesheet'
  stylesheetElement.href = `${chatbotBaseUrl}/widget.css`
  stylesheetElement.dataset.bwsChatbotAsset = 'stylesheet'
  document.head.appendChild(stylesheetElement)
}

function loadScript(): void {
  scriptElement = document.createElement('script')
  scriptElement.src = `${chatbotBaseUrl}/widget.js`
  scriptElement.async = true
  scriptElement.dataset.apiBase = chatbotBaseUrl
  scriptElement.dataset.language = resolveSupportedLocale(locale.value)
  scriptElement.dataset.root = rootId
  scriptElement.dataset.bwsChatbotAsset = 'script'
  document.body.appendChild(scriptElement)
}

function unloadWidget(): void {
  ;(window as ChatbotWindow).BuenoWebsiteChatbots?.[rootId]?.destroy?.()
  stylesheetElement?.remove()
  scriptElement?.remove()
  stylesheetElement = null
  scriptElement = null

  if (createdRoot) {
    document.getElementById(rootId)?.remove()
    createdRoot = false
  }
}
</script>

<template></template>
