export const runtime = 'edge'

'use client'
import React from 'react'
import Link from 'next/link'   // ✅ Import Link

export default function HomePage() {
  return (
    <div
      style={{
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
        background: 'url("/background.jpg") no-repeat center center fixed',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: '#fff'
      }}
    >
      <div
        style={{
          textAlign: 'center',
          background: 'rgba(18, 18, 18, 0.7)',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}
      >
        {/* Logo */}
        <img
          src="/logo.png"
          alt="inDscent Logo"
          style={{
            width: '220px',
            height: 'auto',
            marginBottom: '20px',
            filter: 'drop-shadow(0 0 10px #E5C158) drop-shadow(0 0 20px #fff)',
            animation: 'shimmer 2s infinite alternate'
          }}
        />

{/* Buttons */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
  <a
    href="/client"
    style={{
      background: '#121212',
      color: '#E5C158',
      border: '2px solid #E5C158',
      padding: '14px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textDecoration: 'none',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    }}
  >
    Place an Order
  </a>

  <a
    href="/gallery"
    style={{
      background: '#121212',
      color: '#E5C158',
      border: '2px solid #E5C158',
      padding: '14px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textDecoration: 'none',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    }}
  >
    View Gallery
  </a>

  <a
    href="/api/catalog"
    style={{
      background: '#121212',
      color: '#E5C158',
      border: '2px solid #E5C158',
      padding: '14px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textDecoration: 'none',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    }}
  >
    Download Perfume List
  </a>
</div>


        {/* Footer with clickable link */}
        <div style={{ marginTop: '25px', fontSize: '12px', color: '#ccc' }}>
          <Link href="/adminlogin" style={{ textDecoration: 'none', color: '#ccc' }}>
            © 2026 inDscent Fragrances
          </Link>
        </div>
      </div>

      {/* Glow animation */}
      <style>
        {`
          @keyframes shimmer {
            from { filter: drop-shadow(0 0 10px #E5C158) drop-shadow(0 0 20px #fff); }
            to { filter: drop-shadow(0 0 20px #FFD700) drop-shadow(0 0 30px #fff); }
          }
        `}
      </style>
    </div>
  )
}
