import CurrencyConverter from '@/components/CurrencyConverter';
import RatesDashboard from '@/components/RatesDashboard';
import HistoricalChart from '@/components/HistoricalChart';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">


          <div className="flex items-center gap-2">
            <div className="bg-orange-600 text-white font-bold text-3xl h-12 w-12 flex items-center justify-center rounded-lg pb-1 shadow-sm">
              R
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-3xl font-extrabold text-orange-600 tracking-tighter">ria</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-0.5">Exchange</span>
            </div>
          </div>


        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Título */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Conversor de dinero actualizado <br className="hidden sm:block" />
              <span className="text-orange-600">desde Chile</span> al mundo
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Consulta las tasas de cambio en tiempo real y analiza las tendencias del mercado antes de tomar decisiones.
            </p>
          </div>

          {/* Grid de Componentes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Columna Izquierda: Gráfico y Tasas (Ocupa más espacio en desktop) */}
            <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
              <HistoricalChart />
              <RatesDashboard />
            </div>

            {/* Columna Derecha: Convertidor (Sticky/Fijo para destacar) */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="sticky top-24">
                <CurrencyConverter />

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Ria challenge </p>
        </div>
      </footer>
    </div>
  );
}