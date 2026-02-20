package com.scholarassist.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("ScholarAssist Email Verification");
        message.setText("Your OTP is: " + otp + "\nValid for 5 minutes.");

       try {
    mailSender.send(message);
    System.out.println("OTP EMAIL SENT SUCCESSFULLY");
} catch (Exception e) {
    System.out.println("ERROR SENDING EMAIL");
    e.printStackTrace();
}
    }
}