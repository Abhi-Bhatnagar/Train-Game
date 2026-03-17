const OPS = ['+', '-', '*', '/']

function applyOp(a, b, op) {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return b !== 0 ? a / b : null
  return null
}

function permutations(arr) {
  if (arr.length <= 1) return [arr]
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm])
    }
  }
  return result
}

/**
 * All 5 distinct bracket structures for 4 numbers (a, b, c, d) with ops (o1, o2, o3):
 * 1. ((a o1 b) o2 c) o3 d
 * 2. (a o1 (b o2 c)) o3 d
 * 3. (a o1 b) o2 (c o3 d)
 * 4. a o1 ((b o2 c) o3 d)
 * 5. a o1 (b o2 (c o3 d))
 */
function evaluateAll(a, b, c, d, o1, o2, o3) {
  const results = []

  // Structure 1: ((a o1 b) o2 c) o3 d
  const s1ab = applyOp(a, b, o1)
  if (s1ab !== null) {
    const s1abc = applyOp(s1ab, c, o2)
    if (s1abc !== null) {
      const s1 = applyOp(s1abc, d, o3)
      if (s1 !== null) results.push({ val: s1, expr: `((${a} ${o1} ${b}) ${o2} ${c}) ${o3} ${d}` })
    }
  }

  // Structure 2: (a o1 (b o2 c)) o3 d
  const s2bc = applyOp(b, c, o2)
  if (s2bc !== null) {
    const s2abc = applyOp(a, s2bc, o1)
    if (s2abc !== null) {
      const s2 = applyOp(s2abc, d, o3)
      if (s2 !== null) results.push({ val: s2, expr: `(${a} ${o1} (${b} ${o2} ${c})) ${o3} ${d}` })
    }
  }

  // Structure 3: (a o1 b) o2 (c o3 d)
  const s3ab = applyOp(a, b, o1)
  const s3cd = applyOp(c, d, o3)
  if (s3ab !== null && s3cd !== null) {
    const s3 = applyOp(s3ab, s3cd, o2)
    if (s3 !== null) results.push({ val: s3, expr: `(${a} ${o1} ${b}) ${o2} (${c} ${o3} ${d})` })
  }

  // Structure 4: a o1 ((b o2 c) o3 d)
  const s4bc = applyOp(b, c, o2)
  if (s4bc !== null) {
    const s4bcd = applyOp(s4bc, d, o3)
    if (s4bcd !== null) {
      const s4 = applyOp(a, s4bcd, o1)
      if (s4 !== null) results.push({ val: s4, expr: `${a} ${o1} ((${b} ${o2} ${c}) ${o3} ${d})` })
    }
  }

  // Structure 5: a o1 (b o2 (c o3 d))
  const s5cd = applyOp(c, d, o3)
  if (s5cd !== null) {
    const s5bcd = applyOp(b, s5cd, o2)
    if (s5bcd !== null) {
      const s5 = applyOp(a, s5bcd, o1)
      if (s5 !== null) results.push({ val: s5, expr: `${a} ${o1} (${b} ${o2} (${c} ${o3} ${d}))` })
    }
  }

  return results
}

export function solve(digits, target = 10) {
  const seen = new Set()
  const solutions = []
  const perms = permutations(digits)

  for (const [a, b, c, d] of perms) {
    for (const o1 of OPS) {
      for (const o2 of OPS) {
        for (const o3 of OPS) {
          const candidates = evaluateAll(a, b, c, d, o1, o2, o3)
          for (const { val, expr } of candidates) {
            if (Math.abs(val - target) < 1e-9 && !seen.has(expr)) {
              seen.add(expr)
              solutions.push(expr)
            }
          }
        }
      }
    }
  }

  // Sort by expression length (simpler solutions first)
  solutions.sort((a, b) => a.length - b.length)
  return solutions
}

export function formatExpr(expr) {
  return expr.replace(/\*/g, '×').replace(/\//g, '÷')
}
