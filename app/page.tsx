'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VoiceAgentPage() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showHint, setShowHint] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify')
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed'
    script.async = true
    script.type = 'text/javascript'
    script.onload = () => setIsScriptLoaded(true)
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-cyan-400">Verifying access...</div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen bg-[#0a0e1a] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Pulsing orbs in background */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute top-40 right-32 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-36 h-36 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
      
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-cyan-500 animate-pulse" />
            <div className="absolute inset-0 w-8 h-8 rounded-full bg-cyan-500 blur-lg animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">JARVIS</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400">Online</span>
          </div>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' })
              router.push('/login')
            }}
            className="text-xs text-cyan-400/60 hover:text-cyan-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="relative">
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-cyan-500/40 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-16 rounded-full border border-cyan-500/50 animate-[spin_10s_linear_infinite]" />
            
            <div className="absolute inset-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 blur-2xl opacity-50 animate-pulse" />
            <div className="absolute inset-28 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-xl animate-pulse" />
            <div className="absolute inset-32 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 shadow-[0_0_100px_rgba(34,211,238,0.6)]" />
            
            <div className="absolute top-1/2 left-0 w-20 h-px bg-gradient-to-r from-transparent to-cyan-500/50" />
            <div className="absolute top-1/2 right-0 w-20 h-px bg-gradient-to-l from-transparent to-cyan-500/50" />
            <div className="absolute top-1/3 left-0 w-16 h-px bg-gradient-to-r from-transparent to-cyan-500/30" />
            <div className="absolute top-2/3 right-0 w-16 h-px bg-gradient-to-l from-transparent to-cyan-500/30" />
          </div>

          <div className="absolute -left-32 top-20 text-xs text-cyan-400/60 font-mono">
            <div>JARVIS</div>
            <div className="text-cyan-400/40">v2.0</div>
          </div>
          <div className="absolute -right-32 top-1/3 text-xs text-emerald-400/70 font-mono text-right">
            <div>SYSTEMS: ONLINE</div>
            <div className="text-cyan-400/40">READY</div>
          </div>
        </div>
      </div>

      {showHint && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowHint(false)} />
          <div className="relative bg-gradient-to-br from-cyan-950/90 to-blue-950/90 border border-cyan-500/50 rounded-lg p-8 max-w-md shadow-[0_0_50px_rgba(34,211,238,0.3)] animate-pulse">
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cyan-500 animate-ping" />
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cyan-500" />
            <button
              onClick={() => setShowHint(false)}
              className="absolute top-4 right-4 text-cyan-400/60 hover:text-cyan-400 transition-colors"
              aria-label="Close hint"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <div className="mb-4 text-cyan-400 font-bold text-lg">System Hinweis</div>
              <p className="text-cyan-300/90 font-mono leading-relaxed">
                Klicke uf das Telefonsymbol, um mit Jarvis zu sprechen. Warte auf eine Begrüßung bevor du startest
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-50">
        {isScriptLoaded && (
          <elevenlabs-convai agent-id="agent_3701ka3qn4msex2s4vts6qsbjy6x" />
        )}
      </div>

      <div className="absolute bottom-8 left-8 text-xs text-cyan-400/40 font-mono">
        <div>NEURAL INTERFACE ACTIVE</div>
      </div>
    </main>
  )
}
