# 股票分析系統

這是一個現代化的股票分析系統，使用 Vue 3 + TypeScript + Tailwind CSS + DaisyUI 構建，提供股票財報篩選和 AI 分析功能。

## 功能特點

- 🔍 **快速搜尋股票**：根據代號或名稱篩選股票
- 📊 **智能分析報告**：一鍵生成專業的股票分析報告
- 🏢 **公司基本資訊**：快速獲取公司概況和業務介紹

## 專案架構

專案採用模組化架構，遵循最佳實踐：

```
/project-root
├── assets/             # 靜態樣式（SCSS、images）
├── components/         # 可重用元件
│   └── gloabl/         # 原子/分子級元件（按鈕、卡片、Modal 等）
├── composables/        # 封裝邏輯的 hooks
├── layouts/            # 頁面 layout
├── middleware/         # 中介層
├── pages/              # 頁面元件
├── plugins/            # 插件配置
├── public/             # 靜態資源
├── server/             # 後端 API
│   └── api/            # API 端點
├── stores/             # Pinia 狀態管理
├── utils/              # 工具函數
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

4. **Types**：
   - `stock.ts`: 定義股票、篩選條件和分析相關的類型

## 使用指南

### 股票搜尋

1. 在搜尋框中輸入股票代號或名稱
2. 系統會即時過濾出符合條件的股票
3. 點擊列表中的股票或「選擇」按鈕選中股票

### 生成分析報告

1. 選擇一支股票
2. 點擊「生成分析報告」按鈕
3. 等待 AI 生成分析報告
4. 查看包含財務健康度、風險評估和投資建議的報告

### 查看公司資訊

1. 選擇一支股票
2. 點擊「公司基本資訊」按鈕
3. 等待 AI 生成公司資訊
4. 查看包含基本概況、主要業務和競爭優勢的報告


## 技術堆疊

- **前端框架**：Vue 3 + TypeScript
- **狀態管理**：Pinia
- **樣式**：Tailwind CSS + DaisyUI
- **Markdown 渲染**：marked
- **HTTP 請求**：Axios

## API 整合

本系統連接到以下 API 端點：

1. **股票篩選 API**
   - 端點：`/api/StockAnalysis/growing-financials`
   - 方法：GET
   - 參數：
     - `epsYears`：EPS 成長年數
     - `operatingMarginYears`：營業利益率年數
     - `grossMarginYears`：毛利率年數
     - `netProfitMarginYears`：淨利率年數
     - `minOperatingMargin`：最小營業利益率
     - `minOperatingMarginYears`：最小營業利益率年數

2. **AI 分析報告 API**
   - 端點：`/api/AI/generateAnalysis`
   - 方法：POST
   - 參數：`{ stockCode: "股票代號" }`

3. **公司基本資訊 API**
   - 端點：`/api/AI/generateCompanyInfo`
   - 方法：POST
   - 參數：`{ stockCode: "股票代號" }`

### 錯誤處理

系統實現了完整的錯誤處理機制：

- **重試機制**：對於不穩定的網絡連接，實現了自動重試
- **超時處理**：針對長時間運行的 AI 請求，設置了較長的超時時間
- **用戶友好錯誤提示**：將後端錯誤轉換為用戶友好的提示訊息

## 代碼結構詳細說明

### 核心文件

- **app.vue**: 主應用入口，包含整體佈局和主要邏輯
- **components/ui/AIModal.vue**: 顯示 AI 生成的分析結果，使用 marked 進行 Markdown 渲染
- **components/StockFilter.vue**: 提供股票搜尋功能，實時過濾
- **components/StockList.vue**: 以表格形式展示股票列表，支持選擇功能

### 狀態管理

- **stores/stockStore.ts**: 管理股票數據的狀態存儲
  - `state`: 儲存股票列表和所有原始股票
  - `actions`: 包含獲取和過濾股票的方法

- **stores/aiStore.ts**: 管理 AI 分析功能的狀態存儲
  - `state`: 儲存分析結果和公司信息
  - `actions`: 包含生成分析報告和公司介紹的方法

### 可重用邏輯

- **composables/useStock.ts**: 抽象出股票數據相關邏輯
  - 提供搜索、過濾和錯誤處理功能
  - 提供數據加載狀態管理

- **composables/useAI.ts**: 抽象出 AI 功能相關邏輯
  - 提供生成分析和公司資訊功能
  - 提供錯誤處理和加載狀態管理

### 類型定義

- **types/stock.ts**: 定義所有與股票相關的 TypeScript 類型
  - `Stock`: 股票基本信息
  - `StockAnalysis`: 分析報告類型
  - `CompanyInfo`: 公司資訊類型

## 開發指南

### 安裝相依套件

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

### 建置生產版本

```bash
npm run build
```

### 處理 Linter 錯誤

本專案使用 ESLint 進行程式碼品質檢測。常見的 linter 錯誤及解決方法：

1. **未使用的變量**
   - 錯誤：`'variable' is defined but never used.`
   - 解決：移除未使用的變量或前綴下劃線 (`_variable`)

2. **導入但未使用的模組**
   - 錯誤：`'Module' is defined but never used.`
   - 解決：移除未使用的導入或確保實際使用該模組

3. **類型不匹配**
   - 錯誤：`Type 'X' is not assignable to type 'Y'.`
   - 解決：確保類型匹配或添加適當的類型轉換

### 建議的 VSCode 擴展

- Vue Language Features (Volar)
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

## 貢獻指南

我們歡迎社區貢獻幫助改進這個專案！

### 貢獻流程

1. Fork 這個倉庫
2. 創建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 代碼規範

- 使用 TypeScript 進行類型安全的開發
- 遵循 Vue 3 組合式 API 的最佳實踐
- 使用 Pinia 進行狀態管理
- 保持組件模塊化和可重用性
- 所有新功能必須包含適當的類型定義

### 協作重點

- UI/UX 改進
- 新增更多股票篩選條件
- 整合實際的股票 API
- 優化 AI 分析功能
- 添加單元測試

## 未來規劃

- 整合真實股票 API
- 增加更多技術分析指標
- 增加股票比較功能
- 增加個人投資組合管理
- 實現使用者帳戶系統
