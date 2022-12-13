// Does not work for numbers greater than 9999
export function compressNumber(likes: number): string {
  return likes > 999 ? `${(likes / 1000).toFixed(1)} k` : likes.toString();
}
