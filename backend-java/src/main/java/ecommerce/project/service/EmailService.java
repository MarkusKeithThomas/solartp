package ecommerce.project.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendResetPasswordEmail(String email, String token) {
        String resetLink = "http://localhost:5173/tai-khoan/reset-password?token=" + token;
        String subject = "🔒 Đặt lại mật khẩu của bạn";
        String message = "Nhấn vào link sau để đặt lại mật khẩu của bạn: " + resetLink;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }
}