export function getRandomColor(colors: string[]): string {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const color = `#${red.toString(16).padStart(2, '0')}${green
    .toString(16)
    .padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

  // make sure no duplicate or similiar color
  const hasSimilarColor = isSimilarColor(color, colors, 0.2);
  if (hasSimilarColor) {
    return getRandomColor(colors);
  }
  return color;
}

export function calculateLuminance(hexColor: string): number {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);

  return (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
}

export function hexToRgb(hexColor: string): number[] {
  const hex = hexColor.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
}

export function euclideanDistance(color1: number[], color2: number[]): number {
  return Math.sqrt(
    color1.reduce((acc, val, index) => acc + (val - color2[index]) ** 2, 0)
  );
}

export function isSimilarColor(
  targetColor: string,
  colorsArray: string[],
  threshold: number = 0.1
): boolean {
  const rgb1 = hexToRgb(targetColor);

  for (const color of colorsArray) {
    const rgb2 = hexToRgb(color);
    const distance = euclideanDistance(rgb1, rgb2);
    if (distance <= threshold) {
      return true;
    }
  }

  return false;
}
