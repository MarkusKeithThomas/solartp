package ecommerce.project.utils;

import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.Locale;

@Component
public class StringUtil {

    public String toSlug(String title) {
        if (title == null || title.isEmpty()) {
            return "untitled"; // Tránh slug rỗng
        }

        // Chuẩn hóa chuỗi, loại bỏ dấu tiếng Việt
        String normalized = Normalizer.normalize(title, Normalizer.Form.NFD);
        String slug = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", ""); // Loại bỏ dấu

        // Chuyển thành chữ thường
        slug = slug.toLowerCase(Locale.ROOT);

        // Thay thế các ký tự không phải chữ cái hoặc số thành dấu gạch ngang
        slug = slug.replaceAll("[^a-z0-9\\s-]", "").replaceAll("\\s+", "-");

        // Xóa dấu gạch ngang dư thừa
        slug = slug.replaceAll("-+", "-").replaceAll("^-|-$", "");

        // Giới hạn slug tối đa 60 ký tự
        if (slug.length() > 60) {
            slug = slug.substring(0, 60);
        }

        return slug.isEmpty() ? "untitled" : slug;
    }
}
