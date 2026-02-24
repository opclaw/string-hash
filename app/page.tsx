'use client'
import {useState} from 'react'
import styles from './page.module.css'

export default function Home() {
  const [input, setInput] = useState('')
  const [algorithm, setAlgorithm] = useState('SHA-256')
  const [hash, setHash] = useState('')

  const generateHash = async () => {
    if (!input) return
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    setHash(hashHex)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔐 String Hash Generator</h1>
      
      <textarea 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Enter text to hash..."
        className={styles.input}
      />

      <div className={styles.options}>
        <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-384">SHA-384</option>
          <option value="SHA-512">SHA-512</option>
        </select>
        <button onClick={generateHash} className={styles.btn}>Generate Hash</button>
      </div>

      {hash && (
        <div className={styles.result}>
          <label>{algorithm} Hash:</label>
          <code>{hash}</code>
          <button onClick={() => navigator.clipboard.writeText(hash)} className={styles.copy}>Copy</button>
        </div>
      )}
    </div>
  )
}