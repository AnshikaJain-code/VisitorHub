# 🚀 VisitorHub – Smart Visitor Pass & Access Management System

VisitorHub is a full-stack Visitor Pass Management System built using the MERN stack. It streamlines visitor registration, appointment scheduling, approval workflows, QR-based visitor passes, check-in/check-out tracking, and administrative analytics through a modern web interface.

## 🌐 Live Demo

**Frontend:** https://visitor-hub-iota.vercel.app

**Backend API:** https://visitorhub-backend.onrender.com

---

## 📌 Features

### 🔐 Authentication & Authorization

* JWT Authentication (Access + Refresh Tokens)
* Password Hashing using bcrypt
* Role-Based Access Control (Admin, Employee, Security)
* Protected Routes and Middleware

### 👥 Visitor Management

* Add, View, Update and Delete Visitors
* Store Visitor Information
* Visitor Details Page
* Search and Management Interface

### 📅 Appointment Management

* Create Visitor Appointments
* Appointment Approval & Rejection Workflow
* Host Assignment
* Visit Date Validation
* Status Tracking (Pending, Approved, Rejected)

### 🎫 Smart Visitor Passes

* Automatic Pass Generation after Approval
* Unique Pass Numbers
* QR Code Generation
* Downloadable PDF Visitor Pass
* Pass Expiry Management

### 📲 QR-Based Check-In / Check-Out

* Camera-Based QR Scanner
* Verify Visitor Passes
* Check-In Tracking
* Check-Out Tracking
* Security Portal Integration

### 📊 Analytics Dashboard

* Total Visitors
* Today's Visitors
* Active Passes
* Daily Check-Ins
* Real-Time Statistics

### 📧 Notification System

* Appointment Approval Emails
* Appointment Rejection Emails
* Visitor Pass Issued Notifications
* Nodemailer Integration

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hook Form

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer

### Additional Services

* QR Code Generation
* PDFKit
* Nodemailer
* Render Deployment
* Vercel Deployment

---

## 📂 Project Structure

```bash
VisitorHub/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── seed/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/AnshikaJain-code/VisitorHub.git
cd VisitorHub
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret
JWT_EXPIRE=1d

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE=7d

CLIENT_URL=http://localhost:5173

BASE_URL=http://localhost:5000
```

Optional (for Email Notifications):

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
```

---

## 👤 Demo Roles

| Role     | Access                                 |
| -------- | -------------------------------------- |
| Admin    | Manage Visitors, Appointments, Passes  |
| Employee | Create & Approve Appointments          |
| Security | Verify QR Passes, Check-In / Check-Out |

---

## 🔄 Application Workflow

1. Visitor is added to the system.
2. Employee creates an appointment.
3. Appointment is approved.
4. QR Pass and PDF Badge are automatically generated.
5. Visitor arrives and presents QR Pass.
6. Security scans QR Code.
7. Visitor Check-In / Check-Out is recorded.
8. Dashboard analytics update automatically.

---

## 📈 Future Enhancements

* OTP Verification
* Multi-Organization Support
* Audit Logs
* Advanced Reporting
* CSV / Excel Export
* Email Templates
* Docker Support
* Dark Mode
* Mobile App Version

---

## 🎯 Key Learnings

This project demonstrates:

* Full-Stack MERN Development
* Authentication & Authorization
* REST API Design
* MongoDB Data Modeling
* QR-Based Access Systems
* PDF Generation
* File Upload Handling
* Deployment on Render & Vercel
* Production Environment Configuration
* CORS & API Integration

---

## 👩‍💻 Author

**Anshika Jain**

B.Tech (ECE - AI & ML)
Netaji Subhas University of Technology (NSUT)

GitHub: https://github.com/AnshikaJain-code

---

⭐ If you found this project useful, consider giving it a star on GitHub!


