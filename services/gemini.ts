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
    const prompt = `對${stockInfo.companyCode} ${
      stockInfo.companyName
    }進行全面財務分析：

    公司基本資料：
    • 股票代號：${stockInfo.companyCode}
    • 公司名稱：${stockInfo.companyName}

    最近${stockInfo.yearlyFinancials?.length || 0}年財務數據：
    ${formatFinancialData(stockInfo.yearlyFinancials || [])}
    
    請提供以下具體分析：
    1. 獲利趨勢分析：
       • EPS連續成長情況及波動性評估
       • 毛利率、營業利益率和淨利率的變化趨勢及同產業比較
       • 關鍵財務指標顯示的競爭優勢或劣勢
    
    2. 企業體質評估：
       • 核心業務穩定性分析
       • 公司成長動能和護城河優勢
       • 潛在財務風險指標 (如果有)
    
    3. 投資價值判斷：
       • 目前股價相對財務表現的合理性
       • 未來1-2年獲利預期和股價潛力
       • 投資報酬率與風險評估比率
    
    4. 投資人決策建議：
       • 明確的投資立場(建議買入/觀望/賣出)
       • 目標價位區間或合理價值
       • 關鍵監控指標和時間點建議
    
    所有分析必須基於客觀財務數據，使用專業投資分析師的語氣和術語。避免模糊表述，提供具體數字和判斷。分析須符合台灣市場投資環境。
    
    重要：你的回答結構和內容應該非常一致，請嚴格按照上述結構提供標準化的分析內容。`;

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
    const prompt = `提供${stockInfo.companyCode} ${stockInfo.companyName}的完整企業分析報告：

    公司基本識別：
    • 股票代號：${stockInfo.companyCode}
    • 公司名稱：${stockInfo.companyName}
    
    請以專業投資研究報告格式提供以下詳細內容：
    
    1. 公司概況與核心競爭力：
       • 企業創立背景、發展歷程及重要里程碑
       • 公司治理架構和主要經營團隊背景
       • 股權結構和主要投資人分析
       • 企業文化與經營理念評估
    
    2. 業務模型與營收結構：
       • 主要業務範疇和產品/服務線分析
       • 營收組成及各業務線利潤貢獻度
       • 主要客戶群體和銷售通路分析
       • 供應鏈結構和關鍵合作夥伴
    
    3. 產業定位與市場分析：
       • 產業鏈位置和價值鏈角色
       • 市場份額和競爭格局分析
       • 與主要競爭對手的優劣勢比較
       • 行業技術門檻和進入障礙評估
    
    4. 戰略發展與未來展望：
       • 公司中長期發展策略和業務布局
       • 核心技術研發方向和創新能力
       • 潛在成長動能和業務轉型機會
       • 可能面臨的產業挑戰和風險因素
    
    報告須基於實際業務數據和產業研究，採用精準的產業術語，避免籠統描述。分析角度應符合台灣產業和資本市場特性。
    
    重要：你的回答結構和內容應該非常一致，請嚴格按照上述四個部分提供標準化的分析內容。`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API 公司資訊生成失敗:", error);
    throw new Error("無法生成公司資訊，請稍後再試");
  }
};
