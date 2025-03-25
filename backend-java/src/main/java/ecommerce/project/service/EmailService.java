package ecommerce.project.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Value("${app.base-url}")
    private String BASE_URL_GOOGLE_LOGIN;
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendResetPasswordEmail(String email, String token) {
        //Ở UI người dùng sẽ đưa đến trang để gọi API của srping boot gọi yêu cầu passs word mới
        String resetLink = BASE_URL_GOOGLE_LOGIN+"/tai-khoan/reset-password?token=" + token;
        String subject = "🔒 Đặt lại mật khẩu của bạn";
        String message = "Nhấn vào link sau để đặt lại mật khẩu của bạn: " + resetLink;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }
}