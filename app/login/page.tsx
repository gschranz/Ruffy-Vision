'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push('/')
      } else {
        const data = await response.json()
        setError(data.error || 'Invalid password')
      }
    } catch (err) {
      setError('Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#0a0e1a] overflow-hidden flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-cyan-500 animate-pulse" />
            <div className="absolute inset-0 w-10 h-10 rounded-full bg-cyan-500 blur-lg animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-cyan-400 tracking-wider">JARVIS</h1>
        </div>

        {/* Login form */}
        <div className="bg-[#0f1729]/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
          <h2 className="text-xl text-cyan-400 font-semibold mb-6 text-center">
            Authentication Required
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm text-cyan-400/80 mb-2 font-mono">
                Access Code
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-cyan-500/30 rounded px-4 py-3 text-cyan-400 placeholder-cyan-400/30 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors font-mono"
                placeholder="Enter access code"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded px-4 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-[#0a0e1a] font-semibold py-3 rounded transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              {isLoading ? 'Authenticating...' : 'Access System'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-cyan-400/40 font-mono">
            Secure Neural Interface v2.0
          </div>
        </div>
      </div>
    </main>
  )
}
