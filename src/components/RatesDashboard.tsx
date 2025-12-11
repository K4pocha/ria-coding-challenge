'use client';

import { useState, useEffect } from 'react';
import { getLatestRates, getCurrencies } from '@/services/frankfurter';
import { ExchangeRateResponse, Currencies } from '@/types/api';

export default function RatesDashboard() {
  const [ratesData, setRatesData] = useState<ExchangeRateResponse | null>(null);
  const [base, setBase] = useState<string>('EUR');
  const [currencies, setCurrencies] = useState<Currencies>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar lista de monedas (Nombres)
  useEffect(() => {
    getCurrencies().then(setCurrencies).catch(console.error);
  }, []);

  // Cargar tasas cuando cambia la base
  useEffect(() => {
    setLoading(true);
    getLatestRates(base)
      .then((data) => {
        setRatesData(data);
        setError(null);
      })
      .catch(() => setError('Error fetching rates'))
      .finally(() => setLoading(false));
  }, [base]);

  // Obtener URL de la bandera desde FlagCDN
  const getFlagUrl = (currencyCode: string) => {
    // Caso especial: Euro
    if (currencyCode === 'EUR') return 'https://flagcdn.com/w40/eu.png';
    
    // Para la mayoría, las primeras 2 letras del código de moneda sirven como código de país
    // Ej: USD -> US, JPY -> JP, CLP -> CL
    const countryCode = currencyCode.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/w40/${countryCode}.png`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Tipos de Cambio Actuales</h2>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Base:</label>
          <select
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none text-sm"
          >
            {Object.keys(currencies).map((code) => (
              <option key={code} value={code}>
                {currencies[code]} ({code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Moneda</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Valor (1 {base})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ratesData?.rates && Object.entries(ratesData.rates).map(([code, rate]) => (
                <tr key={code} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-800 font-medium flex items-center gap-3">
                    {/* Imagen de la bandera */}
                    <img 
                      src={getFlagUrl(code)} 
                      alt={`Bandera de ${code}`} 
                      className="w-6 h-4 object-cover rounded-sm shadow-sm"
                      onError={(e) => {
                        // Si falla la imagen, ponemos un icono genérico
                        (e.target as HTMLImageElement).src = 'https://flagcdn.com/w40/un.png';
                      }}
                    />
                    {/* Nombre Largo  */}
                    <span>
                      {currencies[code] || code} <span className="text-gray-400 font-normal">({code})</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-gray-700">
                    {rate.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-4 text-right">
            Última actualización: {ratesData?.date}
          </p>
        </div>
      )}
    </div>
  );
}