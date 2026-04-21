"use client"
import { PropsWithChildren } from "react"
import { InterwovenKitProvider, TESTNET } from "@initia/interwovenkit-react"
import "@initia/interwovenkit-react/dist/index.css" // Import the mandatory styles

export default function Providers({ children }: PropsWithChildren) {
  return (
    <InterwovenKitProvider 
      chainConfig={TESTNET} 
      enableAutoSign={true} // Highlighting the Session UX feature
    >
      {children}
    </InterwovenKitProvider>
  )
}
