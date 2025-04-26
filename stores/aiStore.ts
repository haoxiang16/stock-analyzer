import { defineStore } from 'pinia'
import { useStockStore } from './stockStore'
import { generateStockAnalysis, generateCompanyInfo } from '@/services/gemini'
import type { StockAnalysis, CompanyInfo } from '@/types/stock'

export const useAIStore = defineStore('ai', {
  state: () => ({
    analyses: [] as StockAnalysis[],
    companyInfos: [] as CompanyInfo[],
    useBackendAI: false 
  }),
  
  actions: {
    async generateAnalysis(stockCode: string): Promise<string> {
      try {
        // 從 stockStore 獲取股票資訊
        const stockStore = useStockStore()
        const stock = stockStore.stocks.find(s => s.companyCode === stockCode)
        
        if (!stock) {
          throw new Error('找不到該股票')
        }

        const analysis = await generateStockAnalysis(stock);
  
        const newAnalysis: StockAnalysis = {
          code: stock.companyCode,
          name: stock.companyName,
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
        const stock = stockStore.stocks.find(s => s.companyCode === stockCode)
        
        if (!stock) {
          throw new Error('找不到該股票')
        }

        const info = await generateCompanyInfo(stock);

        const newInfo: CompanyInfo = {
          code: stock.companyCode,
          name: stock.companyName,
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