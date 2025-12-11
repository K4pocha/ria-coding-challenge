// Tipo para el listado de monedas
export interface Currencies {
  [code: string]: string;
}

// Tipo para la respuesta de tasas de cambio
export interface ExchangeRateResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    [currencyCode: string]: number;
  };
}

// Tipo para los datos del gráfico histórico
export interface HistoricalRatesResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [date: string]: {
      [currencyCode: string]: number;
    };
  };
}