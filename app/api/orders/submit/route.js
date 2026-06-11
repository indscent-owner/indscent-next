export const runtime = 'edge'

export async function POST(request, context) {
  try {
    const body = await request.json()
    const db = context.env.indscent_db

    const result = await db.prepare(`
      INSERT INTO Orders (order_date, device_id, name, surname, contact, email, cartItems)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      new Date().toISOString(),
      body.device_id,
      body.name,
      body.surname,
      body.contact,
      body.email,
      JSON.stringify(body.cartItems)
    ).run()

    return Response.json({ success: true, orderNumber: result.lastInsertRowid })
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 })
  }
}
