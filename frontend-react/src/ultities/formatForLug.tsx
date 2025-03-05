export function formatSlug(str: string): string {
    const vietnameseMap: { [key: string]: string } = {
      "á": "a", "à": "a", "ả": "a", "ã": "a", "ạ": "a",
      "ă": "a", "ắ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ặ": "a",
      "â": "a", "ấ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ậ": "a",
      "é": "e", "è": "e", "ẻ": "e", "ẽ": "e", "ẹ": "e",
      "ê": "e", "ế": "e", "ề": "e", "ể": "e", "ễ": "e", "ệ": "e",
      "í": "i", "ì": "i", "ỉ": "i", "ĩ": "i", "ị": "i",
      "ó": "o", "ò": "o", "ỏ": "o", "õ": "o", "ọ": "o",
      "ô": "o", "ố": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ộ": "o",
      "ơ": "o", "ớ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ợ": "o",
      "ú": "u", "ù": "u", "ủ": "u", "ũ": "u", "ụ": "u",
      "ư": "u", "ứ": "u", "ừ": "u", "ử": "u", "ữ": "u", "ự": "u",
      "ý": "y", "ỳ": "y", "ỷ": "y", "ỹ": "y", "ỵ": "y",
      "đ": "d", "Đ": "D" // Đổi "Đ" thành "D"
    };
  
    return str
      .toLowerCase()
      .trim()
      .split("")
      .map(char => vietnameseMap[char] || char) // Chuyển đổi các ký tự tiếng Việt
      .join("")
      .replace(/\s+/g, "-") // Chuyển khoảng trắng thành "-"
      .replace(/[^a-z0-9-]/g, "") // Xóa ký tự đặc biệt
      .replace(/-+/g, "-"); // Xóa dấu "-" liên tiếp
  }