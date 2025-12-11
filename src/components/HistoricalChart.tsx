'use client';

import { useState, useEffect } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { getHistoricalRates, getCurrencies } from '@/services/frankfurter';
import { Currencies, HistoricalRatesResponse } from '@/types/api';

export default function HistoricalChart() {
    const [data, setData] = useState<any[]>([]);
    const [base, setBase] = useState('USD');
    const [target, setTarget] = useState('EUR');
    const [currencies, setCurrencies] = useState<Currencies>({});
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(7); // 1 semana x defecto

    const periods = [
        { label: '1S', value: 7 },
        { label: '1M', value: 30 },
        { label: '3M', value: 90 },
        { label: '6M', value: 180 },
        { label: '1Y', value: 365 },
    ];

    // Cargar lista de monedas
    useEffect(() => {
        getCurrencies().then(setCurrencies);
    }, []);

    // Cargar datos históricos
    useEffect(() => {
        setLoading(true);
        getHistoricalRates(base, target, days)
            .then((history: HistoricalRatesResponse) => {
                const chartData = Object.entries(history.rates).map(([date, rates]) => ({
                    date,
                    rate: rates[target]
                }));
                setData(chartData);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [base, target, days]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            {/* Cabecera con Botones */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Tendencia Histórica</h2>

                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {periods.map((p) => (
                        <button
                            key={p.label}
                            onClick={() => setDays(p.value)}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${days === p.value
                                    ? 'bg-white text-orange-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Selectores */}
            <div className="flex gap-4 mb-6">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Base</label>
                    <select
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        className="p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {Object.keys(currencies).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Comparar con</label>
                    <select
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {Object.keys(currencies).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            {/* Gráfico */}
            <div className="h-[300px] w-full">
                {loading ? (
                    <div className="h-full flex items-center justify-center text-gray-400">Cargando gráfico...</div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 12 }}
                                tickFormatter={(str: string) => {
                                    const date = new Date(str);
                                    return `${date.getDate()}/${date.getMonth() + 1}`;
                                }}
                            />

                            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="rate"
                                stroke="#ea580c"
                                fillOpacity={1}
                                fill="url(#colorRate)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
                Analizando la tendencia de los últimos {days} días.
            </p>
        </div>
    );
}