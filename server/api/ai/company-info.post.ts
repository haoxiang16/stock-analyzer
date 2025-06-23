import { GoogleGenerativeAI } from "@google/generative-ai";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log('Received company info request:', JSON.stringify(body, null, 2));
    
    const { stockInfo } = body;

    if (!stockInfo) {
      console.error('Stock information is missing from request');
      throw createError({
        statusCode: 400,
        statusMessage: 'Stock information is required'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key available:', !!apiKey);
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable is not set');
      throw createError({
        statusCode: 500,
        statusMessage: 'API key not configured'
      });
    }

    console.log('Initializing Gemini AI for company info...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
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

    console.log('Sending company info request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const infoText = response.text();
    
    console.log('Successfully generated company info');
    return {
      info: infoText
    };

  } catch (error) {
    console.error("Gemini API 公司資訊生成失敗:", error);
    
    // 提供更詳細的錯誤訊息
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to generate company info: ${error.message}`
      });
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate company info - unknown error'
    });
  }
}); 