import { NextResponse } from 'next/server';
import { getCryptoData, getExchangeRates } from '@/lib/crypto';

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
  });
}
