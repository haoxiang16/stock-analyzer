import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Stock, StockAnalysisParams } from '@/types/stock'
import { createAuthenticatedAxiosInstance } from '@/services/auth'

// 定義 API 返回的數據類型
interface APIStockResponse {
  companyCode: string;
  companyName: string;
  industry?: string;
  market?: string;
  yearlyFinancials?: {
    year: number;
    eps: number;
    operatingMargin: number;
    grossMargin: number;
    netProfitMargin: number;
  }[];
}

export const useStockStore = defineStore('stock', {
  state: () => ({
    stocks: [] as Stock[],
    allStocks: [] as Stock[] // 用於保存所有原始股票資料
  }),
  
  actions: {
    async fetchStocks(params?: StockAnalysisParams): Promise<Stock[]> {
      try {
        // 使用認證服務來獲取帶有 token 的 axios 實例
        const axiosInstance = await createAuthenticatedAxiosInstance();

        // 重試函數
        const retryRequest = async <T>(
          fn: () => Promise<AxiosResponse<T>>,
          retries = 3,
          delay = 1000
        ): Promise<AxiosResponse<T>> => {
          try {
            return await fn()
          } catch (err) {
            if (retries === 0) throw err
            await new Promise(resolve => setTimeout(resolve, delay))
            return retryRequest(fn, retries - 1, delay * 2)
          }
        }

        // 發送 API 請求
        const response = await retryRequest<APIStockResponse[]>(
          () => axiosInstance.post<APIStockResponse[]>('/api/StockAnalysis/growing-financials', params),
          3,
          1000
        )

        if (response.data) {
          const responseData = Array.isArray(response.data) ? response.data : [response.data]
          
          // 處理 API 回傳的資料，確保符合我們的類型定義
          const formattedStocks: Stock[] = responseData.map(stock => ({
            code: stock.companyCode || '',
            name: stock.companyName || '',
            industry: stock.industry || '未分類',
            market: stock.market || 'TSE',
            yearlyFinancials: stock.yearlyFinancials || [],
            companyCode: stock.companyCode,
            companyName: stock.companyName
          }))
          
          this.stocks = formattedStocks
          this.allStocks = [...formattedStocks]
          return this.stocks
        } else {
          throw new Error('沒有找到符合條件的股票')
        }
      } catch (error) {
        console.error('獲取股票資料失敗:', error)
        
        // 處理常見的錯誤類型
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            throw new Error('請求超時，請檢查後端服務是否正常運行')
          } else if (error.response) {
            throw new Error(`服務器錯誤 (${error.response.status}): ${error.response.data?.message || error.message}`)
          } else if (error.request) {
            throw new Error('無法連接到服務器，請確認後端服務是否啟動')
          } else {
            throw new Error(`請求錯誤: ${error.message}`)
          }
        }
        
        throw error instanceof Error ? error : new Error('未知錯誤')
      }
    }
  }
}) 