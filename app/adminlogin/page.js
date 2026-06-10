"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === "L33H3ndr!ck5") {
      router.push("/admin")
    } else {
      setError("Incorrect password")
    }
  }

  return (
    <div style={{
      backgroundColor: "#b0b0b0",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "#f2f2f2",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        width: "300px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
        <button type="submit" style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#121212",
          color: "#FFD700",
          border: "none",
          borderRadius: "4px",
          fontWeight: "600",
          cursor: "pointer"
        }}>
          Login
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  )
}
