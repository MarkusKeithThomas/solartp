export function discountProduct(newPrice: number, oldPrice: number) {
  return ((Math.round(((oldPrice - newPrice) / oldPrice) * 100)));
}
