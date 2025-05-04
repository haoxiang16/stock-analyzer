# 股票分析系統

網站: [https://stock-screener-ai.netlify.app/](https://stock-screener-ai.netlify.app/)

使用Nuxt.js開發的股票分析系統，提供財報篩選和AI分析功能。

## 功能特點

- 🔍 **搜尋EPS、毛利率、營業利益率、淨利率連續成長上市櫃公司**:
- 📊 **AI分析報告**：一鍵生成專業的股票分析報告
- 🏢 **公司基本資訊**：快速獲取公司概況


## AI分析

1. **股票財務分析生成 (generateStockAnalysis)**
   - 接收股票資訊和財務數據
   - 使用結構化提示詞引導 AI 生成四部分分析：
     - 獲利趨勢分析
     - 企業體質評估
     - 投資價值判斷
     - 投資人決策建議

2. **公司資訊生成 (generateCompanyInfo)**
   - 基於公司代號和名稱生成詳細企業概況
   - 提示詞設計包含四個核心部分：
     - 公司概況與核心競爭力
     - 業務模型與營收結構
     - 產業定位與市場分析
     - 戰略發展與未來展望
   - 確保生成內容符合台灣產業和資本市場特性

## 技術堆疊

- **前端框架**：Vue 3 + TypeScript
- **狀態管理**：Pinia
- **樣式**：Tailwind CSS + DaisyUI
- **Markdown 渲染**：marked
- **HTTP 請求**：Axios

## 專案架構

```
/project-root
├── assets/             # 靜態樣式（SCSS、images）
├── components/         # 可重用元件
│   └─common/           # 共用元件
├── composables/        # 封裝邏輯的 hooks
├── middleware/         # 中介層
├── pages/              # 頁面元件
├── plugins/            # 插件配置
├── public/             # 靜態資源
├── services/           # 服務元件
├── stores/             # Pinia 狀態管理
├── types/              # TypeScript 型別定義
├── app.vue             # 主應用元件
└── nuxt.config.ts      # Nuxt 配置
```

### 核心模組說明

1. **Components**：
   - `StockFilter.vue`: 提供股票搜尋功能
   - `StockList.vue`: 以表格形式展示股票列表
   - `ui/AIModal.vue`: 展示 AI 分析結果的彈窗組件

2. **Composables**：
   - `useStock.ts`: 處理股票資料的獲取與篩選邏輯
   - `useAI.ts`: 處理 AI 分析與公司資訊生成邏輯

3. **Stores**：
   - `stockStore.ts`: 管理股票資料狀態
   - `aiStore.ts`: 管理 AI 分析和公司資訊狀態

4. **Services**：
   - `gemini.ts`: 與 Google Gemini AI 模型的整合
   - `auth.ts`: 身份認證和授權管理

5. **Types**：
   - `stock.ts`: 定義股票、篩選條件和分析相關的類型

### 服務整合

- **services/gemini.ts**: Google Gemini AI 模型整合
  - 配置 AI 模型參數如溫度和採樣方式
  - 提供股票財務分析生成功能
  - 提供公司概況生成功能


- **services/auth.ts**: 身份認證和授權服務
  - JWT 令牌管理（獲取、存儲、刷新）
  - API 請求授權處理
  - 提供經過身份驗證的 Axios 實例
  - 登入/登出功能和認證狀態管理

### 類型定義

- **types/stock.ts**: 定義所有與股票相關的 TypeScript 類型
  - `Stock`: 股票基本信息
  - `StockAnalysis`: 分析報告類型
  - `CompanyInfo`: 公司資訊類型

   ## 未來規劃

- 增加EPS、毛利率、營業利益率、淨利率等財務指標連續季增上市櫃公司查詢。
- 增設個人投資組合管理功能，協助使用者追蹤與評估自身投資績效。

