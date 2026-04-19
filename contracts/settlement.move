module your_address::apex_settlement {
    use std::signer;
    use std::vector;
    use initia_std::coin;
    use initia_std::init_coin::InitCoin; // Using INIT as the primary gas/payment token

    /// Error codes
    const E_NOT_AUTHORIZED: u64 = 1;
    const E_INSUFFICIENT_FUNDS: u64 = 2;
    const E_API_ALREADY_REGISTERED: u64 = 3;

    /// Resources
    struct APIProvider has key {
        price_per_call: u64,
        total_revenue: u64,
        wallet_address: address,
    }

    struct EscrowAccount has key {
        balance: coin::Coin<InitCoin>,
    }

    /// Events (for the Gateway to listen to)
    struct SettlementEvent has drop, store {
        provider: address,
        consumer: address,
        amount: u64,
    }

    /// Public Functions

    /// 1. Register an API Provider (Set the price)
    public entry fun register_provider(account: &signer, price: u64) {
        let addr = signer::address_of(account);
        assert!(!exists<APIProvider>(addr), E_API_ALREADY_REGISTERED);
        
        move_to(account, APIProvider {
            price_per_call: price,
            total_revenue: 0,
            wallet_address: addr,
        });
    }

    /// 2. Consumer Deposits Funds into Escrow (for Agentic Sessions)
    public entry fun deposit_escrow(account: &signer, amount: u64) {
        let coin = coin::withdraw<InitCoin>(account, amount);
        if (!exists<EscrowAccount>(signer::address_of(account))) {
            move_to(account, EscrowAccount { balance: coin });
        } else {
            let escrow = borrow_global_mut<EscrowAccount>(signer::address_of(account));
            coin::merge(&mut escrow.balance, coin);
        };
    }

    /// 3. Settlement Trigger (Called by Gateway upon 200 OK success)
    /// In production, this would be gated by the Gateway's multisig or hardware anchor
    public entry fun settle_call(
        gateway: &signer, 
        consumer: address, 
        provider: address
    ) acquires APIProvider, EscrowAccount {
        // Verification: Ensure the provider exists
        let provider_data = borrow_global_mut<APIProvider>(provider);
        let amount = provider_data.price_per_call;

        // Execute: Move funds from Consumer Escrow to Provider
        let escrow = borrow_global_mut<EscrowAccount>(consumer);
        assert!(coin::value(&escrow.balance) >= amount, E_INSUFFICIENT_FUNDS);
        
        let payment = coin::extract(&mut escrow.balance, amount);
        coin::deposit(provider, payment);

        // Update Stats
        provider_data.total_revenue = provider_data.total_revenue + amount;
    }

    /// View Functions
    #[view]
    public fun get_price(provider: address): u64 acquires APIProvider {
        borrow_global<APIProvider>(provider).price_per_call
    }
}
