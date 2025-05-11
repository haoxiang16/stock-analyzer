<template>
  <div class="card bg-slate-900 shadow-lg border border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
    <div class="card-body p-4 sm:p-6">
      <div class="flex items-center mb-6 pb-4 border-b border-slate-700">
        <div class="w-1.5 h-6 bg-emerald-400 rounded-full mr-3"></div>
        <h2 class="card-title text-xl sm:text-2xl text-white font-bold">股票篩選結果</h2>
        <div class="ml-auto flex items-center">
          <div class="bg-slate-800 text-xs text-slate-300 px-2 py-1 rounded font-medium border border-slate-700">
            專業分析
          </div>
        </div>
      </div>
      
      <div class="bg-slate-800 rounded-xl shadow-md border border-slate-700 mb-6 overflow-hidden">
        <div class="px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white flex items-center border-b border-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-5 h-5 mr-2 text-emerald-400"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="font-bold text-base">財務指標說明</span>
        </div>
        <div class="p-4 sm:p-5 text-slate-300">
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li class="flex items-start">
              <div class="bg-emerald-900/40 rounded-full p-1 mr-3 mt-0.5 border border-emerald-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span class="font-bold text-emerald-400">EPS</span>
                <span class="text-slate-400 text-sm">：每股盈餘 (每股賺了多少錢)</span>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-amber-900/40 rounded-full p-1 mr-3 mt-0.5 border border-amber-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <span class="font-bold text-amber-400">營業利益率</span>
                <span class="text-slate-400 text-sm">：營業利益/營業收入 (核心業務獲利能力)</span>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5 border border-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <div>
                <span class="font-bold text-blue-400">毛利率</span>
                <span class="text-slate-400 text-sm">：毛利/營業收入 (產品售價與成本差距)</span>
              </div>
            </li>
            <li class="flex items-start">
              <div class="bg-purple-900/40 rounded-full p-1 mr-3 mt-0.5 border border-purple-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <span class="font-bold text-purple-400">淨利率</span>
                <span class="text-slate-400 text-sm">：稅後淨利/營業收入 (最終獲利能力)</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
        <p class="mt-4 text-slate-400">載入中...</p>
      </div>
      
      <div v-else-if="stocks.length === 0" class="text-center py-8 sm:py-12 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-lg sm:text-xl font-medium mb-2 text-slate-300">尚未顯示股票資料</p>
        <p class="text-base sm:text-lg text-slate-400">請使用上方的篩選條件開始搜尋股票</p>
      </div>
      
      <div v-else>
        <!-- 桌面版表格 - 只在sm以上顯示 -->
        <div class="hidden sm:block relative overflow-x-auto">
          <table class="table w-full min-w-[800px] lg:min-w-0 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr class="bg-gradient-to-r from-slate-800 to-slate-700 text-white border-b border-slate-600">
                <th class="w-[10%] py-4 font-bold text-lg rounded-tl-lg">股票代號</th>
                <th class="w-[15%] font-bold text-lg">公司名稱</th>          
                <th class="text-center font-bold text-lg">財務數據</th>
                <th class="w-[15%] font-bold text-center text-lg rounded-tr-lg">AI分析</th>
              </tr>
            </thead>
            <tbody class="text-base divide-y divide-slate-700">
              <tr v-for="stock in stocks" :key="stock.companyCode" 
                  class="hover:bg-slate-800/70 transition-colors duration-150 bg-slate-900">
                <td class="py-6 text-emerald-400 text-xl font-bold border-b border-slate-700 px-4">
                  {{ stock.companyCode }}
                </td>
                <td class="font-medium text-slate-300 text-lg border-b border-slate-700 py-4 px-4">
                  {{ stock.companyName }}
                </td>
                <td class="border-b border-slate-700 py-4 px-4">
                  <div class="overflow-x-auto max-w-full">
                    <table class="w-full shadow-sm rounded-lg overflow-hidden">
                      <thead>
                        <tr class="bg-slate-800 border-b border-slate-700">
                          <th class="px-4 py-3.5 text-center font-bold text-sm text-slate-300">年度</th>
                          <th class="px-4 py-3.5 text-center font-bold text-sm text-emerald-400">EPS</th>
                          <th class="px-4 py-3.5 text-center font-bold text-sm text-amber-400">營業利益率</th>
                          <th class="px-4 py-3.5 text-center font-bold text-sm text-blue-400">毛利率</th>
                          <th class="px-4 py-3.5 text-center font-bold text-sm text-purple-400">淨利率</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-700">
                        <tr v-for="(financial, index) in stock.yearlyFinancials" :key="financial.year" 
                            :class="`text-sm ${index % 2 === 0 ? 'bg-slate-800/80' : 'bg-slate-800/40'} hover:bg-slate-700/70 transition-colors`">
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold text-slate-300">
                            {{ financial.year }} 年
                          </td>
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold text-emerald-300">
                            {{ financial.eps?.toFixed(2) || 'N/A' }}
                          </td>
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold">
                            <span class="text-amber-300">
                              {{ financial.operatingMargin?.toFixed(2) || 'N/A' }}%
                            </span>
                          </td>
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold">
                            <span class="text-blue-300">
                              {{ financial.grossMargin?.toFixed(2) || 'N/A' }}%
                            </span>
                          </td>
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold">
                            <span class="text-purple-300">
                              {{ financial.netProfitMargin?.toFixed(2) || 'N/A' }}%
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td class="border-b border-slate-700 py-4 px-4">
                  <div class="flex flex-col items-center gap-3 px-4">
                    <button
                      @click="$emit('analyze', stock)"
                      class="btn w-48 text-base font-medium h-auto bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 shadow-md hover:shadow-lg transition-all duration-300 py-3 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      財報分析
                    </button>
                    <button
                      @click="$emit('info', stock)"
                      class="btn w-48 text-base font-medium h-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 shadow-md hover:shadow-lg transition-all duration-300 py-3 rounded-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      企業概況
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 手機版卡片列表 - 只在sm以下顯示 -->
        <div class="sm:hidden space-y-4">
          <div v-for="stock in stocks" :key="stock.companyCode" class="bg-slate-800/50 rounded-lg border border-slate-700 shadow-md overflow-hidden">
            <!-- 股票標頭區域 -->
            <div class="flex items-center justify-between bg-slate-800 px-4 py-3 border-b border-slate-700">
              <div class="flex items-center space-x-2">
                <span class="text-lg font-bold text-emerald-400">{{ stock.companyCode }}</span>
                <span class="text-slate-300">{{ stock.companyName }}</span>
              </div>
              <div class="bg-slate-900/60 px-2 py-1 rounded text-xs text-emerald-300 border border-slate-700">
                股票
              </div>
            </div>
            
            <!-- 財務數據區域 -->
            <div class="px-4 py-3">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-slate-400">財務數據摘要</span>
                <span class="text-xs bg-slate-800 px-2 py-0.5 rounded text-emerald-300">近 {{ Math.min(3, stock.yearlyFinancials?.length ?? 0) }} 年</span>
              </div>
              
              <!-- 財務數據表格容器，啟用橫向滾動 -->
              <div class="overflow-x-auto -mx-4 px-4 pb-1">
                <div class="min-w-[400px]">
                  <table class="w-full text-xs rounded-lg overflow-hidden border border-slate-700">
                    <thead>
                      <tr class="bg-slate-800 border-b border-slate-700">
                        <th class="sticky left-0 z-10 bg-slate-800 py-2 px-2 text-center font-medium text-slate-300">年度</th>
                        <th class="py-2 px-2 text-center font-medium text-emerald-400">EPS</th>
                        <th class="py-2 px-2 text-center font-medium text-amber-400">營益率</th>
                        <th class="py-2 px-2 text-center font-medium text-blue-400">毛利率</th>
                        <th class="py-2 px-2 text-center font-medium text-purple-400">淨利率</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(financial, index) in stock.yearlyFinancials?.slice(0, 3) ?? []" :key="financial.year"
                          :class="`${index % 2 === 0 ? 'bg-slate-800/60' : 'bg-slate-800/30'}`">
                        <td class="sticky left-0 z-10 py-1.5 px-2 text-center font-medium text-slate-300" :class="index % 2 === 0 ? 'bg-slate-800/60' : 'bg-slate-800/30'">{{ financial.year }}</td>
                        <td class="py-1.5 px-2 text-center font-medium text-emerald-300">{{ financial.eps?.toFixed(2) || 'N/A' }}</td>
                        <td class="py-1.5 px-2 text-center font-medium text-amber-300">{{ financial.operatingMargin?.toFixed(2) || 'N/A' }}%</td>
                        <td class="py-1.5 px-2 text-center font-medium text-blue-300">{{ financial.grossMargin?.toFixed(2) || 'N/A' }}%</td>
                        <td class="py-1.5 px-2 text-center font-medium text-purple-300">{{ financial.netProfitMargin?.toFixed(2) || 'N/A' }}%</td>
                      </tr>
                      <tr v-if="(stock.yearlyFinancials?.length ?? 0) > 3" class="bg-slate-800/20 border-t border-slate-700">
                        <td colspan="5" class="text-center py-1 text-xs">
                          <button class="text-emerald-400 text-xs">查看更多...</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- 手機版橫向滾動提示 -->
              <div class="flex items-center justify-center mt-2 text-xs text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span>左右滑動查看更多指標</span>
              </div>
            </div>
            
            <!-- 操作按鈕區域 -->
            <div class="flex flex-col p-3 bg-slate-800/30 border-t border-slate-700">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-slate-400">AI分析</span>
              </div>
              <div class="flex items-center justify-between">
                <button
                  @click="$emit('analyze', stock)"
                  class="flex-1 flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium py-2 rounded-l border border-slate-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  財報分析
                </button>
                <button
                  @click="$emit('info', stock)"
                  class="flex-1 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium py-2 rounded-r border border-slate-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  企業概況
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 分頁控制器 -->
        <div class="flex flex-col sm:flex-row justify-between items-center px-2 mt-4 sm:mt-6 gap-4 sm:gap-0">
          <div class="text-xs sm:text-sm text-slate-400 font-medium text-center sm:text-left w-full sm:w-auto">
            顯示第 {{ currentPage }} 到 {{ Math.min(endIndex, stocks.length) }} 筆，共 {{ stocks.length }} 筆資料
            <select 
              v-model="localPageSize" 
              @change="(e) => handlePageSizeChange(Number((e.target as HTMLSelectElement).value))"
              class="ml-2 bg-slate-700 text-white rounded border-slate-600 px-2 py-1"
            >
              <option value="10">10筆/頁</option>
              <option value="20">20筆/頁</option>
              <option value="50">50筆/頁</option>
            </select>
          </div>
          <div class="join rounded-lg shadow-sm overflow-hidden w-full sm:w-auto flex justify-center">
            <button 
              class="join-item btn btn-sm h-8 sm:h-10 min-w-[2.5rem] sm:min-w-[3rem] bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              @click="handlePageChange(1)"
              :disabled="currentPage === 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              class="join-item btn btn-sm h-8 sm:h-10 min-w-[2.5rem] sm:min-w-[3rem] bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              @click="handlePageChange(currentPage - 1)"
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
              @click="handlePageChange(currentPage + 1)"
              :disabled="currentPage === totalPages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button 
              class="join-item btn btn-sm h-8 sm:h-10 min-w-[2.5rem] sm:min-w-[3rem] bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              @click="handlePageChange(totalPages)"
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
import type { Stock } from '@/types/stock';

