import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Stock, YearlyFinancial } from "@/types/stock";

// 初始化 Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// 創建模型實例，增加生成參數
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.1, // 低溫度值使輸出更確定性和一致
    topK: 16, // 控制每一步考慮的候選詞數量
    topP: 0.8, // 控制採樣概率閾值
    //maxOutputTokens: 2048 // 確保輸出長度一致
  },
});

// 格式化財務數據
const formatFinancialData = (financials: YearlyFinancial[]) => {
  return financials
    .map(
      (f) => `
    ${f.year}年：
    - EPS：${f.eps?.toFixed(2) || "N/A"}
    - 營業利益率：${
      f.operatingMargin !== undefined
        ? f.operatingMargin.toFixed(2) + "%"
        : "N/A"
    }
    - 毛利率：${
      f.grossMargin !== undefined ? f.grossMargin.toFixed(2) + "%" : "N/A"
    }
    - 淨利率：${
      f.netProfitMargin !== undefined
        ? f.netProfitMargin.toFixed(2) + "%"
        : "N/A"
    }
  `
    )
    .join("\n");
};

export const generateStockAnalysis = async (
  stockInfo: Stock
): Promise<string> => {
  try {
    const prompt = `分析報告：${stockInfo.companyCode} ${stockInfo.companyName}

公司基本資料：
• 股票代號：${stockInfo.companyCode}
• 公司名稱：${stockInfo.companyName}

最近${stockInfo.yearlyFinancials?.length || 0}年財務數據：
${formatFinancialData(stockInfo.yearlyFinancials || [])}

分析內容：
1. 獲利趨勢分析
   • EPS連續成長情況及波動性評估
   • 毛利率、營業利益率和淨利率的變化趨勢及同產業比較
   • 關鍵財務指標顯示的競爭優勢或劣勢

2. 企業體質評估
   • 核心業務穩定性分析
   • 公司成長動能和護城河優勢
   • 潛在財務風險指標 (如果有)

3. 投資價值判斷
   • 目前股價相對財務表現的合理性
   • 未來1-2年獲利預期和股價潛力
   • 投資報酬率與風險評估比率

4. 投資人決策建議
   • 投資立場(買入/觀望/賣出)
   • 目標價位區間或合理價值
   • 關鍵監控指標和時間點

注意事項：
- 分析必須基於客觀財務數據
- 使用專業投資分析師的語氣和術語
- 提供具體數字和明確判斷
- 分析須符合台灣市場投資環境
- 嚴格按照上述結構提供標準化分析內容
- 不使用口語化或過於客氣的用語`;

    // 保存在會話歷史中，用於提高一致性
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API 分析報告生成失敗:", error);
    throw new Error("無法生成分析報告，請稍後再試");
  }
};

export const generateCompanyInfo = async (
  stockInfo: Stock
): Promise<string> => {
  try {
    const prompt = `公司概況報告：${stockInfo.companyCode} ${stockInfo.companyName}

公司基本資料：
• 股票代號：${stockInfo.companyCode}
• 公司名稱：${stockInfo.companyName}
• 產業別：${stockInfo.industry || '未提供'}

分析內容：
1. 公司簡介
   • 主要業務範圍
   • 市場定位
   • 產業地位

2. 產業分析
   • 產業發展現況
   • 市場競爭格局
   • 未來發展趨勢

3. 競爭優勢
   • 核心競爭力
   • 技術能力
   • 市場佔有率

4. 發展策略
   • 營運策略
   • 成長計畫
   • 投資布局

注意事項：
- 內容須基於公開資訊
- 使用專業分析師的語氣和術語
- 提供具體數據和明確分析
- 符合台灣產業環境
- 嚴格按照結構提供標準化內容
- 不使用口語化或過於客氣的用語`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API 公司資訊生成失敗:", error);
    throw new Error("無法生成公司資訊，請稍後再試");
  }
};
