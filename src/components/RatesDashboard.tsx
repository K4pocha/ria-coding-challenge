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
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filtrado (logica)
    const filteredRates = ratesData?.rates
        ? Object.entries(ratesData.rates).filter(([code]) => {
            const name = currencies[code] || '';
            const search = searchTerm.toLowerCase();
            // Busca por código (USD) o por nombre (Dollar)
            return code.toLowerCase().includes(search) || name.toLowerCase().includes(search);
        })
        : [];

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
            <div className="relative w-full sm:w-auto flex-grow">
                <input
                    type="text"
                    placeholder="Buscar moneda (ej: MXN...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
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
                        <thead className="sticky top-0 bg-white z-10 shadow-sm">
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="py-3 px-4 pl-12 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Moneda</th>
                                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Valor (1 {base})</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRates.length > 0 ? (
                                filteredRates.map(([code, rate]) => (
                                    <tr key={code} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 text-gray-800 font-medium">
                                            <div className="flex items-center justify-start gap-3 pl-8"> {/* Alineado a la izquierda con padding */}
                                                {/* Bandera */}
                                                <img
                                                    src={getFlagUrl(code)}
                                                    alt={code}
                                                    className="w-8 h-5 object-cover rounded shadow-sm border border-gray-100"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w40/un.png'; }}
                                                />
                                                {/* Nombre y Código */}
                                                <div className="flex flex-col text-left">
                                                    <span className="text-sm font-bold text-gray-700">
                                                        {currencies[code] || code}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-medium">
                                                        {code}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-3 px-4 text-center font-mono text-gray-700 text-sm">
                                            {rate.toFixed(4)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="py-10 text-center text-gray-500 text-sm">
                                        No se encontraron monedas para "{searchTerm}"
                                    </td>
                                </tr>
                            )}
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