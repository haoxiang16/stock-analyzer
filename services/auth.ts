import axios from "axios";

interface LoginResponse {
  token: string;
  expiration: string;
}

interface AuthState {
  token: string | null;
  expiration: Date | null;
}

// 目前的認證狀態
const authState: AuthState = {
  token: null,
  expiration: null,
};

/**
 * 登入並獲取 JWT token
 */
export async function login(
  username: string,
  password: string
): Promise<string> {
  try {
    const response = await axios.post<LoginResponse>(
      "https://stockscanner.azurewebsites.net/api/Auth/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      }
    );

    if (response.data && response.data.token) {
      authState.token = response.data.token;
      authState.expiration = new Date(response.data.expiration);

      // 儲存到 sessionStorage，提高安全性，會話結束時自動清除
      sessionStorage.setItem("auth_token", response.data.token);
      sessionStorage.setItem("auth_expiration", response.data.expiration);

      return response.data.token;
    } else {
      throw new Error("登入失敗: 未獲取到 token");
    }
  } catch (error) {
    console.error("登入失敗:", error);
    throw error;
  }
}
/**
 * 獲取當前的 JWT token，如果過期或不存在則重新登入
 */
export async function getToken(): Promise<string> {
  // 檢查是否已有有效的 token
  if (
    authState.token &&
    authState.expiration &&
    authState.expiration > new Date()
  ) {
    return authState.token;
  }

  // 從 sessionStorage 嘗試讀取 token
  const savedToken = sessionStorage.getItem("auth_token");
  const savedExpiration = sessionStorage.getItem("auth_expiration");

  if (savedToken && savedExpiration && new Date(savedExpiration) > new Date()) {
    authState.token = savedToken;
    authState.expiration = new Date(savedExpiration);
    return savedToken;
  }

  // 從環境變數獲取帳號密碼
  const username = import.meta.env.VITE_AUTH_USERNAME;
  const password = import.meta.env.VITE_AUTH_PASSWORD;

  // 如果沒有有效的 token，則重新登入
  return login(username, password);
}

/**
 * 登出
 */
export function logout(): void {
  authState.token = null;
  authState.expiration = null;
  sessionStorage.removeItem("auth_token");
  sessionStorage.removeItem("auth_expiration");
}

/**
 * 檢查是否已登入
 */
export function isLoggedIn(): boolean {
  return (
    !!authState.token &&
    !!authState.expiration &&
    authState.expiration > new Date()
  );
}

/**
 * 獲取 token 過期前的剩餘時間（分鐘）
 */
export function getTokenRemainingTime(): number {
  if (!authState.expiration) return 0;

  const now = new Date();
  const diff = authState.expiration.getTime() - now.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60)));
}

/**
 * 創建一個帶有 Authorization header 的 axios 實例
 */
export async function createAuthenticatedAxiosInstance() {
  const token = await getToken();

  return axios.create({
    baseURL: "https://stockscanner.azurewebsites.net",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
  });
}
