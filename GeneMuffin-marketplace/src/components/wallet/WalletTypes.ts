
export interface WalletOption {
  id: string;
  name: string;
  logo: string;
}

export interface TokenInfo {
  symbol: string;
  name: string;
  balance: string;
  usdValue: string;
}

export interface TransactionInfo {
  hash: string;
  type: string;
  status: string;
  amount: string;
  timestamp: string;
}

export const walletOptions: WalletOption[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'
  }, 
  {
    id: 'wallet-connect',
    name: 'WalletConnect',
    logo: 'https://avatars.githubusercontent.com/u/37784886'
  }, 
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    logo: 'https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png'
  }
];

export const mockTokens: TokenInfo[] = [
  { symbol: 'ETH', name: 'Ethereum', balance: '1.234', usdValue: '$2,345.67' },
  { symbol: 'GENE', name: 'GeneMuffin', balance: '420.69', usdValue: '$126.21' },
  { symbol: 'USDC', name: 'USD Coin', balance: '250.00', usdValue: '$250.00' }
];

export const mockTransactions: TransactionInfo[] = [
  { 
    hash: '0x3f8e7a9b5c6d...', 
    type: 'Transfer', 
    status: 'Confirmed', 
    amount: '0.25 ETH', 
    timestamp: '2h ago'
  },
  { 
    hash: '0x2a1b3c4d5e6f...', 
    type: 'Swap', 
    status: 'Confirmed', 
    amount: '100 GENE → 0.05 ETH', 
    timestamp: '1d ago'
  }
];
