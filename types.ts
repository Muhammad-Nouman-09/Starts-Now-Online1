export interface CryptoRate {
  name: string;
  symbol: string;
  usdPrice: number;
  change3h: number;
  change24h: number;
  marketCap?: number;
  volume24h?: number;
  description?: string;
}

export interface CryptoExchangeRates {
  usdToPkr: number;
  usdToInr: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  fontFamily?: string;
  alignment?: "left" | "center" | "right" | "justify";
  lineHeight?: string;
}

export interface CryptoSnapshot {
  coins: CryptoRate[];
  exchangeRates: CryptoExchangeRates;
  fetchedAt: string;
  sourceUrl: string;
  note: string;
  usedFallback: boolean;
}
