# Bueno Web Solutions Frontend

Vue 3 / Vite frontend for `bueno-ws.ch`.

## Setup

```sh
npm install
```

Create `.env` from `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_CHATBOT_BASE_URL=http://localhost:3001
```

Production example:

```env
VITE_API_BASE_URL=https://api.bueno-ws.ch
VITE_CHATBOT_BASE_URL=https://chat.bueno-ws.ch
```

`VITE_API_BASE_URL` is the main Bueno backend for auth and contact inquiries.
`VITE_CHATBOT_BASE_URL` is the separate chatbot backend that serves `/widget.js`, `/widget.css`, `/api/session` and `/api/chat`.

The OpenAI API key must stay only on the chatbot backend. It is never used in this frontend.

## Development

```sh
npm run dev
```

## Checks

```sh
npm run type-check
npm run build
```

## Chatbot integration

The chatbot is loaded by `src/components/App/chatbot/ChatbotWidget.vue`.

- The widget language follows the selected website language.
- The chatbot backend keeps each session language fixed after session creation.
- In local development, the widget defaults to `http://localhost:3001` if `VITE_CHATBOT_BASE_URL` is not set.
- In production, set `VITE_CHATBOT_BASE_URL` explicitly.

Required chatbot backend production settings:

```env
ALLOWED_ORIGINS=https://bueno-ws.ch,https://www.bueno-ws.ch
RATE_LIMITS=active
```

Run the chatbot live hardtest against the deployed chatbot backend before launch.
