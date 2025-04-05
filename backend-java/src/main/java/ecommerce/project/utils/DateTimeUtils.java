package ecommerce.project.utils;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtils {

    private static final ZoneId VIETNAM_ZONE = ZoneId.of("Asia/Ho_Chi_Minh");
    private static final DateTimeFormatter VIETNAM_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"); // Bạn có thể thay bằng "dd/MM HH:mm" nếu muốn

    public static String formatToVietnamTime(Instant instant) {
        if (instant == null) return "";
        ZonedDateTime vietnamTime = instant.atZone(VIETNAM_ZONE);
        return vietnamTime.format(VIETNAM_FORMATTER);
    }
}