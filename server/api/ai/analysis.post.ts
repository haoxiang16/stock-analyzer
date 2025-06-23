import { GoogleGenerativeAI } from "@google/generative-ai";
import type { YearlyFinancial } from "@/types/stock";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log('Received request body:', JSON.stringify(body, null, 2));
    
    const { stockInfo } = body;

    if (!stockInfo) {
      console.error('Stock information is missing from request');
      throw createError({
        statusCode: 400,
        statusMessage: 'Stock information is required'
      });
    }

    // 使用伺服器端環境變數（不會暴露給客戶端）
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key available:', !!apiKey);
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not set');
      throw createError({
        statusCode: 500,
        statusMessage: 'API key not configured'
      });
    }

    console.log('Initializing Gemini AI...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.1,
        topK: 16,
        topP: 0.8,
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

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();
    
    console.log('Successfully generated analysis');
    return {
      analysis: analysisText
    };

  } catch (error) {
    console.error("Gemini API 分析報告生成失敗:", error);
    
    // 提供更詳細的錯誤訊息
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to generate analysis: ${error.message}`
      });
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate analysis - unknown error'
    });
  }
}); 