# 🌸 Saiah Alisbo — Baptism RSVP

Guest scans QR code → fills Name + Gmail → both guest and host receive confirmation email.

---

## 🚀 Deploy to Vercel

```bash
npm install
git init && git add . && git commit -m "init"
# Push to GitHub → go to vercel.com → New Project → Import → Deploy
```

Your live URL (e.g. `https://saiah-baptism.vercel.app`) goes into your QR code.

---

## 📧 EmailJS Setup — Free, uses your Gmail, no .env needed

### Step 1 — Sign up
https://emailjs.com → create free account (200 emails/month free)

### Step 2 — Connect Gmail
Dashboard → Email Services → Add New Service → Gmail
→ sign in with YOUR Gmail (this Gmail will also receive all confirmations)
→ copy your **Service ID** (e.g. `service_abc123`)

### Step 3 — Create the email template
Dashboard → Email Templates → Create New Template

Set:
- **To Email field:** `{{to_email}}`
- **Subject:** ✨ Confirmed! See you at Saiah's Baptism 🌸
- **Body:**

```
Hi {{guest_name}}! 🌸

Your attendance has been confirmed for Saiah Alisbo's Baptism!

📅 {{event_day}}, {{event_date}} · {{event_time}}
📍 {{event_location}}
👗 Attire: {{dress_code}}

We can't wait to celebrate with you!
With love 💕
```

→ Save → copy your **Template ID** (e.g. `template_xyz789`)

### Step 4 — Get your Public Key
Dashboard → Account → API Keys → copy **Public Key**

### Step 5 — Paste all 3 into pages/index.js

```js
const EMAILJS_SERVICE_ID  = 'service_abc123';    // ← line 19
const EMAILJS_TEMPLATE_ID = 'template_xyz789';   // ← line 20
const EMAILJS_PUBLIC_KEY  = 'aBcDeFgHiJkLmNoP';  // ← line 21

const YOUR_GMAIL = 'youremail@gmail.com';         // ← line 27
```

That's it! When a guest submits:
1. Guest receives confirmation to their Gmail ✅
2. You receive a copy to YOUR_GMAIL ✅

---

## ✏️ Edit Event Details (pages/index.js lines 13–18)

```js
const EVENT_BABY_NAME = 'Saiah Alisbo';
const EVENT_DAY       = 'Sunday';
const EVENT_DATE      = 'April 21';
const EVENT_TIME      = '11:00 AM';
const EVENT_LOCATION  = 'Bagong Parañaque Phase III, Open Court';
const DRESS_CODE      = 'Nude Browns & Pastels';
```

---

## 🔐 Admin Dashboard

URL: `https://your-site.vercel.app/admin`
Password: `saiah2025` ← change in pages/admin.js line 4

Shows: total count + full guest list (name, email, time submitted)

---

## 📱 Generate QR Code (free)
Go to https://qr.io or https://www.qrcode-monkey.com
Paste your Vercel URL → download PNG → print or share!

