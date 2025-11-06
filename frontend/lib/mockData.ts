export interface Market {
    id: string;
    question: string;
    yesPrice: number;
    noPrice: number;
    volume: number;
    resolutionDate: Date;
    status: 'active' | 'pending' | 'resolved';
    category: string;
    description: string;
    priceHistory: { timestamp: Date; yesPrice: number; noPrice: number }[];
  }
  
  export interface UserPosition {
    marketId: string;
    marketQuestion: string;
    sharesHeld: number;
    position: 'yes' | 'no';
    avgBuyPrice: number;
    currentPrice: number;
  }
  
  export interface Trade {
    id: string;
    marketQuestion: string;
    type: 'buy' | 'sell';
    position: 'yes' | 'no';
    shares: number;
    price: number;
    timestamp: Date;
    txHash: string;
  }
  
  export interface LeaderboardEntry {
    rank: number;
    address: string;
    profit: number;
    volume: number;
    wins: number;
    losses: number;
  }
  
  export const mockMarkets: Market[] = [
    {
      id: '1',
      question: 'Will Bitcoin reach $100,000 by end of 2025?',
      yesPrice: 0.67,
      noPrice: 0.33,
      volume: 125000,
      resolutionDate: new Date('2025-12-31'),
      status: 'active',
      category: 'Crypto',
      description: 'This market resolves YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange by December 31, 2025, 11:59 PM UTC.',
      priceHistory: Array.from({ length: 30 }, (_, i) => ({
        timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        yesPrice: 0.5 + Math.random() * 0.2,
        noPrice: 0.5 - Math.random() * 0.2,
      })),
    },
    {
      id: '2',
      question: 'Will Ethereum switch to a new consensus mechanism in 2025?',
      yesPrice: 0.22,
      noPrice: 0.78,
      volume: 89000,
      resolutionDate: new Date('2025-12-31'),
      status: 'active',
      category: 'Crypto',
      description: 'Resolves YES if Ethereum mainnet implements a fundamentally different consensus mechanism than Proof of Stake.',
      priceHistory: Array.from({ length: 30 }, (_, i) => ({
        timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        yesPrice: 0.15 + Math.random() * 0.15,
        noPrice: 0.85 - Math.random() * 0.15,
      })),
    },
    {
      id: '3',
      question: 'Will a major AI company release AGI by 2026?',
      yesPrice: 0.45,
      noPrice: 0.55,
      volume: 210000,
      resolutionDate: new Date('2026-12-31'),
      status: 'active',
      category: 'Technology',
      description: 'Resolves YES if OpenAI, Google DeepMind, Anthropic, or Meta announces Artificial General Intelligence.',
      priceHistory: Array.from({ length: 30 }, (_, i) => ({
        timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        yesPrice: 0.4 + Math.random() * 0.15,
        noPrice: 0.6 - Math.random() * 0.15,
      })),
    },
    {
      id: '4',
      question: 'Will the S&P 500 be above 6000 by June 2025?',
      yesPrice: 0.58,
      noPrice: 0.42,
      volume: 340000,
      resolutionDate: new Date('2025-06-30'),
      status: 'active',
      category: 'Finance',
      description: 'Resolves YES if S&P 500 closes above 6000 on any trading day before June 30, 2025.',
      priceHistory: Array.from({ length: 30 }, (_, i) => ({
        timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        yesPrice: 0.5 + Math.random() * 0.2,
        noPrice: 0.5 - Math.random() * 0.2,
      })),
    },
    {
      id: '5',
      question: 'Will there be a successful SpaceX Mars landing in 2026?',
      yesPrice: 0.31,
      noPrice: 0.69,
      volume: 156000,
      resolutionDate: new Date('2026-12-31'),
      status: 'active',
      category: 'Space',
      description: 'Resolves YES if SpaceX successfully lands a spacecraft on Mars with confirmation.',
      priceHistory: Array.from({ length: 30 }, (_, i) => ({
        timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        yesPrice: 0.25 + Math.random() * 0.15,
        noPrice: 0.75 - Math.random() * 0.15,
      })),
    },
  ];
  
  export const mockUserPositions: UserPosition[] = [
    {
      marketId: '1',
      marketQuestion: 'Will Bitcoin reach $100,000 by end of 2025?',
      sharesHeld: 100,
      position: 'yes',
      avgBuyPrice: 0.62,
      currentPrice: 0.67,
    },
    {
      marketId: '3',
      marketQuestion: 'Will a major AI company release AGI by 2026?',
      sharesHeld: 250,
      position: 'no',
      avgBuyPrice: 0.58,
      currentPrice: 0.55,
    },
  ];
  
  export const mockTrades: Trade[] = [
    {
      id: '1',
      marketQuestion: 'Will Bitcoin reach $100,000 by end of 2025?',
      type: 'buy',
      position: 'yes',
      shares: 100,
      price: 0.62,
      timestamp: new Date('2025-01-15'),
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
    },
    {
      id: '2',
      marketQuestion: 'Will a major AI company release AGI by 2026?',
      type: 'buy',
      position: 'no',
      shares: 250,
      price: 0.58,
      timestamp: new Date('2025-01-10'),
      txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
    },
  ];
  
  export const mockLeaderboard: LeaderboardEntry[] = Array.from({ length: 100 }, (_, i) => ({
    rank: i + 1,
    address: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
    profit: Math.floor(Math.random() * 50000) - 10000,
    volume: Math.floor(Math.random() * 500000),
    wins: Math.floor(Math.random() * 50),
    losses: Math.floor(Math.random() * 30),
  }));
  
  export const platformStats = {
    totalMarkets: 1247,
    totalVolume: 12500000,
    totalUsers: 45623,
  };
  