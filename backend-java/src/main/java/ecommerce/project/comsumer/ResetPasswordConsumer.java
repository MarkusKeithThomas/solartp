package ecommerce.project.comsumer;

import ecommerce.project.config.RabbitMQResetConfig;
import ecommerce.project.dtoresponse.ResetPasswordDTO;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ResetPasswordConsumer {

    private final JavaMailSender mailSender;

    public ResetPasswordConsumer(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @RabbitListener(queues = RabbitMQResetConfig.QUEUE)
    public void handleResetPasswordEmail(ResetPasswordDTO dto) {
        log.info("✅ Nhận yêu cầu gửi email reset mật khẩu cho: {}", dto.getEmail());
        log.info("🔐 Link reset: https://solartp.com.vn/tai-khoan/reset-password?token={}", dto.getResetToken());

        try {
            // Tạo nội dung email HTML
            String subject = "Yêu cầu đặt lại mật khẩu - SolarTP";
            String link = "https://solartp.com.vn/tai-khoan/reset-password?token=" + dto.getResetToken();
            String content = """
                <p>Xin chào,</p>
                <p>Bạn vừa yêu cầu đặt lại mật khẩu tài khoản tại <strong>SolarTP</strong>.</p>
                <p>Vui lòng nhấn vào đường link dưới đây để thiết lập mật khẩu mới:</p>
                <p><a href="%s" target="_blank">Đặt lại mật khẩu</a></p>
                <br>
                <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
                <p>Trân trọng,<br>Đội ngũ SolarTP</p>
            """.formatted(link);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(dto.getEmail());
            helper.setSubject(subject);
            helper.setText(content, true); // true = gửi HTML

            mailSender.send(message);
            log.info("📧 Gửi email reset thành công cho {}", dto.getEmail());

        } catch (MessagingException e) {
            log.error("❌ Lỗi gửi email reset password: {}", e.getMessage(), e);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}