import { ref } from 'vue';
import { useAIStore } from '@/stores/aiStore';

export function useAI() {
  const aiStore = useAIStore();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const generateAnalysis = async (stockCode: string) => {
    loading.value = true;
    error.value = null;
    try {
      const result = await aiStore.generateAnalysis(stockCode);
      return result;
    } catch (err) {
      error.value = '生成分析報告時發生錯誤';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const generateCompanyInfo = async (stockCode: string) => {
    loading.value = true;
    error.value = null;
    try {
      const result = await aiStore.generateCompanyInfo(stockCode);
      return result;
    } catch (err) {
      error.value = '生成公司資訊時發生錯誤';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    generateAnalysis,
    generateCompanyInfo
  };
} 