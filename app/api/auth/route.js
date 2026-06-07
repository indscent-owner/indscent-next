export async function POST(request) {
  const { email, phone } = await request.json()

  if (!email || !phone) {
    return Response.json({ message: 'Email and phone are required.' }, { status: 400 })
  }

  return Response.json({ message: `Welcome back, ${email}!` })
}
