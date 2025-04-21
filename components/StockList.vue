<template>
  <div class="card bg-white shadow-lg border border-slate-200">
    <div class="card-body p-8">
      <h2 class="card-title text-2xl mb-6 text-slate-800 font-bold">股票篩選結果</h2>
      
      <div class="alert bg-sky-50 border border-sky-100 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-sky-600 shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <p class="font-bold text-base mb-2 text-sky-900">財務指標說明：</p>
          <ul class="list-disc list-inside space-y-1 text-base text-sky-800">
            <li><b>EPS</b>：每股盈餘 (每股賺了多少錢)</li>
            <li><b>營業利益率</b>：營業利益/營業收入 (核心業務獲利能力)</li>
            <li><b>毛利率</b>：毛利/營業收入 (產品售價與成本差距)</li>
            <li><b>淨利率</b>：稅後淨利/營業收入 (最終獲利能力)</li>
          </ul>
        </div>
      </div>
      
      <div v-if="loading" class="flex justify-center py-8">
        <span class="loading loading-spinner loading-lg text-sky-600"></span>
      </div>
      
      <div v-else-if="stocks.length === 0" class="text-center py-12 text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-xl font-medium mb-2">尚未顯示股票資料</p>
        <p class="text-lg">請使用上方的篩選條件開始搜尋股票</p>
      </div>
      
      <div v-else>
        <div class="mb-4">
          <table class="table w-full">
            <thead>
              <tr class="bg-slate-500 text-white">
                <th class="w-[10%] py-6 font-bold text-lg rounded-tl-lg">股票代號</th>
                <th class="w-[15%] font-bold text-lg">公司名稱</th>          
                <th class="text-center font-bold text-lg">財務數據</th>
                <th class="w-[15%] font-bold text-center text-lg rounded-tr-lg">操作</th>
              </tr>
            </thead>
            <tbody class="text-base">
              <tr v-for="stock in paginatedStocks" :key="stock.code" class="hover:bg-slate-50 border-b border-slate-200">
                <td class="font-bold py-6 text-indigo-600 text-xl">{{ stock.code }}</td>
                <td class="font-medium text-slate-800 text-lg">{{ stock.name }}</td>        
                <td>
                  <div class="overflow-x-auto">
                    <table class="w-full">
                      <thead>
                        <tr class="text-base bg-slate-100 border-b border-slate-200">
                          <th class="px-4 py-3.5 text-center font-bold text-slate-700">年度</th>
                          <th class="px-4 py-3.5 text-center font-bold text-slate-700">EPS</th>
                          <th class="px-4 py-3.5 text-center font-bold text-slate-700">營業利益率</th>
                          <th class="px-4 py-3.5 text-center font-bold text-slate-700">毛利率</th>
                          <th class="px-4 py-3.5 text-center font-bold text-slate-700">淨利率</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(financial, index) in stock.yearlyFinancials" :key="financial.year" 
                            :class="`text-base border-b ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`">
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold text-slate-800">
                            {{ financial.year }} 年
                          </td>
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold text-black">
                            {{ financial.eps?.toFixed(2) || 'N/A' }}
                          </td>
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold">
                            <span :class="'text-black' ">
                              {{ financial.operatingMargin?.toFixed(2) || 'N/A' }}%
                            </span>
                          </td>
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold">
                            <span :class="'text-black'">
                              {{ financial.grossMargin?.toFixed(2) || 'N/A' }}%
                            </span>
                          </td>
                          <td class="px-4 py-3.5 text-center whitespace-nowrap font-semibold">
                            <span :class="'text-black'">
                              {{ financial.netProfitMargin?.toFixed(2) || 'N/A' }}%
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td class="py-4">
                  <div class="flex flex-col items-center gap-3 px-4">
                    <button
                      @click="$emit('analyze', stock)"
                      class="btn w-48 text-base font-medium h-auto bg-slate-700 hover:bg-slate-800 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      分析報告
                    </button>
                    <button
                      @click="$emit('info', stock)"
                      class="btn w-48 text-base font-medium h-auto bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div class="flex justify-between items-center px-2 mt-4">
          <div class="text-sm text-slate-600 font-medium">
            顯示第 {{ startIndex + 1 }} 到 {{ Math.min(endIndex, stocks.length) }} 筆，共 {{ stocks.length }} 筆資料
          </div>
          <div class="join rounded-lg shadow-sm overflow-hidden">
            <button 
              class="join-item btn btn-sm bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              @click="currentPage = 1"
              :disabled="currentPage === 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              class="join-item btn btn-sm bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              @click="currentPage--"
              :disabled="currentPage === 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button class="join-item btn btn-sm bg-gray-600 text-white font-medium border-0 min-w-[5rem]">{{ currentPage }} / {{ totalPages }}</button>
            <button 
              class="join-item btn btn-sm bg-gray-500 hover:bg-gray-600 text-white border-0" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              @click="currentPage++"
              :disabled="currentPage === totalPages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button 
              class="join-item btn btn-sm bg-gray-500 hover:bg-gray-600 text-white border-0" 
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
import type { Stock } from '@/types/stock';

const props = defineProps<{
  stocks: Stock[];
  loading: boolean;
}>();

defineEmits<{
  (e: 'analyze' | 'info', stock: Stock): void;
}>();

// 分頁相關
const currentPage = ref(1);
const pageSize = 10; // 每頁顯示數量

const totalPages = computed(() => Math.ceil(props.stocks.length / pageSize));
const startIndex = computed(() => (currentPage.value - 1) * pageSize);
const endIndex = computed(() => startIndex.value + pageSize);

const paginatedStocks = computed(() => {
  return props.stocks.slice(startIndex.value, endIndex.value);
});

// 監聽 stocks 變化，重置頁碼
watch(() => props.stocks, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* 調整表格容器 */
.card-body {
  @apply p-8;
}

/* 確保表格在小螢幕上可以水平滾動 */
.overflow-x-auto {
  @apply -mx-4 sm:-mx-6;
}

.table td, .table th {
  @apply px-4 py-4;
}

/* 增加表格行高和按鈕容器間距 */
.table tr {
  @apply h-20;
}

/* 調整按鈕大小和互動效果 */
.btn-md {
  @apply min-h-[2.5rem];
}

.btn:hover {
  @apply transform transition-all duration-200;
}

/* 內部表格樣式 */
.table tbody tr td table {
  @apply bg-white rounded-lg shadow-sm;
}

.table tbody tr td table tr {
  @apply h-auto transition-colors duration-150;
}

.table tbody tr td table tr:hover {
  @apply bg-sky-50;
}

.table tbody tr td table td,
.table tbody tr td table th {
  @apply border-0 py-3;
}

/* 分頁按鈕樣式 */
.join .btn-disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* 增加表格間距和陰影效果 */
.table {
  @apply shadow-md;
}

.table tbody tr {
  @apply transition-colors duration-150;
}

.table tbody tr:hover {
  @apply bg-gray-100;
}

/* 調整表格樣式 */
.card {
  @apply overflow-hidden;
}

.table {
  @apply shadow-lg rounded-lg overflow-hidden;
}

.table tbody tr {
  @apply transition-colors duration-200;
}

.table tbody tr:hover {
  @apply bg-blue-50/80 shadow-md;
}

/* 內部表格樣式 */
.table tbody tr td table {
  @apply bg-white rounded-lg shadow-sm overflow-hidden;
}

.table tbody tr td table tr {
  @apply h-auto transition-colors duration-200;
}

.table tbody tr td table tr:hover {
  @apply bg-teal-50;
}
</style> 