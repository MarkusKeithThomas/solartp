package ecommerce.project.utils;

import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.Locale;

@Component
public class StringUtil {

    public String toSlug(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "untitled";
        }

        // 1. Chuẩn hóa chuỗi
        String slug = input.trim();

        // 2. Thay thế các ký tự đặc biệt hay gặp trong tiếng Việt copy từ Word/Docs
        slug = slug.replaceAll("[“”]", "\"")
                .replaceAll("[‘’]", "'")
                .replaceAll("[–—]", "-")
                .replaceAll("…", "...")
                .replaceAll("\\u00A0", " "); // khoảng trắng không ngắt dòng

        // 3. Normalize (chuẩn hóa Unicode – tách dấu)
        slug = Normalizer.normalize(slug, Normalizer.Form.NFD);

        // 4. Thay thế thủ công chữ đặc biệt tiếng Việt (đ → d)
        slug = slug.replaceAll("[đĐ]", "d");

        // 5. Loại bỏ các dấu (ký tự tổ hợp)
        slug = slug.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");

        // 6. Chuyển thành chữ thường
        slug = slug.toLowerCase(Locale.ROOT);

        // 7. Loại bỏ các ký tự không phải a-z, 0-9, khoảng trắng hoặc gạch ngang
        slug = slug.replaceAll("[^a-z0-9\\s-]", "");

        // 8. Thay thế khoảng trắng và dấu liền kề bằng gạch ngang
        slug = slug.replaceAll("\\s+", "-")      // khoảng trắng → gạch ngang
                .replaceAll("-+", "-")        // gộp nhiều dấu gạch thành 1
                .replaceAll("^-|-$", "");     // xoá gạch ở đầu/cuối

        // 9. Giới hạn slug tối đa (SEO-friendly ~ 120 ký tự)
        final int MAX_LENGTH = 120;
        if (slug.length() > MAX_LENGTH) {
            slug = slug.substring(0, MAX_LENGTH).replaceAll("-+$", "");
        }

        return slug.isEmpty() ? "untitled" : slug;
    }
}