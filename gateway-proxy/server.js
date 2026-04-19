const express = require('express');
const axios = require('axios');
const { RESTClient, LCDClient, Wallet, MsgExecute } = require('@initia/initia.js');

const app = express();
app.use(express.json());

// 1. Initia Network Configuration
const lcd = new LCDClient('https://lcd.testnet.initia.xyz', {
    chainID: 'initiation-1',
});

// The Gateway's "Hot Wallet" that has permission to call 'settle_call'
const gatewayMnemonic = "YOUR_GATEWAY_SECRET_MNEMONIC"; 
const wallet = new Wallet(lcd, gatewayMnemonic);

// 2. The Proxy Logic
app.post('/proxy', async (req, res) => {
    const { consumerAddress, providerAddress, apiEndpoint, payload } = req.body;

    try {
        console.log(`[APEX] Forwarding request from ${consumerAddress} to ${apiEndpoint}`);

        // Step A: Call the actual B2B API (e.g., Fuel Logistics Data)
        const apiResponse = await axios.post(apiEndpoint, payload);

        // Step B: If the API returns 200 OK, trigger on-chain settlement
        if (apiResponse.status === 200) {
            console.log(`[APEX] Success! Triggering 100ms settlement on Initia...`);

            const msg = new MsgExecute(
                wallet.key.accAddress, // Gateway address
                "your_contract_address", 
                "apex_settlement", 
                "settle_call", 
                [], // Type arguments
                [consumerAddress, providerAddress] // Function arguments
            );

            const tx = await wallet.createAndSignTx({ msgs: [msg] });
            const result = await lcd.tx.broadcast(tx);

            res.status(200).json({
                message: "API Call Successful & Paid",
                txHash: result.txhash,
                data: apiResponse.data
            });
        }
    } catch (error) {
        console.error("[APEX] Error:", error.message);
        res.status(500).json({ error: "API Call Failed or Settlement Error" });
    }
});

app.listen(3000, () => console.log('APEX Gateway running on port 3000'));
