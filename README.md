# Payment Gateway Project

## Overview

This project implements the foundational components of a payment gateway similar to Razorpay or Stripe.  
It supports merchant authentication, order creation, multi-method payment processing (UPI and Card), and a hosted checkout page.

The system is fully Dockerized and can be started with a single command.

---

## Features

- Merchant authentication using API Key and Secret
- Order creation and retrieval APIs
- Payment processing via:
  - UPI (with VPA validation)
  - Card (Luhn validation, expiry validation, network detection)
- Hosted checkout page for customers
- Dashboard for merchants to view transactions and statistics
- Database persistence using PostgreSQL
- Deterministic Test Mode for automated evaluation

---

## Tech Stack

- Backend: Node.js (Express)
- Database: PostgreSQL
- Frontend Dashboard: React
- Checkout Page: React
- Containerization: Docker & Docker Compose

---

## How to Run the Project

### Prerequisites
- Docker
- Docker Compose

### Start the Application

```bash
docker-compose up -d --build


This command will start all services:

PostgreSQL database

Backend API

Merchant dashboard

Checkout page

Service URLs

Backend API: http://localhost:8000

Merchant Dashboard: http://localhost:3000

Checkout Page: http://localhost:3001


Health Check

Verify the backend is running:

curl http://localhost:8000/health


Expected response:

{
  "status": "healthy",
  "database": "connected",
  "timestamp": "ISO_TIMESTAMP"
}

Test Merchant Credentials (Auto-Seeded)

The application automatically seeds a test merchant on startup.

Email: test@example.com

API Key: key_test_abc123

API Secret: secret_test_xyz789

These credentials can be used for all API testing and dashboard login.


API Usage
Create Order
curl -X POST http://localhost:8000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: key_test_abc123" \
  -H "X-Api-Secret: secret_test_xyz789" \
  -d '{"amount":50000}'


Note: Amounts are in paise.
Example: 50000 = ₹500.00


Checkout Flow

Create an order using the API.

Open the checkout page in browser:

http://localhost:3001/checkout?order_id=ORDER_ID


Select payment method (UPI or Card).

Complete payment.

Payment status is shown on the checkout page.


Test Mode (For Evaluation)

The project supports deterministic test mode via environment variables.

TEST_MODE=true
TEST_PAYMENT_SUCCESS=true
TEST_PROCESSING_DELAY=1000


When enabled:

Payment outcome is deterministic

Processing delay is fixed

Used for automated evaluation


Dashboard

The merchant dashboard displays:

API credentials

Total transactions

Total successful amount

Success rate

Transactions list

All values are calculated dynamically from the database (no hardcoded values).

Notes

Card CVV and full card numbers are never stored.

Only last 4 digits and card network are persisted.

Payment status flow: processing → success / failed.

All required data-test-id attributes are implemented for automated UI testing.

Conclusion

This project fulfills all the specified requirements for the payment gateway deliverable, including backend APIs, frontend interfaces, database persistence, Dockerized deployment, and evaluation-ready test mode.