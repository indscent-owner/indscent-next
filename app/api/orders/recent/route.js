import { NextResponse } from 'next/server'
import db from '../../../../db/connection.js'

export async function GET(req) {
  const deviceId = req.nextUrl.searchParams.get("device_id")
  const stmt = db.prepare(`
    SELECT * FROM orders WHERE device_id = ? ORDER BY id DESC LIMIT 5
  `)
  const rows = stmt.all(deviceId)
  return NextResponse.json(rows.map(r => ({
    ...r,
    cartItems: JSON.parse(r.cartItems)
  })))
}
