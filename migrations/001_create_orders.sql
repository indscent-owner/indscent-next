-- Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deviceToken TEXT,
  name TEXT,
  surname TEXT,
  contact TEXT,
  email TEXT,
  fragrance TEXT,
  product TEXT,
  quantity INTEGER,
  clientOrderNumber TEXT,
  placedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new', -- 'new', 'archived', 'deleted'
  supplierInvoiceNumber TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_status ON Orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_placedAt ON Orders(placedAt);

-- Trigger: Keep only the last 200 total orders
CREATE TRIGGER IF NOT EXISTS purge_old_orders
AFTER INSERT ON Orders
BEGIN
  DELETE FROM Orders
  WHERE id NOT IN (
    SELECT id FROM Orders ORDER BY placedAt DESC LIMIT 200
  );
END;

-- Trigger: Keep only the last 50 deleted orders
CREATE TRIGGER IF NOT EXISTS purge_old_deleted
AFTER UPDATE OF status ON Orders
WHEN NEW.status = 'deleted'
BEGIN
  DELETE FROM Orders
  WHERE status = 'deleted'
  AND id NOT IN (
    SELECT id FROM Orders WHERE status = 'deleted' ORDER BY placedAt DESC LIMIT 50
  );
END;
