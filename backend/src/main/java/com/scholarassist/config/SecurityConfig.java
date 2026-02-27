package com.scholarassist.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
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
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults()) // 🔥 Enables CORS
            .authorizeHttpRequests(auth -> auth

                // PUBLIC ENDPOINTS
                .requestMatchers(
                        "/api/users/register",
                        "/api/users/login",
                        "/api/users/admin-login",
                        "/api/users/firebase-login",
                        "/api/users/verify-otp",
                        "/api/users/forgot-password",
                        "/api/users/reset-password",
                        "/api/scholarships/**",
                        "/api/applications/**",
                        "/api/admin/applications",
                        "/api/users/all",
                        "/api/admin/analytics/**",
                        "/api/admin/performance/**",
                        "/api/profile/**",
                        "/api/admin/stats",
                        "/api/admin/import",
                        "/api/saved/**",
                        "/api/notifications/**"
                ).permitAll()

                // ADMIN PROTECTED
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // EVERYTHING ELSE
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.disable());

        return http.build();
    }

    // ✅ Global CORS configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
            "https://scholarassist.vercel.app"
        ));

        configuration.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // Password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
} rewrite whole file and make decision which api should be a ccesses by whom