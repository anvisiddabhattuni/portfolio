type Env = {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

async function handleContact(request: Request, env: Env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  if (!env.RESEND_API_KEY) {
    return json(500, { error: 'Email service is not configured' });
  }

  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid request body' });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    return json(400, { error: 'Name, email, and message are required' });
  }
  if (!isEmail(email)) {
    return json(400, { error: 'A valid email address is required' });
  }

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>',
      to: [env.CONTACT_TO_EMAIL ?? 'anvimsiddabhattuni@gmail.com'],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, '', message].join('\n'),
    }),
  });

  if (!resp.ok) {
    return json(502, { error: 'Email failed to send' });
  }

  return json(200, { ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      return handleContact(request, env);
    }

    if (url.pathname.startsWith('/api/')) {
      return json(404, { error: 'Not found' });
    }

    return env.ASSETS.fetch(request);
  },
};
