<template>
  <div class="card bg-slate-50 shadow-md mb-6 border border-slate-200">
    <div class="card-body">
      <h2 class="card-title mb-4 text-slate-800 text-xl">財報條件篩選</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- EPS 成長年數 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">EPS 連續成長年數</span>
          </label>
          <select 
            class="select select-bordered w-full bg-white border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200" 
            v-model="filters.epsYears"
            :disabled="isLoading"
          >
            <option v-for="i in 10" :key="i" :value="i">{{ i }} 年</option>
          </select>
        </div>

        <!-- 營業利益率連續成長年數 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">營業利益率連續成長年數</span>
          </label>
          <select 
            class="select select-bordered w-full bg-white border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200" 
            v-model="filters.operatingMarginYears"
            :disabled="isLoading"
          >
            <option v-for="i in 10" :key="i" :value="i">{{ i }} 年</option>
          </select>
        </div>

        <!-- 毛利率年數 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">毛利率連續成長年數</span>
          </label>
          <select 
            class="select select-bordered w-full bg-white border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200" 
            v-model="filters.grossMarginYears"
            :disabled="isLoading"
          >
            <option v-for="i in 10" :key="i" :value="i">{{ i }} 年</option>
          </select>
        </div>

        <!-- 淨利率年數 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">淨利率連續成長年數</span>
          </label>
          <select 
            class="select select-bordered w-full bg-white border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200" 
            v-model="filters.netProfitMarginYears"
            :disabled="isLoading"
          >
            <option v-for="i in 10" :key="i" :value="i">{{ i }} 年</option>
          </select>
        </div>

        <!-- 最小營業利益率 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text text-slate-700 font-medium">最小營業利益率 (%)</span>
          </label>
          <select 
            class="select select-bordered w-full bg-white border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200" 
            v-model="filters.minOperatingMargin"
            :disabled="isLoading"
          >
            <option v-for="i in 20" :key="i" :value="i * 5">{{ i * 5 }}%</option>
          </select>
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <button 
          class="btn w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white border-0 shadow-md" 
          @click="handleFilter"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
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