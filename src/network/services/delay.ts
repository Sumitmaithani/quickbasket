/** Simulates network latency with a random delay */
export function simulateDelay(minMs = 200, maxMs = 800): Promise<void> {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
