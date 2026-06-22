# VisitorHub – Smart Visitor Pass & Access Management System

VisitorHub is a full-stack MERN application designed to streamline visitor management for organizations. It enables visitor registration, appointment scheduling, approval workflows, QR-based pass generation, secure check-in/check-out, PDF badge generation, email notifications, and analytics dashboards.

## Features

### Authentication & Authorization

* JWT Authentication (Access + Refresh Tokens)
* Secure password hashing using bcrypt
* Role-Based Access Control (RBAC)
* Roles: Admin, Employee, Security

### Visitor Management

* Add, view, and manage visitors
* Upload visitor photos and ID proofs
* Detailed visitor profiles
* Visitor history tracking

### Appointment Management

* Create visitor appointments
* Appointment approval and rejection workflow
* Prevent duplicate pass generation
* Past-date appointment validation

### Smart Pass Generation

* Automatic QR code generation
* Unique visitor pass numbers
* PDF visitor badge generation
* Downloadable visitor passes
* Pass status tracking (Active, Used, Expired)

### Security Check-In System

* Camera-based QR code scanner
* Visitor check-in/check-out workflow
* Real-time pass verification
* Security audit logs

### Dashboard & Analytics

* Total visitors
* Active passes
* Today's visits
* Check-in/check-out statistics
* Activity monitoring dashboard

### Notifications

* Appointment approval emails
* Appointment rejection emails
* Pass issuance emails with downloadable PDF

---

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* React Hook Form

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Additional Libraries

* QRCode
* PDFKit
* Nodemailer
* Multer
* Bcrypt

---

## Project Structure

```text
VisitorHub/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── seed/
│   ├── uploads/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/VisitorHub.git
cd VisitorHub
```

### Backend Setup

```bash
cd backend
npm install
npm run seed
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
CLIENT_URL=
EMAIL_USER=
EMAIL_PASS=
BASE_URL=
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Demo Accounts

| Role     | Email                                         |
| -------- | --------------------------------------------- |
| Admin    | [admin@vpms.com](mailto:admin@vpms.com)       |
| Security | [security@vpms.com](mailto:security@vpms.com) |
| Employee | [employee@vpms.com](mailto:employee@vpms.com) |

Passwords can be configured through the seed script.

---

## Application Workflow

1. Employee registers a visitor.
2. Employee creates an appointment.
3. Admin approves or rejects the appointment.
4. On approval:

   * QR Pass is generated
   * PDF Badge is generated
   * Email notification is sent
5. Security scans QR code at entry.
6. Visitor checks in and checks out.
7. Activity is recorded in logs and dashboard analytics.

---

## Future Enhancements

* OTP Verification
* Multi-Organization Support
* Advanced Reporting & CSV Export
* Audit Logging
* Docker Deployment
* Pass Revocation Workflow
* Mobile Responsive Security Scanner

---

## Author

**Anshika Jain**

Built as a full-stack MERN project showcasing authentication, role-based access control, QR workflows, PDF generation, email automation, and secure visitor management.

