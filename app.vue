<template>
  <div class="min-h-screen bg-slate-950 text-slate-200">
    <Navbar />
    <div class="container mx-auto px-4 py-6 pt-16">
      
      <!-- 移除最大寬度限制，改用較大的寬度 -->
      <div class="max-w-[1600px] mx-auto">
        <div class="flex items-center mb-6 pb-4 border-b border-slate-800">
          <div class="flex-1">
            <h1 class="text-2xl md:text-3xl font-bold text-white">
              <span class="text-emerald-400">財務</span>數據分析系統
            </h1>
            <p class="mt-2 text-slate-400 text-sm md:text-base">專業投資人的財務分析工具，助您發掘高品質成長股</p>
          </div>
     
        </div>

        <StockFilter
          :loading="stockLoading"
          @filter="handleFilter"
        />
        <StockList
          :stocks="filteredStocks"
          :loading="stockLoading"
          @analyze="handleAnalyzeFromList"
          @info="handleInfoFromList"
        />
      </div>
    </div>

    <!-- AI Modal -->
    <AIModal
      ref="aiModal"
      :title="modalTitle"
      :content="modalContent"
      :loading="aiLoading"
      modalId="ai_analysis_modal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StockFilter from '@/components/StockFilter.vue';
import StockList from '@/components/StockList.vue';
import AIModal from '~/components/gloabl/Modal.vue';
import Navbar from '~/components/gloabl/Navbar.vue';
import { useStock } from '@/composables/useStock';
import { useAI } from '@/composables/useAI';
import type { Stock, StockAnalysisParams } from '@/types/stock';
import { getToken } from '@/services/auth';

const { 
  loading: stockLoading,
  filteredStocks,
  fetchStocks,
} = useStock();

const {
  loading: aiLoading,
  generateAnalysis,
  generateCompanyInfo
} = useAI();

const selectedStock = ref<Stock | null>(null);
const aiModal = ref<InstanceType<typeof AIModal> | null>(null);
const modalTitle = ref('');
const modalContent = ref('');
const analysisMode = ref<'analysis' | 'info' | null>(null);

// 初始化時檢查登入狀態
onMounted(async () => {
  try {
    // 確保有有效的 token
    await getToken();
  } catch (err) {
    console.error('初始化授權失敗:', err);
  }
});

const handleFilter = (params: StockAnalysisParams) => {
  fetchStocks(params);
};

// 從列表直接分析報告
const handleAnalyzeFromList = (stock: Stock) => {
  selectedStock.value = stock;
  handleAnalyze();
};

// 從列表直接查看公司介紹
const handleInfoFromList = (stock: Stock) => {
  selectedStock.value = stock;
  handleInfo();
};

const handleAnalyze = async () => {
  if (!selectedStock.value) return;
  
  try {
    modalTitle.value = `${selectedStock.value.name} (${selectedStock.value.code}) 分析報告`;
    modalContent.value = '';
    analysisMode.value = 'analysis';
    aiModal.value?.show();
    const result = await generateAnalysis(selectedStock.value.companyCode);
    modalContent.value = result;
  } catch (err) {
    console.error('生成分析報告失敗:', err);
  } finally {
    analysisMode.value = null;
  }
};

const handleInfo = async () => {
  if (!selectedStock.value) return;
  
  try {
    modalTitle.value = `${selectedStock.value.companyName} (${selectedStock.value.companyCode}) 公司資訊`;
    modalContent.value = '';
    analysisMode.value = 'info';
    aiModal.value?.show();
    const result = await generateCompanyInfo(selectedStock.value.companyCode);
    modalContent.value = result;
  } catch (err) {
    console.error('生成公司資訊失敗:', err);
  } finally {
    analysisMode.value = null;
  }
};
</script>

<style>
/* 全域樣式設定 */
body {
  @apply bg-slate-950;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.container {
  @apply px-4 lg:px-8 mt-12; /* 修改上邊距從16減少到12，配合新的導航欄高度 */
}

@media (min-width: 1600px) {
  .container {
    max-width: 1600px;
    @apply px-12;
  }
}

::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-slate-900;
}

::-webkit-scrollbar-thumb {
  @apply bg-slate-700 rounded-full hover:bg-slate-600 transition-colors;
}
</style>
