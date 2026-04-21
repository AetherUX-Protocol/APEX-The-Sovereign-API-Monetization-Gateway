"use client"
import { useWallet, useAutoSign, useAccount } from "@initia/interwovenkit-react"
import { useState } from "react"

export default function ApexDashboard() {
  const { address, isConnected } = useAccount()
  const { connect, disconnect } = useWallet()
  const { isAutoSignEnabled, toggleAutoSign } = useAutoSign()
  const [status, setStatus] = useState("Idle")

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ borderBottom: "1px solid #eaeaea", paddingBottom: "20px", marginBottom: "30px" }}>
        <h1>APEX Gateway Control</h1>
        <p>Sovereign API Monetization & Agentic Commerce</p>
      </header>

      {!isConnected ? (
        <div style={{ textAlign: "center", padding: "50px", border: "1px dashed #ccc", borderRadius: "12px" }}>
          <h3>Welcome to APEX</h3>
          <p>Connect your Initia Wallet to manage your API revenue and agent sessions.</p>
          <button 
            onClick={() => connect()} 
            style={{ backgroundColor: "#ff4000", color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}
          >
            Connect Initia Wallet
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {/* Account Card */}
          <div style={{ padding: "20px", borderRadius: "12px", background: "#f9f9f9", border: "1px solid #eee" }}>
            <h4>Connected Account</h4>
            <code style={{ background: "#eee", padding: "5px 10px", borderRadius: "4px" }}>{address}</code>
            <button onClick={() => disconnect()} style={{ marginLeft: "15px", background: "none", border: "none", color: "red", cursor: "pointer" }}>Disconnect</button>
          </div>

          {/* Session UX Card - The Winner Feature */}
          <div style={{ padding: "20px", borderRadius: "12px", background: "#eef2ff", border: "1px solid #c7d2fe" }}>
            <h4>Agentic Session (Auto-Sign)</h4>
            <p>Enable high-frequency M2M calls by authorizing a 24-hour spending session.</p>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <button 
                onClick={() => toggleAutoSign()}
                style={{
                  backgroundColor: isAutoSignEnabled ? "#10b981" : "#6366f1",
                  color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer"
                }}
              >
                {isAutoSignEnabled ? "Disable Auto-Sign" : "Enable Auto-Sign"}
              </button>
              <span style={{ fontWeight: "bold", color: isAutoSignEnabled ? "#10b981" : "#6366f1" }}>
                Status: {isAutoSignEnabled ? "Active (Agent Authorized)" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Live Activity (Simulated Gateway Feed) */}
          <div style={{ padding: "20px", borderRadius: "12px", background: "#111", color: "#0f0", fontFamily: "monospace" }}>
            <div>[APEX-GATEWAY]: Monitoring API Traffic...</div>
            <div>[SYSTEM]: {status}</div>
          </div>
        </div>
      )}
    </div>
  )
}
