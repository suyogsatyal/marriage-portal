// src/hooks/useAuth.ts
export const useAuth = () => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')

  if (!token || !userStr) return { isAuthenticated: false, user: null }

  try {
    const user = JSON.parse(userStr)
    return { isAuthenticated: true, user }
  } catch {
    return { isAuthenticated: false, user: null }
  }
}
