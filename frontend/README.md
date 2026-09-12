# Frontend

This is the React + Vite client for the delivery reservation kata.

## Stack

- React 18
- Vite
- Redux Toolkit
- Redux Saga
- Axios

## Prerequisites

- Node.js 18+
- npm

## Run locally

```bash
cd frontend
npm install
npm run dev
```

The app runs at:
- http://localhost:3000

The Vite dev server proxies API calls to:
- http://localhost:8080

## Main responsibilities

- load available methods,
- load slots for the selected date and method,
- reserve a slot,
- display confirmation and error messages.
