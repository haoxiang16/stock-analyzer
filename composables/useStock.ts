import { ref, computed } from 'vue';
import { useStockStore } from '@/stores/stockStore';
import type { StockAnalysisParams } from '@/types/stock';

export function useStock() {
  const stockStore = useStockStore();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref('');

  const stocks = computed(() => stockStore.stocks);
  const totalCount = computed(() => stockStore.totalCount);
  const currentPage = computed(() => stockStore.currentPage);
  const pageSize = computed(() => stockStore.pageSize);
  const totalPages = computed(() => stockStore.totalPages);
  const hasNextPage = computed(() => stockStore.hasNextPage);
  const hasPreviousPage = computed(() => stockStore.hasPreviousPage);

  const filteredStocks = computed(() => stocks.value);

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

  const setPage = (page: number) => {
    stockStore.setPage(page);
    const currentParams = stockStore.getCurrentParams();
    fetchStocks({
      ...currentParams,
      pageNumber: page,
      pageSize: pageSize.value
    });
  };

  const setPageSize = (size: number) => {
    stockStore.setPageSize(size);
    const currentParams = stockStore.getCurrentParams();
    fetchStocks({
      ...currentParams,
      pageNumber: 1,
      pageSize: size
    });
  };

  return {
    loading,
    error,
    stocks,
    filteredStocks,
    searchQuery,
    totalCount,
    currentPage,
    pageSize,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    fetchStocks,
    setSearchQuery,
    setPage,
    setPageSize
  };
} 