import { defineStore } from 'pinia'
import axios from 'axios'
import type { Stock, StockAnalysisParams, PaginatedResponse } from '@/types/stock'
import { createAuthenticatedAxiosInstance } from '@/services/auth'

export const useStockStore = defineStore('stock', {
  state: () => ({
    stocks: [] as Stock[],
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    loading: false,
    error: null as string | null,
    currentParams: {} as StockAnalysisParams
  }),
  
  actions: {
    async fetchStocks(params?: StockAnalysisParams): Promise<Stock[]> {
      this.loading = true;
      this.error = null;
      
      try {
        const axiosInstance = await createAuthenticatedAxiosInstance();
        
        // 保存當前的篩選條件
        if (params) {
          this.currentParams = { ...params };
        }
        
        // 合併分頁參數
        const queryParams = {
          ...this.currentParams,
          pageNumber: params?.pageNumber || this.currentPage,
          pageSize: params?.pageSize || this.pageSize
        };

        const response = await axiosInstance.get<PaginatedResponse<Stock>>(
          '/api/StockAnalysis/growing-financials',
          { params: queryParams }
        );

        if (response.data) {
          this.stocks = response.data.items;
          this.totalCount = response.data.totalCount;
          this.currentPage = response.data.pageNumber;
          this.pageSize = response.data.pageSize;
          this.totalPages = response.data.totalPages;
          this.hasNextPage = response.data.hasNextPage;
          this.hasPreviousPage = response.data.hasPreviousPage;
          
          return this.stocks;
        } else {
          throw new Error('沒有找到符合條件的股票');
        }
      } catch (error) {
        console.error('獲取股票資料失敗:', error);
        
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            this.error = '請求超時，請檢查後端服務是否正常運行';
          } else if (error.response) {
            this.error = `服務器錯誤 (${error.response.status}): ${error.response.data?.message || error.message}`;
          } else if (error.request) {
            this.error = '無法連接到服務器，請確認後端服務是否啟動';
          } else {
            this.error = `請求錯誤: ${error.message}`;
          }
        } else {
          this.error = error instanceof Error ? error.message : '未知錯誤';
        }
        
        throw error;
      } finally {
        this.loading = false;
      }
    },

    getCurrentParams(): StockAnalysisParams {
      return { ...this.currentParams };
    },

    setPage(page: number) {
      this.currentPage = page;
    },

    setPageSize(size: number) {
      this.pageSize = size;
      this.currentPage = 1; // 重置到第一頁
    }
  }
}) 