package ecommerce.project.utils;

import java.time.*;
import java.time.format.DateTimeFormatter;

public class DateTimeUtils {

    private static final ZoneId ZONE_VN = ZoneId.of("Asia/Ho_Chi_Minh");
    private static final DateTimeFormatter VIETNAM_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"); // Bạn có thể thay bằng "dd/MM HH:mm" nếu muốn

    public static String formatToVietnamTime(Instant instant) {
        if (instant == null) return "";
        ZonedDateTime vietnamTime = instant.atZone(ZONE_VN);
        return vietnamTime.format(VIETNAM_FORMATTER);
    }

    /**
     * Tiện ích chuẩn hóa thời gian xuyên suốt toàn hệ thống.
     * Hỗ trợ: ISO format, epoch millis, UTC, giờ Việt Nam (Asia/Ho_Chi_Minh)
     */

        // ✅ Múi giờ mặc định (giờ Việt Nam)
        public static final ZoneId ZONE_UTC = ZoneOffset.UTC;

        // ✅ Định dạng ISO chuẩn để truyền JSON, lưu Redis, MQ, FE
        public static final DateTimeFormatter ISO_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        // ========= 💡 HIỆN TẠI =========

        /** 🕒 Lấy thời gian hiện tại theo UTC */
        public static Instant nowUtc() {
            return Instant.now();
        }

        /** 🕒 Lấy thời gian hiện tại theo giờ Việt Nam */
        public static LocalDateTime nowVietnam() {
            return LocalDateTime.now(ZONE_VN);
        }

        // ========= 🧾 FORMAT CHUỖI =========

        /** Format LocalDateTime thành chuỗi ISO (giờ VN) */
        public static String format(LocalDateTime time) {
            return time == null ? null : time.format(ISO_FORMATTER);
        }

        /** Format Instant (UTC) thành chuỗi ISO UTC */
        public static String format(Instant instant) {
            return instant == null ? null : ISO_FORMATTER.withZone(ZONE_UTC).format(instant);
        }

        /** Format LocalDateTime sang ISO + offset (+07:00) */
        public static String formatWithOffset(LocalDateTime time) {
            return time == null ? null : time.atZone(ZONE_VN).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        }

        // ========= 📥 PARSE =========

        /** Parse chuỗi ISO thành LocalDateTime (không có offset) */
        public static LocalDateTime parse(String isoString) {
            return LocalDateTime.parse(isoString, ISO_FORMATTER);
        }

        /** Parse millis → LocalDateTime theo múi giờ Việt Nam */
        public static LocalDateTime fromMillis(long millis) {
            return Instant.ofEpochMilli(millis).atZone(ZONE_VN).toLocalDateTime();
        }

        // ========= ⏱ EPOCH =========

        /** Chuyển LocalDateTime thành millis (epoch) theo giờ Việt Nam */
        public static long toMillis(LocalDateTime time) {
            return time.atZone(ZONE_VN).toInstant().toEpochMilli();
        }

        /** Chuyển Instant UTC thành millis */
        public static long toMillis(Instant instant) {
            return instant.toEpochMilli();
        }
}