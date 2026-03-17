import { formatExpr } from '@/lib/solver'
import styles from './SolutionList.module.css'

export default function SolutionList({ solutions, status }) {
  if (status === 'idle') return null

  if (status === 'none') {
    return (
      <div className={styles.panel}>
        <div className={styles.panelTitle}>Result</div>
        <div className={`${styles.statusBar} ${styles.none}`}>
          ✕ &nbsp; No solutions — not possible with these digits
        </div>
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelTitle}>Solutions</div>
      <div className={`${styles.statusBar} ${styles.found}`}>
        ✓ &nbsp; Solvable
      </div>
      <div className={styles.countBadge}>
        {solutions.length} solution{solutions.length !== 1 ? 's' : ''} found
      </div>
      <div className={styles.grid}>
        {solutions.map((sol, i) => (
          <div key={i} className={styles.solution}>
            <span className={styles.expr}>{formatExpr(sol)}</span>
            <span className={styles.eq}>= 10</span>
          </div>
        ))}
      </div>
    </div>
  )
}
