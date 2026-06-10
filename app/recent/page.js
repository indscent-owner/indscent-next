import Link from "next/link"

export default async function RecentPage() {
  const res = await fetch("http://localhost:3000/api/orders?deviceToken=seed-device", { cache: "no-store" })
  const orders = await res.json()

  return (
    <div style={{
      backgroundColor: "#b0b0b0", // medium grey background
      minHeight: "100vh",
      padding: "15px",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Header */}
      <h2 style={{
        textAlign: "center",
        color: "#121212",
        marginBottom: "15px",
        fontWeight: "bold"
      }}>
        Recent Orders
      </h2>

      {/* Orders */}
      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#333" }}>No recent orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{
            backgroundColor: "#f2f2f2", // lighter grey box
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "15px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            {/* Order header */}
            <div style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "10px",
              paddingBottom: "5px"
            }}>
              <strong>Order #{String(order.id).padStart(6, "0")}</strong><br />
              <span style={{ color: "#555" }}>
                {new Date(order.placedAt).toLocaleString()}
              </span>
            </div>

            {/* Items */}
            {order.items?.split("||").map((item, idx, arr) => (
              <div key={idx} style={{
                borderBottom: idx === arr.length - 1 ? "none" : "1px solid #ddd",
                paddingBottom: "8px",
                marginBottom: "8px"
              }}>
                <div style={{ fontWeight: "bold" }}>{item}</div>
              </div>
            ))}

            {/* Total */}
            <div style={{
              borderTop: "1px solid #ccc",
              paddingTop: "8px",
              textAlign: "right",
              fontWeight: "bold"
            }}>
              Total: R{order.total}
            </div>
          </div>
        ))
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link href="/client">
          <button style={{
            backgroundColor: "#121212",
            color: "#FFD700",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer"
          }}>
            Back to Order Page
          </button>
        </Link>
      </div>
    </div>
  )
}
