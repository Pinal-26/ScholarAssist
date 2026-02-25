package com.scholarassist.service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${BREVO_API_KEY}")
    private String apiKey;

    private final OkHttpClient client = new OkHttpClient();

    public void sendOtpEmail(String toEmail, String otp) throws Exception {

        String json = """
        {
          "sender": {
            "name": "ScholarAssist",
            "email": "scholarassist0326@gmail.com"
          },
          "to": [{
            "email": "%s"
          }],
          "subject": "ScholarAssist Email Verification OTP",
          "htmlContent": "<h3>Your OTP for email verification is: <strong>%s</strong></h3><p>This OTP is valid for 5 minutes.</p>"
        }
        """.formatted(toEmail, otp);

        RequestBody body = RequestBody.create(
                json,
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url("https://api.brevo.com/v3/smtp/email")
                .addHeader("api-key", apiKey)
                .addHeader("Content-Type", "application/json")
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {

            if (!response.isSuccessful()) {
                throw new RuntimeException("Failed to send email: " + response.body().string());
            }
        }
    }
}