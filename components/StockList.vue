<template>
  <div class="card bg-white shadow-lg border border-slate-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
    <div class="card-body p-4 sm:p-6 md:p-8">
      <h2 class="card-title text-xl sm:text-2xl mb-4 sm:mb-6 text-slate-800 font-bold">股票篩選結果</h2>
      
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-100 mb-6 overflow-hidden">
        <div class="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6 mr-2"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="font-bold text-lg">財務指標說明</span>
        </div>
        <div class="p-4 sm:p-5">
          <ul class="space-y-3">
            <li class="flex items-start">
              <div class="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span class="font-bold text-blue-700">EPS</span>
                <span class="text-gray-600">：每股盈餘 (每股賺了多少錢)</span>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <span class="font-bold text-indigo-700">營業利益率</span>
                <span class="text-gray-600">：營業利益/營業收入 (核心業務獲利能力)</span>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-purple-100 rounded-full p-1 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <div>
                <span class="font-bold text-purple-700">毛利率</span>
                <span class="text-gray-600">：毛利/營業收入 (產品售價與成本差距)</span>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <span class="font-bold text-sky-700">淨利率</span>
                <span class="text-gray-600">：稅後淨利/營業收入 (最終獲利能力)</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div v-if="loading" class="flex justify-center py-6 sm:py-8">
        <span class="loading loading-spinner w-8 h-8 sm:w-12 sm:h-12 text-sky-600"></span>
      </div>
      
      <div v-else-if="stockData.length === 0" class="text-center py-8 sm:py-12 text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-lg sm:text-xl font-medium mb-2">尚未顯示股票資料</p>
        <p class="text-base sm:text-lg">請使用上方的篩選條件開始搜尋股票</p>
      </div>
      
      <div v-else>
        <div class="relative overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-0 sm:mx-0">
          <table class="table w-full min-w-[800px] lg:min-w-0 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr class="bg-gradient-to-r from-slate-700 to-slate-600 text-white">
                <th class="w-[10%] py-4 sm:py-6 font-bold text-base sm:text-lg rounded-tl-lg">股票代號</th>
                <th class="w-[15%] font-bold text-base sm:text-lg">公司名稱</th>          
                <th class="text-center font-bold text-base sm:text-lg">財務數據</th>
                <th class="w-[15%] font-bold text-center text-base sm:text-lg rounded-tr-lg">操作</th>
              </tr>
            </thead>
            <tbody class="text-sm sm:text-base divide-y divide-slate-200">
              <tr v-for="stock in paginatedStocks" :key="stock.companyCode" 
                  class="hover:bg-slate-50 transition-colors duration-150
                         flex flex-col sm:table-row py-4 sm:py-0 even:bg-slate-50/30">
                <td data-label="股票代號" class="font-bold py-2 sm:py-6 text-indigo-600 text-base sm:text-xl
                                               flex flex-col sm:table-cell sm:border-b
                                               relative px-4">{{ stock.companyCode }}</td>
                <td data-label="公司名稱" class="font-medium text-slate-800 text-sm sm:text-lg
                                            flex flex-col sm:table-cell sm:border-b
                                            py-2 sm:py-4 relative px-4">{{ stock.companyName }}</td>        
                <td data-label="財務數據" class="flex flex-col sm:table-cell sm:border-b py-2 sm:py-4 relative px-4">
                  <div class="overflow-x-auto max-w-[calc(100vw-3rem)] sm:max-w-full">
                    <table class="w-full shadow-sm rounded-lg overflow-hidden">
                      <thead>
                        <tr class="bg-gradient-to-r from-slate-200 to-slate-100 border-b border-slate-200">
                          <th class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center font-bold text-xs sm:text-sm text-slate-700">年度</th>
                          <th class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center font-bold text-xs sm:text-sm text-slate-700">EPS</th>
                          <th class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center font-bold text-xs sm:text-sm text-slate-700">營業利益率</th>
                          <th class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center font-bold text-xs sm:text-sm text-slate-700">毛利率</th>
                          <th class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center font-bold text-xs sm:text-sm text-slate-700">淨利率</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-200">
                        <tr v-for="(financial, index) in stock.yearlyFinancials" :key="financial.year" 
                            :class="`text-xs sm:text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'} hover:bg-blue-50/50 transition-colors`">
                          <td class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center whitespace-nowrap font-semibold text-slate-800">
                            {{ financial.year }} 年
                          </td>
                          <td class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center whitespace-nowrap font-semibold text-black">
                            {{ financial.eps?.toFixed(2) || 'N/A' }}
                          </td>
                          <td class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center whitespace-nowrap font-semibold">
                            <span :class="'text-black' ">
                              {{ financial.operatingMargin?.toFixed(2) || 'N/A' }}%
                            </span>
                          </td>
                          <td class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center whitespace-nowrap font-semibold">
                            <span :class="'text-black'">
                              {{ financial.grossMargin?.toFixed(2) || 'N/A' }}%
                            </span>
                          </td>
                          <td class="px-3 py-2.5 sm:px-4 sm:py-3.5 text-center whitespace-nowrap font-semibold">
                            <span :class="'text-black'">
                              {{ financial.netProfitMargin?.toFixed(2) || 'N/A' }}%
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td data-label="操作" class="flex flex-col sm:table-cell sm:border-b py-2 sm:py-4 relative px-4">
                  <div class="flex flex-col items-center gap-3 px-2 sm:px-4">
                    <button
                      @click="handleAnalyze(stock)"
                      class="btn w-full sm:w-48 text-sm sm:text-base font-medium h-auto bg-slate-700 hover:bg-slate-800 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 py-2 sm:py-3 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      分析報告
                    </button>
                    <button
                      @click="handleInfo(stock)"
                      class="btn w-full sm:w-48 text-sm sm:text-base font-medium h-auto bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 py-2 sm:py-3 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      公司介紹
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分頁控制器 -->
        <div class="flex flex-col sm:flex-row justify-between items-center px-2 mt-4 sm:mt-6 gap-4 sm:gap-0">
          <div class="text-sm text-slate-600 font-medium text-center sm:text-left w-full sm:w-auto">
            顯示第 {{ startIndex + 1 }} 到 {{ Math.min(endIndex, stockData.length) }} 筆，共 {{ stockData.length }} 筆資料
          </div>
          <div class="join rounded-lg shadow-sm overflow-hidden w-full sm:w-auto flex justify-center">
            <button 
              class="join-item btn btn-sm h-8 sm:h-10 min-w-[2.5rem] sm:min-w-[3rem] bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              @click="currentPage = 1"
              :disabled="currentPage === 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              class="join-item btn btn-sm h-8 sm:h-10 min-w-[2.5rem] sm:min-w-[3rem] bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              @click="currentPage--"
              :disabled="currentPage === 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button class="join-item btn btn-sm h-8 sm:h-10 min-w-[5rem] bg-gray-600 text-white font-medium border-0">{{ currentPage }} / {{ totalPages }}</button>
            <button 
              class="join-item btn btn-sm h-8 sm:h-10 min-w-[2.5rem] sm:min-w-[3rem] bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              @click="currentPage++"
              :disabled="currentPage === totalPages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button 
              class="join-item btn btn-sm h-8 sm:h-10 min-w-[2.5rem] sm:min-w-[3rem] bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              @click="currentPage = totalPages"
              :disabled="currentPage === totalPages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Stock } from '~/types/stock';
