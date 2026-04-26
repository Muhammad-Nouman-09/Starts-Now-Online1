import { CRYPTO_SCRAPE_URL, CRYPTO_RATES_REVALIDATE_SECONDS, FIXED_EXCHANGE_RATES } from "@/constants";
import { CryptoRate } from "@/types";

export async function getCryptoData(): Promise<{ coins: CryptoRate[], usedFallback: boolean, fetchedAt: string }> {
  try {
    const response = await fetch(CRYPTO_SCRAPE_URL, {
      next: { revalidate: CRYPTO_RATES_REVALIDATE_SECONDS },
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const coins: CryptoRate[] = data.map((coin: any) => ({
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          usdPrice: coin.current_price,
          change3h: 0, // Not directly available in this endpoint
          change24h: Math.round((coin.price_change_percentage_24h || 0) * 100) / 100,
          marketCap: coin.market_cap,
          volume24h: coin.total_volume,
          description: ""
        }));

        if (coins.length > 0) {
          return {
            coins,
            usedFallback: false,
            fetchedAt: new Date().toISOString()
          };
        }
      }
    }
    
    throw new Error(`CoinGecko API returned status ${response.status}`);
  } catch (error) {
    console.error("CoinGecko API error:", error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function getExchangeRates(): Promise<{ usdToPkr: number, usdToInr: number }> {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=pkr,inr", {
      next: { revalidate: CRYPTO_RATES_REVALIDATE_SECONDS },
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data?.tether?.pkr && data?.tether?.inr) {
        return {
          usdToPkr: data.tether.pkr,
          usdToInr: data.tether.inr,
        };
      }
    }
    throw new Error(`Exchange rates API returned status ${response.status}`);
  } catch (error) {
    console.error("CoinGecko Exchange API error:", error instanceof Error ? error.message : String(error));
    return { usdToPkr: FIXED_EXCHANGE_RATES.usdToPkr, usdToInr: FIXED_EXCHANGE_RATES.usdToInr };
  }
}
