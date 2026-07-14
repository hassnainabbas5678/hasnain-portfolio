const emailPattern = /^\S+@\S+\.\S+$/
const json = (statusCode, body, extraHeaders = {}) => ({ statusCode, headers: { 'Content-Type': 'application/json', ...extraHeaders }, body: JSON.stringify(body) })

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { message: 'Method not allowed.' }, { Allow: 'POST' })

  try {
    const { name = '', email = '', subject = '', message = '', website = '' } = JSON.parse(event.body || '{}')
    if (website) return json(200, { ok: true })
    if (name.trim().length < 2 || !emailPattern.test(email) || subject.trim().length < 3 || message.trim().length < 15) return json(400, { message: 'Please provide valid contact details.' })
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) return json(503, { message: 'The contact service is not configured yet.' })

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: [process.env.CONTACT_RECIPIENT || 'hassnainlilani@gmail.com'], reply_to: email.trim(), subject: `[Portfolio] ${subject.trim()}`, text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}` })
    })
    if (!response.ok) return json(502, { message: 'The email provider could not accept your message.' })
    return json(200, { ok: true })
  } catch {
    return json(500, { message: 'Unable to deliver your message right now. Please try again later.' })
  }
}
