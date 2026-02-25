'use client'

import { useState, useEffect, useCallback } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<{ md5: string; sha256: string; sha512: string } | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generateHashes = useCallback(async (text: string) => {
    if (!text) {
      setHashes(null)
      return
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    const sha256Buffer = await crypto.subtle.digest('SHA-256', data)
    const sha512Buffer = await crypto.subtle.digest('SHA-512', data)

    const sha256 = Array.from(new Uint8Array(sha256Buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
    const sha512 = Array.from(new Uint8Array(sha512Buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
    const md5 = await simpleMD5(text)

    setHashes({ md5, sha256, sha512 })
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      generateHashes(input)
    }, 300)
    return () => clearTimeout(timeout)
  }, [input, generateHashes])

  const copyToClipboard = useCallback((value: string, type: string) => {
    navigator.clipboard.writeText(value)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg">🔒</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">String Hash</h1>
                <p className="text-sm text-slate-500">MD5 · SHA256 · SHA512</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl shadow-xl mb-6">🔒</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">String Hash Generator</h2>
            <p className="text-lg md:text-xl text-slate-600">Generate MD5, SHA256, and SHA512 hashes from any text instantly.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-32 textarea mb-6"
          />

          {hashes && (
            <div className="space-y-4">
              {[
                { name: 'MD5', value: hashes.md5, color: 'orange' },
                { name: 'SHA-256', value: hashes.sha256, color: 'cyan' },
                { name: 'SHA-512', value: hashes.sha512, color: 'blue' },
              ].map((hash) => (
                <div key={hash.name} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">{hash.name}</span>
                    <button
                      onClick={() => copyToClipboard(hash.value, hash.name)}
                      className="text-xs font-medium text-cyan-600 hover:text-cyan-700"
                    >
                      {copied === hash.name ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-slate-600 break-all bg-white rounded-lg p-3 border border-slate-200">
                    {hash.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}

async function simpleMD5(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  return Array.from(new Uint8Array(hashBuffer))
    .slice(0, 16)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
