// src/utils/formatDate.ts

export function formatVietnameseDate(dateString: string | Date | null | undefined): string {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // kiểm tra nếu date không hợp lệ
  
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
  
  export function formatVietnameseDateTime(dateString: string | Date | null | undefined): string {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
  
    const datePart = new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  
    const timePart = date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  
    return `${datePart} ${timePart}`;
  }
