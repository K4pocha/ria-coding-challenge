import CurrencyConverter from '@/components/CurrencyConverter'; 

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ria Money Transfer</h1>
          <p className="text-gray-600">Internship Coding Challenge</p>
        </div>

        {/* render componente */}
        <CurrencyConverter />
        
      </div>
    </main>
  );
}