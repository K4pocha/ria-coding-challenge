'use client'; // hooks

import { useState, useEffect } from 'react';
import { getCurrencies, convertCurrency } from '@/services/frankfurter';
import { Currencies } from '@/types/api';

export default function CurrencyConverter() {
  // Estados para guardar los datos del formulario
  const [currencies, setCurrencies] = useState<Currencies>({});
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<string>('USD');
  const [to, setTo] = useState<string>('EUR');

  // Estados para el resultado y la interfaz 
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar la lista de monedas al iniciar el componente
  useEffect(() => {
    getCurrencies()
      .then((data) => setCurrencies(data))
      .catch(() => setError('Error loading currencies.'));
  }, []);

  // Función que ejecuta la conversión
  const handleConvert = async () => {
    if (!amount) return;

    setLoading(true);
    setError(null);

    try {
      const val = await convertCurrency(amount, from, to);
      setResult(val);
    } catch (err) {
      setError('Error converting currency. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  // Renderizado del UI 
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Convertidor</h2>

      {/* Input de Monto */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          min="0"
        />
      </div>

      {/* Selectores de Moneda */}
      <div className="flex flex-col sm:flex-row items-end gap-4 mb-6 relative">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>

        {/* Boton swap */}
        <div className="flex justify-center -mb-1">
          <button
            onClick={handleSwap}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors border border-gray-200"
            title="Intercambiar monedas"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>
        </div>

        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">A</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón de Acción con estado de Loading */}
      <button
        onClick={handleConvert}
        disabled={loading}
        className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors disabled:bg-orange-300 font-medium"
      >
        {loading ? 'Convirtiendo...' : 'Convertir'}
      </button>

      {/* Manejo de Errores */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Visualización del Resultado */}
      {result !== null && !loading && !error && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Resultado</p>
          <p className="text-3xl font-bold text-gray-900">
            {new Intl.NumberFormat('es-CL', { style: 'currency', currency: to }).format(result)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            1 {from} = {(result / amount).toFixed(4)} {to}
          </p>
        </div>
      )}
    </div>
  );
}