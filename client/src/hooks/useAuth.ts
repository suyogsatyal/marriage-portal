import { useEffect, useState } from "react"

export const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const isAuthenticated = !!user

  return { user, isAuthenticated, loading }
}
