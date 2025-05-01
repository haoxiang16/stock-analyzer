<template>
  <div class="card bg-slate-900 shadow-lg mb-6 border border-slate-700 rounded-xl">
    <div class="card-body p-6">
      <div class="flex items-center mb-6 pb-4 border-b border-slate-700">
        <div class="w-1.5 h-6 bg-emerald-400 rounded-full mr-3"></div>
        <h2 class="card-title text-xl text-white font-bold">財報條件篩選</h2>
        <div class="ml-auto hidden md:flex items-center gap-2">
          <div class="flex items-center">
            <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></div>
            <span class="text-sm text-slate-300">專業投資分析</span>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- EPS 成長年數 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-300 font-medium">EPS 連續成長年數</span>
          </label>
          <select 
            class="select w-full bg-slate-800 border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300/20 text-white" 
            v-model="filters.epsYears"
            :disabled="isLoading"
          >
            <option v-for="i in 10" :key="i" :value="i">{{ i }} 年</option>
          </select>
        </div>

        <!-- 營業利益率連續成長年數 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-300 font-medium">營業利益率連續成長年數</span>
          </label>
          <select 
            class="select w-full bg-slate-800 border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300/20 text-white" 
            v-model="filters.operatingMarginYears"
            :disabled="isLoading"
          >
            <option v-for="i in 10" :key="i" :value="i">{{ i }} 年</option>
          </select>
        </div>

        <!-- 毛利率年數 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-300 font-medium">毛利率連續成長年數</span>
          </label>
          <select 
            class="select w-full bg-slate-800 border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300/20 text-white" 
            v-model="filters.grossMarginYears"
            :disabled="isLoading"
          >
            <option v-for="i in 10" :key="i" :value="i">{{ i }} 年</option>
          </select>
        </div>

        <!-- 淨利率年數 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-300 font-medium">淨利率連續成長年數</span>
          </label>
          <select 
            class="select w-full bg-slate-800 border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300/20 text-white" 
            v-model="filters.netProfitMarginYears"
            :disabled="isLoading"
          >
            <option v-for="i in 10" :key="i" :value="i">{{ i }} 年</option>
          </select>
        </div>

        <!-- 最小營業利益率 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-300 font-medium">最小營業利益率 (%)</span>
          </label>
          <select 
            class="select w-full bg-slate-800 border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300/20 text-white" 
            v-model="filters.minOperatingMargin"
            :disabled="isLoading"
          >
            <option v-for="i in 20" :key="i" :value="i * 5">{{ i * 5 }}%</option>
          </select>
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <button 
          class="btn w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg" 
          @click="handleFilter"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
          <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {{ isLoading ? '篩選中...' : '開始篩選' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { StockAnalysisParams } from '@/types/stock';

const props = defineProps<{
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'filter', params: StockAnalysisParams): void;
}>();

// 使用 computed 屬性引用 props.loading 避免 linter 警告
const isLoading = computed(() => props.loading);

// 篩選條件
const filters = ref<StockAnalysisParams>({
  epsYears: 3,
  operatingMarginYears: 3,
  grossMarginYears: 3,
  netProfitMarginYears: 3,
  minOperatingMargin: 10,
});

// 處理篩選
const handleFilter = () => {
  emit('filter', { ...filters.value });
};
</script> 