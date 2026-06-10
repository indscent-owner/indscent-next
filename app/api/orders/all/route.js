import { NextResponse } from 'next/server'
import db from '../../../../db/connection.js'

export async function GET() {
  const stmt = db.prepare(`SELECT * FROM orders ORDER BY id DESC`)
  const rows = stmt.all()
  return NextResponse.json(rows.map(r => ({
    ...r,
    cartItems: JSON.parse(r.cartItems)
  })))
}
