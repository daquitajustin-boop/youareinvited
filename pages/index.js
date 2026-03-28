import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// EVENT DETAILS — edit these before deploying
// ─────────────────────────────────────────────────────────────────────────────
const EVENT_BABY_NAME = 'Saiah Alisbo';
const EVENT_DAY       = 'Sunday';
const EVENT_DATE      = 'April 21';
const EVENT_TIME      = '11:00 AM';
const EVENT_LOCATION  = 'Bagong Parañaque Phase III, Open Court';
const DRESS_CODE      = 'Nude Browns & Pastels';

// ─────────────────────────────────────────────────────────────────────────────
// EMAILJS — paste your 3 keys here (no .env needed!)
//
// 1. Sign up free at https://emailjs.com
// 2. Email Services → Add New Service → Gmail → connect YOUR Gmail
//    (this is the Gmail that will RECEIVE all confirmations too)
//    → copy SERVICE ID
// 3. Email Templates → Create New Template (see README for template body)
//    → copy TEMPLATE ID
// 4. Account → API Keys → copy PUBLIC KEY
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← paste here
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← paste here
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← paste here

// ─────────────────────────────────────────────────────────────────────────────
// YOUR GMAIL — you'll receive a copy of every confirmation here
// ─────────────────────────────────────────────────────────────────────────────
const YOUR_GMAIL = 'YOUR_GMAIL@gmail.com';       // ← paste your Gmail here

