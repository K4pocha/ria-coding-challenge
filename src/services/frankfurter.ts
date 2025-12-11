import { Currencies, ExchangeRateResponse, HistoricalRatesResponse } from '@/types/api';

const BASE_URL = 'https://api.frankfurter.app';

// Obtener lista de monedas disponibles
export const getCurrencies = async (): Promise<Currencies> => {
  const res = await fetch(`${BASE_URL}/currencies`);
  if (!res.ok) throw new Error('Failed to fetch currencies');
  return res.json();
};

// Obtener tasas de cambio actuales
// Por defecto traemos las tasas base EUR para el dashboard
export const getLatestRates = async (base: string = 'EUR'): Promise<ExchangeRateResponse> => {
  const res = await fetch(`${BASE_URL}/latest?from=${base}`);
  if (!res.ok) throw new Error('Failed to fetch rates');
  return res.json();
};

// Conversión específica (para la funcionalidad "Currency Converter")
export const convertCurrency = async (amount: number, from: string, to: string): Promise<number> => {
  if (from === to) return amount;
  
  // La API permite pasar amount, from y to
  const res = await fetch(`${BASE_URL}/latest?amount=${amount}&from=${from}&to=${to}`);
  
  if (!res.ok) throw new Error('Error converting currency');
  
  const data: ExchangeRateResponse = await res.json();
  // La API devuelve: { rates: { "TO_CURRENCY": valor } }
  return data.rates[to];
};

// Datos históricos (para el Bonus)
// Obtiene los últimos 30 días
export const getHistoricalRates = async (base: string, target: string): Promise<HistoricalRatesResponse> => {
  const endDate = new Date().toISOString().split('T')[0]; // Hoy
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Hace 30 días

  const res = await fetch(`${BASE_URL}/${startDate}..${endDate}?from=${base}&to=${target}`);
  if (!res.ok) throw new Error('Failed to fetch historical data');
  return res.json();
};