const props = defineProps<{
  stocks: Stock[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}>();

const emit = defineEmits<{
  (e: 'analyze' | 'info', stock: Stock): void;
  (e: 'page-change' | 'page-size-change', value: number): void;
}>();

// 分頁相關
const localPageSize = ref(props.pageSize);

const endIndex = computed(() => {
  return props.currentPage * props.pageSize;
});

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page);
  }
};

const handlePageSizeChange = (size: number) => {
  localPageSize.value = size;
  emit('page-size-change', size);
};

// 監聽 pageSize prop 的變化
watch(() => props.pageSize, (newSize) => {
  localPageSize.value = newSize;
});

// 監聽 stocks 變化，重置頁碼
watch(() => props.stocks, () => {
  localPageSize.value = props.pageSize;
});
</script>

<style scoped>
@media (max-width: 640px) {
  table.table thead {
    @apply hidden;
  }
  
  table.table tbody tr td[data-label]::before {
    content: attr(data-label);
    @apply text-xs font-medium text-slate-400 mb-1 block sm:hidden;
  }
  
  table.table tbody tr td {
    @apply text-left;
  }
  
  table.table tbody tr {
    @apply border-b border-slate-700 pb-3 mb-3;
  }
  
  /* 調整財務數據表格在手機版的展示 */
  td[data-label="財務數據"] table {
    @apply text-xs shadow-none rounded-md overflow-hidden border border-slate-700;
  }
  
  td[data-label="財務數據"] {
    @apply pb-0;
  }
  
  td[data-label="財務數據"] th,
  td[data-label="財務數據"] td {
    @apply px-1.5 py-1;
  }
}
</style> 