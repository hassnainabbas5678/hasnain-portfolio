const emailPattern = /^\S+@\S+\.\S+$/

export default async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } })

  try {
    const { name = '', email = '', subject = '', message = '', website = '' } = await request.json()
    if (website) return Response.json({ ok: true })
    if (name.trim().length < 2 || !emailPattern.test(email) || subject.trim().length < 3 || message.trim().length < 15) {
      return Response.json({ message: 'Please provide valid contact details.' }, { status: 400 })
    }
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
      return Response.json({ message: 'The contact service is not configured yet.' }, { status: 503 })
    }
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_RECIPIENT || 'hassnainlilani@gmail.com'],
        reply_to: email.trim(),
        subject: `[Portfolio] ${subject.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
      })
    })
    if (!response.ok) throw new Error('Email provider rejected the request')
    return Response.json({ ok: true })
  } catch (error) {
    return Response.json({ message: 'Unable to deliver your message right now. Please try again later.' }, { status: 500 })
  }
}
