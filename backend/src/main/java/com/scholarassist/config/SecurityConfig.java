package com.scholarassist.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

       http
    .csrf(csrf -> csrf.disable())   // 🔥 THIS LINE IS REQUIRED
    .cors(cors -> {})
    .authorizeHttpRequests(auth -> auth
        .requestMatchers(
            "/api/users/register",
            "/api/users/login",
            "/api/users/verify-otp",
            "/api/users/firebase-login",
            "/api/scholarships/**",
            "/api/profile/**",
            "/api/applications/**",
            "/api/admin/**",
            "/api/users/forgot-password",
"/api/users/reset-password"
        ).permitAll()
        .anyRequest().authenticated()
    )
        .formLogin(form -> form.disable());

        return http.build();
    }

    // 🔥 THIS WAS MISSING (VERY IMPORTANT)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}