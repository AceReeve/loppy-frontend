export function hexToRgb(hex: string) {
  // eslint-disable-next-line -- disable name group lint
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        toString() {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- allow for this one
          return `${this.r}, ${this.g}, ${this.b}`;
        },
      }
    : null;
}
