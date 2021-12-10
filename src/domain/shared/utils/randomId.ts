export function random(timestamp: number) {
  const randomNumber = String(Math.floor(Math.random() * timestamp) + 1);
  return Number(randomNumber.slice(6));
}
