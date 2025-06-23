import { GoogleGenerativeAI } from "@google/generative-ai";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { stockInfo } = body;

    if (!stockInfo) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Stock information is required'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'API key not configured'
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.1,
        topK: 16,
        topP: 0.8,
      },
    });

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
    
    return {
      info: response.text()
    };

  } catch (error) {
    console.error("Gemini API 公司資訊生成失敗:", error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate company info'
    });
  }
}); 