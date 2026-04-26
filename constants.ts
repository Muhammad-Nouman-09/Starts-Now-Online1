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
    title: "The 2026 Liquidity Crisis: A Post-Mortem",
    excerpt: "Analyzing the systemic failures in decentralized exchange protocols during the Q1 volatility spike.",
    content: "The Q1 2026 market cycle will be remembered as the first major stress test for modular liquidity pools. As the volatility spike hit, multi-hop swap routes began to fail due to insufficient deep-liquidity reserves. This post-mortem explores how future protocols can build more resilient automated market makers...",
    date: "2026-04-15",
    author: "Alex Rivers",
    category: "Market Analysis",
    readTime: "5 min"
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
