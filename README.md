# Delivery Kata

This project implements a minimal delivery-slot reservation flow with a Spring Boot backend and a Vite React frontend.

## Project goal

The application allows a customer to:
- choose a delivery method,
- select a date,
- load time slots for that method/date,
- reserve an available slot,
- avoid double-booking through optimistic locking protection.

## Requirements

- Java 21
- Maven 3.9+
- Node.js 18+ and npm

## Architecture summary

### Backend
- Spring Boot 3.2.x
- REST API exposed under `/api`
- JPA + H2 in-memory database
- business logic in `service`
- repository abstraction for slots and reservations

### Frontend
- React + Vite
- Redux Toolkit + Redux Saga
- Axios for HTTP requests
- French and English UI toggle

## Run instructions

### 1) Start the backend

From the project root:

```bash
mvn spring-boot:run
```

The app runs on:
- http://localhost:8080

### 2) Start the frontend

From the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:
- http://localhost:3000

The Vite config proxies `/api` to the backend at `http://localhost:8080`.

## API contract

### GET /api/methods
Returns the available delivery methods.

Example response:

```json
[
  "DRIVE",
  "DELIVERY",
  "DELIVERY_TODAY",
  "DELIVERY_ASAP"
]
```

### GET /api/slots?method=DELIVERY&date=2026-09-12
Returns available slots for the selected method and date.

Example response:

```json
[
  {
    "id": "2f1e...",
    "date": "2026-09-12",
    "start": "09:00:00",
    "end": "11:00:00",
    "method": "DELIVERY",
    "reserved": false
  }
]
```

### POST /api/reservations
Creates a reservation for a selected slot.

Request body:

```json
{
  "customerId": "demo-customer",
  "slotId": "2f1e...",
  "method": "DELIVERY",
  "date": "2026-09-12"
}
```

Possible responses:
- `201 Created` on success
- `409 Conflict` if the slot is already reserved
- `400` for invalid input

## Data model

The application seeds a few example slots for the next three days in `DataInitializer`.

## Concurrency behaviour

Reservations are protected against double booking using optimistic locking and transactional save logic in the service layer.

## Notes

This is intentionally a compact kata implementation. It focuses on the business flow and demonstrates a clean backend/frontend split while keeping the architecture simple and readable.
