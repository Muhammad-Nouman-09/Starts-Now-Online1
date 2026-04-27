import { CryptoRate, BlogPost } from "./types";

export const CRYPTO_SCRAPE_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
export const CRYPTO_RATES_REVALIDATE_SECONDS = 10800;

export const FIXED_EXCHANGE_RATES = {
  usdToPkr: 278,
  usdToInr: 83,
} as const;

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Crypto Strategy 101: How to Navigate the Markets (2026 Guide)",
    excerpt: "Master the basics of Bitcoin, DeFi, and blockchain with our 2026 Crypto Beginner Guide. Learn how to secure your assets and use professional tools to grow your portfolio.",
    content: `## **Introduction**
The world of digital assets moves fast. If you’re just entering the space, the sheer volume of data can be overwhelming. At Starts Now, we believe that successful trading begins with clarity. This guide breaks down the essentials of blockchain technology, DeFi, and portfolio management to help you move from a beginner to a confident participant in the Web3 economy.

### 1. **Understanding the Blockchain Foundation**
Before using any crypto tools, you must understand the ledger. A blockchain is a decentralized, immutable record of transactions. Whether you are trading Bitcoin (BTC) or Ethereum (ETH), you are interacting with a global network that operates 24/7.

**Key Concept:** Private keys are your identity. "Not your keys, not your crypto."

### 2. **Setting Up Your Digital Infrastructure**
To start, you need a secure entry point.

*   **Wallets:** Choose between "Hot Wallets" (for daily utility) and "Cold Storage" (for long-term security).
*   **Exchanges:** Use Tier-1 exchanges to convert your local currency into digital assets.
*   **Analysis Tools:** Use the Starts Now Terminal to track market velocities and ROI simulations before making a move.

### 3. **The Rise of Decentralized Finance (DeFi)**
DeFi is the shift from traditional banks to automated smart contracts. Beginners should explore:

1.  **Staking:** Earning rewards for holding assets.
2.  **Liquidity Pools:** Providing assets to decentralized exchanges.
3.  **Stablecoins:** Digital assets pegged to the US Dollar to hedge against volatility.

### 4. **Risk Management: The Golden Rule**
The most important part of any crypto strategy is protecting your capital.

*   Never invest more than you can lose.
*   **Diversify:** Don't put all your capital into one "altcoin."
*   **Use Data, Not Hype:** Avoid "FOMO" (Fear Of Missing Out). Use technical indicators and real-time data relays to inform your decisions.

## Conclusion
The future of finance isn't coming—it’s already here. By focusing on education and utilizing professional-grade tools, you can navigate this landscape with confidence. Your journey into the decentralized world Starts Now.`,
    date: "2026-04-27",
    author: "Starts Now Editorial",
    category: "Beginner's Guide",
    readTime: "5 min",
    alignment: "justify",
    fontFamily: "Inter, sans-serif",
    lineHeight: "1.8"
  },
  {
    id: "2",
    title: "ZK-Proof Integration in Modern Finance",
    excerpt: "Why zero-knowledge proofs are becoming the non-negotiable standard for sovereign transactions.",
    content: "Privacy in the digital age is often treated as an afterthought, but in high-frequency trading and sovereign fund management, transparency is a liability. Zero-knowledge proofs (ZKPs) offer a way to verify transaction validity without revealing the underlying data, creating a new paradigm for institutional privacy...",
    date: "2026-04-20",
    author: "Elena Vance",
    category: "Technology",
    readTime: "8 min"
  },
  {
    id: "3",
    title: "Institutional Onboarding: The New Wave",
    excerpt: "How traditional banking giants are finally committing to on-chain infrastructure.",
    content: "For a decade, the narrative of 'institutional adoption' felt like a mirage. In 2026, the mirage has materialized into concrete infrastructure. Legacy banks are no longer just 'exploring' blockchain; they are issuing tokenized assets and utilizing on-chain settlement layers for cross-border transactions...",
    date: "2026-04-22",
    author: "Marcus Thorne",
    category: "Economy",
    readTime: "4 min"
  },
  {
    id: "4",
    title: "Security Protocols: Non-Custodial Safeguards",
    excerpt: "A comprehensive guide to multi-sig setups and hardware security in 2026.",
    content: "As digital asset valuations climb, the sophistication of attack vectors follows suit. Basic 2FA is no longer sufficient for high-value portfolios. This intelligence brief outlines the shift towards bio-signed multi-sig layers and the role of localized air-gapped nodes in modern custody...",
    date: "2026-04-23",
    author: "Elena Vance",
    category: "Security",
    readTime: "6 min"
  },
  {
    id: "5",
    title: "The Rise of Modular Blockchains",
    excerpt: "Why separation of execution and data availability is winning the scaling wars.",
    content: "Monolithic chains are hitting performance ceilings that modular architectures easily bypass. By decoupling the execution layer from data availability, new-age protocols are achieving throughputs once thought impossible. We analyze the market dominance of modular stacks in the current cycle...",
    date: "2026-04-24",
    author: "Alex Rivers",
    category: "Technology",
    readTime: "7 min"
  },
  {
    id: "6",
    title: "Stablecoin Stability: New Models",
    excerpt: "Analyzing the resilience of over-collateralized vs. algorithmic models.",
    content: "The stability of digital currencies is the bedrock of the decentralized economy. Recent market fluctuations have tested even the most robust models. We take a look at how liquid-staking derivatives (LSDs) are being used as collateral to maintain hard pegs in extreme conditions...",
    date: "2026-04-25",
    author: "Marcus Thorne",
    category: "Economy",
    readTime: "5 min"
  }
];
