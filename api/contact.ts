import { Resend } from 'resend';

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

type ApiRequest = {
  method?: string;
  body?: ContactBody | string;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

const contactTo = process.env.CONTACT_TO_EMAIL ?? 'anvimsiddabhattuni@gmail.com';
const resendFrom = process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function parseBody(body: ApiRequest['body']): ContactBody {
  if (typeof body === 'string') return JSON.parse(body) as ContactBody;
  return body ?? {};
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  let body: ContactBody;
  try {
    body = parseBody(req.body);
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: resendFrom,
      to: [contactTo],
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        message,
      ].join('\n'),
    });

    if (error) {
      return res.status(502).json({ error: error.message });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Email failed to send' });
  }
}
