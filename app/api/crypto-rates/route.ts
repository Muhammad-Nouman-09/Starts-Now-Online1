import { NextResponse } from 'next/server';
import { getCryptoData, getExchangeRates } from '@/lib/crypto';

export const revalidate = 3600;

export async function GET() {
  const [data, exchangeRates] = await Promise.all([
    getCryptoData(),
    getExchangeRates()
  ]);
  
  return NextResponse.json({
    ...data,
    exchangeRates,
    message: data.usedFallback 
      ? "Scraper running in Hybrid Relay mode. Using cached intelligence." 
      : "Live intelligence synchronized from global relay."
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    }
  });
}
