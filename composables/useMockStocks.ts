import type { Stock } from '~/types/stock'
import { useStockStore } from '~/stores/stockStore'

export const useMockStocks = () => {
  const stockStore = useStockStore()

  // 基礎股票數據
  const stocksBase = [
    {
      id: '2330',
      name: '台積電',
      industry: '半導體業',
      financials: [
        { year: 2023, eps: 18.64, margins: { operating: 41.65, gross: 54.20, net: 39.30 } },
        { year: 2022, eps: 19.25, margins: { operating: 42.80, gross: 55.60, net: 40.10 } },
        { year: 2021, eps: 15.84, margins: { operating: 40.90, gross: 52.70, net: 37.90 } }
      ]
    },
    {
      id: '2317',
      name: '鴻海',
      industry: '電子零組件業',
      financials: [
        { year: 2023, eps: 8.92, margins: { operating: 2.85, gross: 6.20, net: 2.90 } },
        { year: 2022, eps: 9.33, margins: { operating: 2.90, gross: 6.40, net: 3.10 } },
        { year: 2021, eps: 8.01, margins: { operating: 2.70, gross: 6.10, net: 2.80 } }
      ]
    },
    {
      id: '2454',
      name: '聯發科',
      industry: '半導體業',
      financials: [
        { year: 2023, eps: 48.43, margins: { operating: 24.50, gross: 48.90, net: 25.30 } },
        { year: 2022, eps: 69.25, margins: { operating: 29.80, gross: 52.40, net: 29.60 } },
        { year: 2021, eps: 64.36, margins: { operating: 28.90, gross: 51.20, net: 28.40 } }
      ]
    }
  ]

  // 轉換為完整的股票數據格式
  const mockStocks: Stock[] = stocksBase.map(base => ({
    companyCode: base.id,
    companyName: base.name,
    code: base.id,
    name: base.name,
    industry: base.industry,
    market: 'TSE',
    yearlyFinancials: base.financials.map(f => ({
      year: f.year,
      eps: f.eps,
      operatingMargin: f.margins.operating,
      grossMargin: f.margins.gross,
      netProfitMargin: f.margins.net
    }))
  }))

  const useMockData = useRuntimeConfig().public.useMockData === 'true'

  // 如果使用模擬數據，同步到 stockStore
  if (useMockData) {
    stockStore.stocks = mockStocks
    stockStore.allStocks = [...mockStocks]
  }

  return {
    mockStocks,
    useMockData
  }
} 