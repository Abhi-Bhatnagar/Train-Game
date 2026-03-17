'use client'

import { useRef, useState } from 'react'
import { solve } from '@/lib/solver'
import DigitInput from './components/DigitInput'
import SolutionList from './components/SolutionList'
import styles from './page.module.css'

const ROUTES = [
  { code: 'T1', name: 'North Shore & Western Line' },
  { code: 'T2', name: 'Leppington & Inner West Line' },
  { code: 'T3', name: 'Liverpool & Inner West Line' },
  { code: 'T4', name: 'Eastern Suburbs & Illawarra Line' },
  { code: 'T5', name: 'Cumberland Line' },
  { code: 'T6', name: 'Lidcombe & Bankstown Line' },
  { code: 'T7', name: 'Olympic Park Line' },
  { code: 'T8', name: 'Airport & South Line' },
  { code: 'T9', name: 'Northern Line' },
]

export default function Home() {
  const [digits, setDigits] = useState(['', '', '', ''])
  const [solutions, setSolutions] = useState([])
  const [status, setStatus] = useState('idle') // idle | found | none
  const refs = [useRef(), useRef(), useRef(), useRef()]

  function setDigit(index, val) {
    setDigits(prev => {
      const next = [...prev]
      next[index] = val
      return next
    })
  }

  function focusNext(i) {
    if (i < 3) refs[i + 1].current?.querySelector('input')?.focus()
  }

  function focusPrev(i) {
    if (i > 0) refs[i - 1].current?.querySelector('input')?.focus()
  }

  function handleSolve() {
    const parsed = digits.map(d => d === '' ? null : parseInt(d))
    if (parsed.some(d => d === null)) return

    const result = solve(parsed, 10)
    setSolutions(result)
    setStatus(result.length > 0 ? 'found' : 'none')
  }

  function handleRandom() {
    const rand = Array.from({ length: 4 }, () => String(Math.floor(Math.random() * 10)))
    setDigits(rand)
    setSolutions([])
    setStatus('idle')
    refs[0].current?.querySelector('input')?.focus()
  }

  const allFilled = digits.every(d => d !== '')

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>The Train Game</div>
        <div className={styles.sub}>Sydney Carriage Number Solver &bull; Make 10</div>
      </header>

      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          {[...ROUTES, ...ROUTES].map((r, i) => (
            <span key={i} className={styles.tickerItem}>
              <span className={styles.tickerCode}>{r.code}</span>
              <span className={styles.tickerName}>{r.name}</span>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.panel}>
          <div className={styles.panelTitle}>Enter carriage number digits</div>

          <div className={styles.digits}>
            {digits.map((val, i) => (
              <div key={i} ref={refs[i]} style={{ flex: 1 }}>
                <DigitInput
                  id={`D${i + 1}`}
                  value={val}
                  onChange={(v) => setDigit(i, v)}
                  onNext={() => focusNext(i)}
                  onPrev={() => focusPrev(i)}
                  onEnter={handleSolve}
                />
              </div>
            ))}
          </div>

          <div className={styles.targetRow}>
            <span className={styles.targetLabel}>Target</span>
            <span className={styles.targetVal}>= 10</span>
          </div>

          <button className={styles.randomBtn} onClick={handleRandom}>
            ↺ Random carriage number
          </button>

          <button
            className={styles.solveBtn}
            onClick={handleSolve}
            disabled={!allFilled}
          >
            Solve
          </button>
        </div>

        <SolutionList solutions={solutions} status={status} />
      </div>
    </main>
  )
}