# Visitor Pass Management System (VPMS)

A MERN-stack visitor management system: pre-registration, appointment approval,
QR-based visitor passes (with PDF badge), check-in/check-out, email notifications,
and a basic analytics dashboard.

## What's fully implemented

- JWT auth (access + refresh tokens), bcrypt password hashing, role-based middleware
  (`admin`, `security`, `employee`, `visitor`)
- Visitor CRUD with photo / ID-proof upload (Multer)
- Appointment creation, approval, rejection
- On approval: auto-generates a unique pass number, QR code (`qrcode`), and a
  PDF visitor badge (`pdfkit`) embedding the QR — saved to `/backend/uploads`
- QR verification endpoint (`POST /api/pass/verify`) used by the scanner page
- Check-in / check-out logging
- Email notifications on approve / reject / pass-issued (Nodemailer)
- Dashboard stats API (total visitors, today's visitors, active passes, check-ins today)
- React frontend: login/register, role-aware sidebar, dashboard, visitor list/add/details,
  appointment list/create/approval queue, pass view with QR + PDF download,
  camera-based QR scanner with check-in/out buttons, check logs table
- Seed script creating an admin, security, and employee user plus sample visitors/appointments

## What's intentionally stubbed / left as next steps

Given the scope of the original spec, these were **not** fully built out — they're
called out here rather than silently skipped:

- **OTP verification** — not implemented (would slot into `authController` + a new
  `otpService` using Nodemailer/Twilio).
- **Multi-organization support** — the `organization` field exists on `User`, but
  there's no org-scoped data isolation or org-switching UI yet.
- **Audit logs** — no dedicated `AuditLog` model/middleware yet.
- **CSV/Excel export & advanced report filters** — the check-log/appointment list
  APIs support basic filtering (date, status, host); a dedicated `/reports` export
  endpoint (e.g. with `json2csv` / `exceljs`) is not yet built.
- **Docker / Nginx deployment config** — not included in this pass.
- **Refresh-token rotation/blacklisting** beyond single-token-per-user storage.

These are all reasonable follow-ups — happy to build any of them out next.

## Project structure

```
vpms/
├── backend/
│   ├── config/db.js
│   ├── models/        User, Visitor, Appointment, Pass, CheckLog
│   ├── middlewares/    auth, role, errorHandler, upload (multer)
│   ├── services/       qrService, pdfService, emailService
│   ├── controllers/
│   ├── routes/
│   ├── seed/seed.js
│   ├── uploads/        generated PDFs & uploaded photos land here
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/ Sidebar, Navbar, Card, Table, ProtectedRoute
    │   ├── pages/       Login, Register, Dashboard, Visitor*, Appointment*,
    │   │                ApprovalQueue, PassView, QRScanner, CheckLogs
    │   ├── context/AuthContext.jsx
    │   ├── services/api.js   (axios instance with auto refresh-token retry)
    │   ├── App.jsx
    │   └── main.jsx
    ├── tailwind.config.js
    └── package.json
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI (MongoDB Atlas), JWT secrets, SMTP creds
npm run seed     # creates admin/security/employee + sample data
npm run dev      # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev      # starts on http://localhost:5173
```

## Environment variables (backend `.env`)

| Variable | Description |
|---|---|
| `PORT` | Backend port (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` / `JWT_EXPIRE` | Access token secret/expiry |
| `JWT_REFRESH_SECRET` / `JWT_REFRESH_EXPIRE` | Refresh token secret/expiry |
| `CLIENT_URL` | Frontend origin, used for CORS |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `EMAIL_FROM` | Nodemailer SMTP config |
| `BASE_URL` | Backend base URL, used to build PDF download links in emails |

## Seeded demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@vpms.com | Admin@123 |
| Security | security@vpms.com | Security@123 |
| Employee/Host | employee@vpms.com | Employee@123 |

## Core flow to demo

1. Login as **employee** → Visitors → Add Visitor → copy the visitor's `_id`
   from the URL/details page.
2. Appointments → Invite Visitor → paste visitor ID + your own user ID as host → submit.
3. Approval Queue → Approve → this auto-generates the QR pass + PDF badge and
   emails the visitor (if SMTP is configured).
4. Login as **security** → QR Scanner → scan the generated QR (or test
   `POST /api/pass/verify` directly with the pass number) → Check In / Check Out.
5. Dashboard shows live counts; Check Logs shows the check-in/out history.

## API quick reference

| Method | Endpoint | Auth |
|---|---|---|
| POST | `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh` | public |
| GET | `/api/auth/me` | logged in |
| POST/GET/PUT/DELETE | `/api/visitors`, `/api/visitors/:id` | role-restricted |
| POST/GET | `/api/appointments` | logged in / role-restricted |
| PATCH | `/api/appointments/:id/approve`, `/:id/reject` | admin/employee |
| GET | `/api/pass/:id` | logged in |
| POST | `/api/pass/verify` | logged in |
| POST | `/api/checklog/checkin`, `/checkout` | admin/security |
| GET | `/api/checklog` | logged in |
| GET | `/api/dashboard/stats` | logged in |

## Screenshots

_Add screenshots here after running the app locally — e.g. `docs/screenshot-dashboard.png`,
`docs/screenshot-pass.png`, `docs/screenshot-scanner.png`._
