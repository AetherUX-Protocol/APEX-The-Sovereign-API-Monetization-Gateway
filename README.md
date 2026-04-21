<img width="1024" height="559" alt="APEX The Sovereign API Monetization Gateway" src="https://github.com/user-attachments/assets/d372c12f-e652-4877-a750-7959f8dd3471" />
Repo:https://github.com/AetherUX-Protocol/APEX-The-Sovereign-API-Monetization-Gateway/blob/main/contracts/settlement.move
One Pager: https://docs.google.com/document/d/1x5zogFkzQzj7mTr3RUoq3stNvpPmETDBIReS10WNsdA/edit?usp=sharing
Demo Video: https://youtu.be/u1NTKag__8s
# APEX: Sovereign API Monetization Gateway 🚀

**Built for the INITIATE: Initia Hackathon (April 2026)**

APEX is a high-performance, revenue-first Appchain built on the **Initia Stack**. It enables B2B API providers to monetize their data services for the **Agentic Economy** with 100ms settlement finality and zero centralized middlemen.

## 🏗 Why APEX?
Current API marketplaces (like RapidAPI) take up to 20% in fees and hold revenue for 14+ days. APEX leverages **Initia’s Interwoven Stack** to allow:
- **Instant Payouts:** 100ms block times mean providers are paid the second an API call succeeds.
- **Agentic Commerce:** AI agents can use **Initia Session Keys** to pay for thousands of calls autonomously.
- **Custom Monetization:** Pay-per-call, pay-per-success, or tiered subscription models—all on-chain.

## 🛠 Tech Stack
- **Framework:** Initia Appchain Framework
- **Virtual Machine:** Move VM / CosmWasm
- **Interoperability:** Interwoven Bridge (for cross-chain liquidity)
- **Identity:** .init Usernames & Initia Session UX
- Frontend Integration: Uses @initia/interwovenkit-react for seamless wallet connection and session-based auto-signing, enabling a frictionless UX for AI agent management.

## 📂 Repository Structure
- `/contracts`: Move/CosmWasm smart contracts for atomic settlement.
- `/gateway-proxy`: The lightweight routing layer that verifies API success.
- `/.initia`: Hackathon submission metadata.
- ## ⚙️ Installation & Setup

To run the APEX Gateway locally, follow these steps:

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd APEX-GATEWAY
2. Install Dependencies
npm install
3. Configure Environment Variables
APEX requires specific network and security configurations to interact with the Initia blockchain.
cp .env.example .env
Open .env and fill in your Gateway Mnemonic and the Deployed Contract Address.

Note: Never commit your .env file to version control. The .env.example serves as a template for all required keys.

4. Start the Gateway
npm start


## 🚀 Quick Start
1. **Explore the Contracts:** Check `/contracts/src` for the settlement logic.
2. **View the One-Pager:** [Link to your Google Doc/PDF]
3. **Watch the Demo:** [Link to your YouTube Video]

## 🛡 Security & Audit
APEX incorporates hardware-anchored trust protocols to ensure that API responses are signed and verified, preventing data tampering in high-value logistics trades.
