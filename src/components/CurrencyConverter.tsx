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
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          min="0"
        />
      </div>

      {/* Selectores de Moneda */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">A</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 font-medium"
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