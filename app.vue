<template>
  <div class="min-h-screen bg-base-100">
    <Navbar />
    <div class="container mx-auto px-4 py-8 pt-20">
      
      <!-- 移除最大寬度限制，改用較大的寬度 -->
      <div class="max-w-[1600px] mx-auto">
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
    
    // 註解掉自動加載數據的代碼，改為只取得授權
    // const defaultParams = {
    //   epsYears: 3,
    //   operatingMarginYears: 3,
    //   grossMarginYears: 3,
    //   netProfitMarginYears: 3,
    //   minOperatingMargin: 10,
    //   minOperatingMarginYears: 3
    // };
    // fetchStocks(defaultParams);
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
    const result = await generateAnalysis(selectedStock.value.code);
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
    modalTitle.value = `${selectedStock.value.name} (${selectedStock.value.code}) 公司資訊`;
    modalContent.value = '';
    analysisMode.value = 'info';
    aiModal.value?.show();
    const result = await generateCompanyInfo(selectedStock.value.code);
    modalContent.value = result;
  } catch (err) {
    console.error('生成公司資訊失敗:', err);
  } finally {
    analysisMode.value = null;
  }
};
</script>

<style>
/* 調整容器在不同螢幕尺寸的內邊距 */
.container {
  @apply px-4 lg:px-8 mt-16; /* 添加上邊距為導航欄留出空間 */
}

/* 確保內容在超大螢幕上也有合適的邊距 */
@media (min-width: 1600px) {
  .container {
    max-width: 1600px;
    @apply px-12;
  }
}
</style>
