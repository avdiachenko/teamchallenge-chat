export function generateRandomCode() {
  return [...Array(15)].map(() => Math.random().toString(36)[2]).join("");
}
