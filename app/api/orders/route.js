export const runtime = 'edge'

export async function POST(request, context) {
  try {
    const body = await request.json()
    const { name, surname, contact, email, cart, deviceToken } = body

    if (!name || !surname || !contact || !email || !cart || cart.length === 0 || !deviceToken) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const placedAt = new Date().toISOString()
    const db = context.env.indscent_db

    const orderResult = await db.prepare(`
      INSERT INTO Orders (name, surname, contact, email, deviceToken, placedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(name, surname, contact, email, deviceToken, placedAt).run()

    for (const item of cart) {
      await db.prepare(`
        INSERT INTO OrderItems (orderId, fragrance, product, size, qty, price, gender)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(
        orderResult.lastInsertRowid,
        item.fragrance,
        item.product,
        item.size,
        item.qty,
        item.price,
        item.gender
      ).run()
    }

    return new Response(JSON.stringify({ message: "Order placed successfully" }), { status: 200 })
  } catch (error) {
    console.error("Error placing order:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}

export async function GET(request, context) {
  try {
    const url = new URL(request.url)
    const deviceToken = url.searchParams.get("deviceToken")
    const db = context.env.indscent_db

    if (deviceToken) {
      const { results } = await db.prepare(`
        SELECT * FROM Orders WHERE deviceToken = ? ORDER BY placedAt DESC LIMIT 5
      `).bind(deviceToken).all()
      return new Response(JSON.stringify(results), { status: 200 })
    } else {
      const { results } = await db.prepare(`
        SELECT * FROM Orders ORDER BY placedAt DESC
      `).all()
      return new Response(JSON.stringify(results), { status: 200 })
    }
  } catch (error) {
    console.error("Error fetching orders:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
