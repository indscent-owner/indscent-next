export const runtime = 'edge'
import { NextResponse } from 'next/server'
import db from '../../../../db/connection.js'

export async function POST(req) {
  try {
    const body = await req.json()
    const stmt = db.prepare(`
      INSERT INTO orders (order_date, device_id, name, surname, contact, email, cartItems)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(
      new Date().toISOString(),
      body.device_id,
      body.name,
      body.surname,
      body.contact,
      body.email,
      JSON.stringify(body.cartItems)
    )

    return NextResponse.json({ success: true, orderNumber: result.lastInsertRowid })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
