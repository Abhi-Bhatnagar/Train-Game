'use client'

import styles from './DigitInput.module.css'

export default function DigitInput({ id, value, onChange, onNext, onPrev, onEnter }) {
  function handleChange(e) {
    const raw = e.target.value
    // Take only the last character typed
    const last = raw.slice(-1)
    if (last === '' || /^[0-9]$/.test(last)) {
      onChange(last)
      if (last !== '') onNext?.()
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') onEnter?.()
    if (e.key === 'Backspace' && value === '') onPrev?.()
    if (e.key === 'ArrowLeft') onPrev?.()
    if (e.key === 'ArrowRight') onNext?.()
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>{id}</span>
      <input
        className={styles.input}
        type="number"
        inputMode="numeric"
        min="0"
        max="9"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="·"
      />
    </div>
  )
}
