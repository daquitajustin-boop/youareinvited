import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/Admin.module.css';

// ── Change this password before deploying! ──
const ADMIN_PASSWORD = 'saiah2025';

export default function Admin() {
  const [authed, setAuthed]   = useState(false);
  const [pw, setPw]           = useState('');
  const [pwError, setPwError] = useState('');
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch]   = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rsvp');
      setData(await res.json());
    } catch { console.error('Fetch failed'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (authed) fetchData(); }, [authed, fetchData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) setAuthed(true);
    else setPwError('Incorrect password');
  };

  const filtered = data?.rsvps?.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  ) || [];

  if (!authed) {
    return (
      <>
        <Head><title>Admin — Saiah&apos;s Baptism</title></Head>
        <div className={styles.loginPage}>
          <div className={styles.loginCard}>
            <div className={styles.loginFloral}>🌸</div>
            <h1>Admin Access</h1>
            <p>Enter the password to view RSVPs</p>
            <form onSubmit={handleLogin}>
              <input className={styles.input} type="password"
                placeholder="Password" value={pw}
                onChange={e => setPw(e.target.value)} autoFocus />
              {pwError && <p className={styles.error}>{pwError}</p>}
              <button type="submit" className={styles.loginBtn}>Enter</button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>Admin — Saiah&apos;s Baptism RSVPs</title></Head>
      <div className={styles.page}>

        <header className={styles.header}>
          <div>
            <h1>RSVP Dashboard</h1>
            <p>Saiah Alisbo · Baptism · Sunday, April 21</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.totalBadge}>{data?.total ?? 0} confirmed</div>
            <button className={styles.refreshBtn} onClick={fetchData} disabled={loading}>
              ⟳ Refresh
            </button>
          </div>
        </header>

        <main className={styles.main}>

          {/* Big count */}
          <div className={styles.countCard}>
            <span className={styles.countNum}>{data?.total ?? '—'}</span>
            <span className={styles.countLabel}>Total Confirmed Guests</span>
          </div>

          {/* Search */}
          <div className={styles.searchRow}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="🔍  Search by name or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <span className={styles.searchCount}>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Guest list */}
          <div className={styles.tableWrap}>
            {loading && !data ? (
              <p className={styles.empty}>Loading…</p>
            ) : filtered.length === 0 ? (
              <p className={styles.empty}>
                {search ? 'No results found.' : 'No RSVPs yet — share your QR code! 🌸'}
              </p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Gmail</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r.id}>
                      <td className={styles.tdNum}>{i + 1}</td>
                      <td className={styles.tdName}>{r.name}</td>
                      <td className={styles.tdEmail}>{r.email}</td>
                      <td className={styles.tdDate}>
                        {new Date(r.submittedAt).toLocaleDateString('en-PH', {
                          month: 'short', day: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Name bubbles */}
          {data?.total > 0 && (
            <div className={styles.allNames}>
              <h3>All Guests ({data.total})</h3>
              <div className={styles.nameCloud}>
                {data.rsvps.map((r, i) => (
                  <span key={i} className={styles.nameTag}>{r.name}</span>
                ))}
              </div>
            </div>
          )}

        </main>

        <footer className={styles.footer}>
          <a href="/">← Back to RSVP Page</a>
          <span>Saiah Alisbo · Baptism Admin</span>
        </footer>
      </div>
    </>
  );
}
