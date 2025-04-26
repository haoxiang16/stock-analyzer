import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Stock, YearlyFinancial } from '@/types/stock';

// 初始化 Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// 創建模型實例
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// 格式化財務數據
const formatFinancialData = (financials: YearlyFinancial[]) => {
  return financials.map(f => `
    ${f.year}年：
    - EPS：${f.eps?.toFixed(2) || 'N/A'}
    - 營業利益率：${f.operatingMargin !== undefined ? f.operatingMargin.toFixed(2) + '%' : 'N/A'}
    - 毛利率：${f.grossMargin !== undefined ?f.grossMargin.toFixed(2) + '%' : 'N/A'}
    - 淨利率：${f.netProfitMargin !== undefined ? f.netProfitMargin.toFixed(2) + '%' : 'N/A'}
  `).join('\n');
};

export const generateStockAnalysis = async (stockInfo: Stock): Promise<string> => {
  try {
    const prompt = `請分析這支股票的財務數據，並給出投資建議。以下是股票資訊：
    代號：${stockInfo.companyCode}
    公司名稱：${stockInfo.companyName}

    財務數據：
    ${formatFinancialData(stockInfo.yearlyFinancials || [])}
    
    請提供以下分析：
    1. 獲利能力分析（EPS、各項利潤率趨勢）
    2. 產業競爭力評估
    3. 投資風險評估
    4. 投資建議
    
    請用繁體中文回答，並保持專業、客觀的語氣。`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API 分析報告生成失敗:', error);
    throw new Error('無法生成分析報告，請稍後再試');
  }
};

export const generateCompanyInfo = async (stockInfo: Stock): Promise<string> => {
  try {
    const prompt = `請提供這家公司的詳細介紹。以下是公司資訊：
    代號：${stockInfo.companyCode}
    公司名稱：${stockInfo.companyName}

    
    請提供以下資訊：
    1. 公司簡介和歷史
    2. 主要業務和產品
    3. 市場地位和競爭優勢
    4. 未來發展策略和機會
    
    請用繁體中文回答，並保持專業、客觀的語氣。`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API 公司資訊生成失敗:', error);
    throw new Error('無法生成公司資訊，請稍後再試');
  }
}; 