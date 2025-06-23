import type { Stock } from "@/types/stock";

interface AnalysisResponse {
  analysis: string;
}

interface CompanyInfoResponse {
  info: string;
}

export const generateStockAnalysis = async (
  stockInfo: Stock
): Promise<string> => {
  try {
    const response = await $fetch<AnalysisResponse>('/api/ai/analysis', {
      method: 'POST',
      body: {
        stockInfo
      }
    });
    
    return response.analysis;
  } catch (error) {
    console.error("分析報告生成失敗:", error);
    throw new Error("無法生成分析報告，請稍後再試");
  }
};

export const generateCompanyInfo = async (
  stockInfo: Stock
): Promise<string> => {
  try {
    const response = await $fetch<CompanyInfoResponse>('/api/ai/company-info', {
      method: 'POST',
      body: {
        stockInfo
      }
    });
    
    return response.info;
  } catch (error) {
    console.error("公司資訊生成失敗:", error);
    throw new Error("無法生成公司資訊，請稍後再試");
  }
};
