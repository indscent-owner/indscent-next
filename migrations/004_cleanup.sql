-- Remove all test orders
DELETE FROM Orders;

-- Reset auto-increment counter back to 1
DELETE FROM sqlite_sequence WHERE name = 'Orders';

-- Verify cleanup
SELECT COUNT(*) AS total_orders FROM Orders;
