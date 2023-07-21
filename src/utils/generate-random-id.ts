export function generateRandomId() {
  const timestamp = new Date().getTime();
  const randomNum = Math.random() * 1000000;
  return `${timestamp}-${randomNum}`;
}
