export const runtime = 'edge'
export async function POST(request, env) {
  try {
    const body = await request.json()
    const { name, surname, contact, email, cart, deviceToken } = body

    if (!name || !surname || !contact || !email || !cart || cart.length === 0 || !deviceToken) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const placedAt = new Date().toISOString()

    // Local dev fallback
    if (!env?.indscent_db) {
      return new Response(JSON.stringify({
        mock: true,
        order: { id: Math.floor(Math.random() * 1000), name, surname, contact, email, deviceToken, placedAt, cart }
      }), { status: 200 })
    }

    // Real DB insert
    const orderStmt = env.indscent_db.prepare(`
      INSERT INTO Orders (name, surname, contact, email, deviceToken, placedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(name, surname, contact, email, deviceToken, placedAt)
    const orderResult = await orderStmt.run()

    for (const item of cart) {
      await env.indscent_db.prepare(`
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

export async function GET(request, env) {
  try {
    const url = new URL(request.url)
    const deviceToken = url.searchParams.get("deviceToken")

    if (!env?.indscent_db) {
      // Local mock data
      return new Response(JSON.stringify([
        { id: 1, name: "Mock User", surname: "One", email: "mock1@example.com", placedAt: new Date().toISOString(), deviceToken },
        { id: 2, name: "Mock User", surname: "Two", email: "mock2@example.com", placedAt: new Date().toISOString(), deviceToken }
      ]), { status: 200 })
    }

    if (deviceToken) {
      const { results } = await env.indscent_db.prepare(`
        SELECT * FROM Orders WHERE deviceToken = ? ORDER BY placedAt DESC LIMIT 5
      `).bind(deviceToken).all()
      return new Response(JSON.stringify(results), { status: 200 })
    } else {
      const { results } = await env.indscent_db.prepare(`
        SELECT * FROM Orders ORDER BY placedAt DESC
      `).all()
      return new Response(JSON.stringify(results), { status: 200 })
    }
  } catch (error) {
    console.error("Error fetching orders:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
