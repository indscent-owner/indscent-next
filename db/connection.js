import Database from 'better-sqlite3'

const db = new Database('db/orders.db')

// Initialize table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_date TEXT,
    device_id TEXT,
    name TEXT,
    surname TEXT,
    contact TEXT,
    email TEXT,
    cartItems TEXT
  )
`).run()

export default db
