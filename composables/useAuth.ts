import { useState, readonly } from 'vue'

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

export const useAuth = () => {
  const authData = useState<AuthState>('auth', () => ({
    isAuthenticated: false,
    token: null,
    error: null
  }))

  const pending = ref(false)

  const authenticate = async () => {
    pending.value = true
    try {
      const { data, error } = await useFetch<{ token: string }>('/api/auth', {
        method: 'POST'
      })

      if (error.value) {
        authData.value = {
          isAuthenticated: false,
          token: null,
          error: error.value?.message || 'Authentication failed'
        }
        return false
      }

      if (data.value?.token) {
        authData.value = {
          isAuthenticated: true,
          token: data.value.token,
          error: null
        }
        return true
      }

      authData.value = {
        isAuthenticated: false,
        token: null,
        error: 'Invalid response from server'
      }
      return false
    } catch (err) {
      console.error('Authentication error:', err)
      authData.value = {
        isAuthenticated: false,
        token: null,
        error: err instanceof Error ? err.message : 'Unexpected error occurred'
      }
      return false
    } finally {
      pending.value = false
    }
  }

  const logout = () => {
    authData.value = {
      isAuthenticated: false,
      token: null,
      error: null
    }
  }

  return {
    authenticate,
    logout,
    authData: readonly(authData),
    isPending: readonly(pending)
  }
} 