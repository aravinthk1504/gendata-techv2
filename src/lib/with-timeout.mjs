// Rejects if `promise` has not settled within `ms`, so a stalled backend call
// fails fast instead of holding a page request open for a minute or more. The
// underlying call is not cancelled; its result is simply ignored.
export function withTimeout(promise, ms, label = "operation") {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms} ms`)), ms);
  });
  return Promise.race([Promise.resolve(promise), timeout]).finally(() => clearTimeout(timer));
}
