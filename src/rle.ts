interface Run<T> {
  value: T
  length: number
}

export function encode<T>(seq: T[]): Run<T>[] {
  if (seq.length === 0) {
    return []
  }

  const result = [{ value: seq[0], length: 0 }]

  for (const c of seq) {
    const last = result[result.length - 1] // will never be undefined

    if (c === last.value) {
      last.length += 1
    } else {
      result.push({ value: c, length: 1 })
    }
  }

  return result
}

export function decode<T>(seq: Run<T>[]): T[] {
  const result = []

  for (const run of seq) {
    
    for (let i = 0; i < run.length; i++) {
      result.push(run.value)
    }
  }

  return result
}

export function myEquality(a: any, b: any) {
  return a === b
}