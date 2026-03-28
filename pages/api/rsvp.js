// pages/api/rsvp.js
// In-memory store — persists per Vercel instance.
// Upgrade to Vercel KV for permanent storage (see README).

const rsvps = global._rsvps || [];
global._rsvps = rsvps;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const entry = {
      id:          Date.now().toString(),
      name:        name.trim(),
      email:       email.trim().toLowerCase(),
      submittedAt: new Date().toISOString(),
    };

    rsvps.push(entry);
    return res.status(200).json({ success: true, entry });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      rsvps,
      total: rsvps.length,
    });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
