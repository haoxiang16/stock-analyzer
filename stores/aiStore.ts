import { defineStore } from 'pinia'
import { useStockStore } from './stockStore'
import { generateStockAnalysis, generateCompanyInfo } from '@/services/gemini'
import type { StockAnalysis, CompanyInfo } from '@/types/stock'

export const useAIStore = defineStore('ai', {
  state: () => ({
    analyses: [] as StockAnalysis[],
    companyInfos: [] as CompanyInfo[],
    useBackendAI: false // 預設使用本地 Gemini API
  }),
  
  actions: {
    async generateAnalysis(stockCode: string): Promise<string> {
      try {
        // 從 stockStore 獲取股票資訊
        const stockStore = useStockStore()
        const stock = stockStore.stocks.find(s => s.code === stockCode)
        
        if (!stock) {
          throw new Error('找不到該股票')
        }

        // 始終使用本地 Gemini API 生成分析
        const analysis = await generateStockAnalysis(stock);
  
        const newAnalysis: StockAnalysis = {
          code: stockCode,
          name: stock.name,
          analysis,
          timestamp: new Date().toISOString()
        }
        
        this.analyses.push(newAnalysis)
        return analysis
      } catch (error) {
        console.error('生成分析報告失敗:', error)
        throw error instanceof Error ? error : new Error('未知錯誤')
      }
    },
    
    async generateCompanyInfo(stockCode: string): Promise<string> {
      try {
        // 從 stockStore 獲取股票資訊
        const stockStore = useStockStore()
        const stock = stockStore.stocks.find(s => s.code === stockCode)
        
        if (!stock) {
          throw new Error('找不到該股票')
        }

        // 始終使用本地 Gemini API 生成公司資訊
        const info = await generateCompanyInfo(stock);

        // 將公司資訊添加到 state 中
        const newInfo: CompanyInfo = {
          code: stockCode,
          name: stock.name,
          info,
          timestamp: new Date().toISOString()
        }
        
        this.companyInfos.push(newInfo)
        return info
      } catch (error) {
        console.error('生成公司資訊失敗:', error)
        throw error instanceof Error ? error : new Error('未知錯誤')
      }
    }
  }
}) 