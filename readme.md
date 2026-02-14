# ⚙️ FinTrack Server | Backend API

This is the robust Node.js/Express server that powers the **FinTrack** ecosystem. It handles secure data persistence, role-based authorization, and financial logic calculations.

## 🛠️ Core Technology Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via MongoDB Driver)
* **Authentication:** Firebase Admin SDK (Server-side verification)
* **Security:** CORS, Dotenv, JWT-like Auth logic

---

## 🔐 Key Backend Features

### 1. Role-Based Access Control (RBAC)
The server implements middle-wares to verify user roles.
* `verifyAdmin`: Restricts access to sensitive routes like User Management and Tip Controls.
* `verifyUser`: Ensures users can only access and modify their own financial data.

### 2. Financial Logic API
* **Transaction Filtering:** Specific endpoints to aggregate income vs. expense data.
* **Categorization:** API handles dynamic category mapping for analytics.
* **Data Aggregation:** Processes complex queries for the Expense Analytics charts on the frontend.

### 3. Secure Transactions
* Implemented server-side validation to ensure transaction amounts and types are valid before saving to MongoDB.

---

## 📡 API Endpoints (Quick Reference)

### 👤 User & Role Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users` | Get all users (Admin only) |
| `PATCH` | `/users/admin/:id` | Promote user to Admin |
| `GET` | `/users/role/:email` | Check role of a specific user |

### 💰 Financial Records
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/single/:email` | Get all transactions for a specific user |
| `POST` | `/add-payment` | Create a new income/expense record |
| `DELETE` | `/payment/:id` | Remove a transaction |

### 📂 Category & Tips Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/categories` | Fetch all financial categories |
| `POST` | `/add-category` | Create new category (Admin only) |
| `POST` | `/add-tip` | Add featured financial tips |

---

## 🚀 Setup Instructions

### 1. Clone & Install
```bash
git clone [https://github.com/omor244/Fin-Track-Server]
cd fintrack-server
npm install