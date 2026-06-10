-- Insert 250 dummy orders to test triggers
DELETE FROM Orders;

WITH RECURSIVE cnt(x) AS (
  SELECT 1
  UNION ALL
  SELECT x + 1 FROM cnt WHERE x < 250
)
INSERT INTO Orders (deviceToken, name, surname, contact, email, fragrance, product, quantity, clientOrderNumber, status)
SELECT
  'token-' || x,
  'TestName' || x,
  'TestSurname' || x,
  '000-000-' || x,
  'test' || x || '@example.com',
  'Fragrance ' || (x % 10),
  'Product ' || (x % 5),
  (x % 3) + 1,
  'ORD-' || x,
  'new'
FROM cnt;

-- Verify total count
SELECT COUNT(*) AS total_orders FROM Orders;
