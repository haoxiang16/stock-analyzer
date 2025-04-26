// 年度財務數據
export interface YearlyFinancial {
  year: number;
  eps: number;
  operatingMargin: number;
  grossMargin: number;
  netProfitMargin: number;
}

// 股票資訊
export interface Stock {
  companyCode: string;
  companyName: string;
  industry: string;
  market: string;
  yearlyFinancials: YearlyFinancial[];
  // 為了向後兼容，保留這些欄位但設為可選
  code?: string;
  name?: string;
}

// 篩選參數
export interface StockAnalysisParams {
  epsYears?: number;
  operatingMarginYears?: number;
  grossMarginYears?: number;
  netProfitMarginYears?: number;
  minOperatingMargin?: number;
  minOperatingMarginYears?: number;
}

export interface StockAnalysis {
  code: string;
  name: string;
  analysis: string;
  timestamp: string;
}

export interface CompanyInfo {
  code: string;
  name: string;
  info: string;
  timestamp: string;
} 