export default function Home() {
  const [step, setStep]     = useState(1); // 1=form, 2=success
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim())  return setError('Please enter your name.');
    if (!email.trim()) return setError('Please enter your Gmail.');

    setLoading(true);
    try {
      // 1. Save to RSVP store
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error('Failed to save RSVP');

      // 2. Send emails via EmailJS (only if keys are filled in)
      if (
        EMAILJS_SERVICE_ID  !== 'YOUR_SERVICE_ID' &&
        EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
        EMAILJS_PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY'
      ) {
        const emailjs = await import('@emailjs/browser');
        emailjs.init(EMAILJS_PUBLIC_KEY);

        const templateParams = {
          guest_name:     name,
          guest_email:    email,
          your_gmail:     YOUR_GMAIL,    // CC to your own Gmail
          event_name:     EVENT_BABY_NAME,
          event_day:      EVENT_DAY,
          event_date:     EVENT_DATE,
          event_time:     EVENT_TIME,
          event_location: EVENT_LOCATION,
          dress_code:     DRESS_CODE,
        };

        // Send to guest
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          ...templateParams,
          to_email: email,
        });

        // Send copy to your Gmail
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          ...templateParams,
          to_email:   YOUR_GMAIL,
          guest_name: `[COPY] ${name} just confirmed!`,
        });
      }

      setStep(2);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1); setName(''); setEmail(''); setError('');
  };

  return (
    <>
      <Head>
        <title>Saiah&apos;s Baptism — RSVP</title>
        <meta name="description" content="Confirm your attendance for Saiah Alisbo's Baptism" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.page}>

        {/* Floating petals */}
        <div className={styles.petals} aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`${styles.petal} ${styles[`petal${i + 1}`]}`} />
          ))}
        </div>

        {/* ── HERO — Invitation Card ── */}
        <section className={styles.hero}>

          <div className={styles.floralTopRight} aria-hidden="true">
            <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M180 190 Q160 130 130 80 Q110 40 140 10" stroke="#8a9e7a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M155 150 Q130 120 120 90" stroke="#8a9e7a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <circle cx="145" cy="15" r="12" fill="#d4917a" opacity="0.85"/>
              <circle cx="165" cy="8"  r="9"  fill="#c47a7a" opacity="0.8"/>
              <circle cx="158" cy="28" r="10" fill="#e8c4b8" opacity="0.9"/>
              <circle cx="175" cy="22" r="7"  fill="#d4917a" opacity="0.7"/>
              <circle cx="140" cy="32" r="8"  fill="#c47a7a" opacity="0.75"/>
              <circle cx="125" cy="88" r="9"  fill="#e8c4b8" opacity="0.8"/>
              <circle cx="115" cy="78" r="7"  fill="#d4b0a0" opacity="0.7"/>
              <circle cx="135" cy="75" r="6"  fill="#e8c4b8" opacity="0.65"/>
              <ellipse cx="148" cy="55" rx="5" ry="8" fill="#d4917a" opacity="0.6" transform="rotate(-20 148 55)"/>
              <ellipse cx="162" cy="48" rx="4" ry="7" fill="#c47a7a" opacity="0.55" transform="rotate(15 162 48)"/>
              <ellipse cx="130" cy="100" rx="8" ry="14" fill="#8a9e7a" opacity="0.5" transform="rotate(-40 130 100)"/>
              <ellipse cx="145" cy="70"  rx="6" ry="11" fill="#b8c8a8" opacity="0.45" transform="rotate(20 145 70)"/>
            </svg>
          </div>

          <div className={styles.floralBottomLeft} aria-hidden="true">
            <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 210 Q50 170 90 130 Q120 100 150 60" stroke="#8a9e7a" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M60 190 Q80 160 100 140" stroke="#8a9e7a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <circle cx="90"  cy="132" r="11" fill="#f0ddd5" opacity="0.9"/>
              <circle cx="75"  cy="120" r="9"  fill="#e8c4b8" opacity="0.85"/>
              <circle cx="100" cy="118" r="8"  fill="#f0ddd5" opacity="0.8"/>
              <circle cx="85"  cy="108" r="7"  fill="#e8c4b8" opacity="0.75"/>
              <circle cx="112" cy="125" r="6"  fill="#ddb8a8" opacity="0.7"/>
              <circle cx="105" cy="145" r="8"  fill="#f0ddd5" opacity="0.8"/>
              <circle cx="118" cy="138" r="6"  fill="#e8c4b8" opacity="0.7"/>
              <ellipse cx="70"  cy="150" rx="9" ry="16" fill="#8a9e7a" opacity="0.4" transform="rotate(35 70 150)"/>
              <ellipse cx="95"  cy="155" rx="7" ry="12" fill="#b8c8a8" opacity="0.4" transform="rotate(-15 95 155)"/>
              <ellipse cx="130" cy="80"  rx="6" ry="11" fill="#8a9e7a" opacity="0.35" transform="rotate(50 130 80)"/>
            </svg>
          </div>

          <div className={styles.heroCard}>
            <p className={styles.heroTagline}>
              Please join us for<br />the Baptism of our daughter
            </p>
            <div className={styles.heroName}>Saiah</div>
            <div className={styles.heroSurname}>Alisbo</div>

            <div className={styles.dateBadge}>
              <div className={styles.dateLine} />
              <div className={styles.dateCenter}>
                <span className={styles.dateMonth}>APRIL</span>
                <span className={styles.dateDay}>21</span>
                <span className={styles.dateTime}>{EVENT_TIME}</span>
              </div>
              <div className={styles.dateLine} />
            </div>

            <div className={styles.dateDayRow}>
              <span>{EVENT_DAY}</span>
              <span className={styles.dateSep}>·</span>
              <span>{EVENT_TIME}</span>
            </div>

            <div className={styles.heroLocation}>{EVENT_LOCATION}</div>

            <div className={styles.dressBadge}>
              <span>👗</span> Attire: {DRESS_CODE}
            </div>

            <p className={styles.heroCta}>
              <em>Please confirm your attendance.<br />We hope to see you there!</em>
            </p>
          </div>
        </section>

        {/* ── RSVP FORM ── */}
        <section className={styles.formSection}>
          <div className={styles.formCard}>
            {step === 1 ? (
              <>
                <div className={styles.cardHeader}>
                  <div className={styles.cardRose}>🌸</div>
                  <h2>Confirm Your Attendance</h2>
                  <p>Just your name and Gmail — takes 10 seconds!</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Your Full Name *</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="e.g. Maria Santos"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Your Gmail *</label>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="youremail@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      inputMode="email"
                    />
                    <span className={styles.hint}>
                      ✉ A confirmation will be sent to your Gmail
                    </span>
                  </div>

                  {error && <p className={styles.error}>{error}</p>}

                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Confirming… 🌸' : "Yes, I'll be there! 🌸"}
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.success}>
                <div className={styles.successFloral}>🌸</div>
                <h2>See you there!</h2>
                <p className={styles.successMsg}>
                  Thank you, <strong>{name}</strong>!<br />
                  Your attendance has been confirmed.
                </p>
                <p className={styles.successEmail}>
                  ✉ Confirmation sent to <strong>{email}</strong>
                </p>
                <div className={styles.successDetails}>
                  <p>📅 {EVENT_DAY}, {EVENT_DATE} · {EVENT_TIME}</p>
                  <p>📍 {EVENT_LOCATION}</p>
                  <p className={styles.successDress}>👗 Wear: {DRESS_CODE}</p>
                </div>
                <button className={styles.secondaryBtn} onClick={reset}>
                  Register Another Guest
                </button>
              </div>
            )}
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Made with love for <em>Saiah&apos;s Baptism</em> 🌸</p>
        </footer>
      </div>
    </>
  );
}
