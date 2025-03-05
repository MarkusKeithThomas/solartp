export function formatMoney(price: number) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }