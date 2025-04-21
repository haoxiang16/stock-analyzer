import { ref, computed } from 'vue';
import { useStockStore } from '@/stores/stockStore';
import type { StockAnalysisParams } from '@/types/stock';

export function useStock() {
  const stockStore = useStockStore();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref('');

  const stocks = computed(() => stockStore.stocks);
  const filteredStocks = computed(() => {
    if (!searchQuery.value) return stocks.value;
    const query = searchQuery.value.toLowerCase();
    return stocks.value.filter(stock => 
      stock.code.toLowerCase().includes(query) ||
      stock.name.toLowerCase().includes(query)
    );
  });

  const fetchStocks = async (params?: StockAnalysisParams) => {
    loading.value = true;
    error.value = null;
    try {
      await stockStore.fetchStocks(params);
    } catch (err) {
      error.value = '獲取股票列表時發生錯誤';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  return {
    loading,
    error,
    stocks,
    filteredStocks,
    searchQuery,
    fetchStocks,
    setSearchQuery
  };
} 