import { useMockStocks } from '~/composables/useMockStocks';

const props = defineProps<{
  stocks: Stock[];
  loading: boolean;
}>();

const { mockStocks, useMockData } = useMockStocks();

const emit = defineEmits<{
  (e: 'analyze' | 'info', stock: Stock): void;
}>();

// 使用環境變數控制是否使用模擬資料
const stockData = computed(() => {
  const result = useMockData ? mockStocks : props.stocks;
  console.log('Final stocks to display:', result);
  return result;
});

// 處理按鈕點擊事件
const handleAnalyze = (stock: Stock) => {
  console.log('Analyzing stock:', stock);
  emit('analyze', stock);
};

const handleInfo = (stock: Stock) => {
  emit('info', stock);
};

// 分頁相關
const currentPage = ref(1);
const pageSize = 10; // 每頁顯示數量

const totalPages = computed(() => Math.ceil(stockData.value.length / pageSize));
const startIndex = computed(() => (currentPage.value - 1) * pageSize);
const endIndex = computed(() => startIndex.value + pageSize);

const paginatedStocks = computed(() => {
  return stockData.value.slice(startIndex.value, endIndex.value);
});

// 監聽 stocks 變化，重置頁碼
watch(() => stockData.value, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
@media (max-width: 640px) {
  table.table thead {
    @apply hidden;
  }
  
  table.table tbody tr td[data-label]::before {
    content: attr(data-label);
    @apply text-sm font-medium text-slate-600 mb-1 block sm:hidden;
  }
  
  table.table tbody tr td {
    @apply text-right sm:text-left;
  }
}
</style> 