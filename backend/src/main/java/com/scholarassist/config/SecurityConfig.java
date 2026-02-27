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
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth

                // ================= PUBLIC =================
                .requestMatchers(
                        "/api/users/register",
                        "/api/users/login",
                        "/api/users/admin-login",
                        "/api/users/firebase-login",
                        "/api/users/verify-otp",
                        "/api/users/forgot-password",
                        "/api/users/reset-password"
                ).permitAll()

                // Public scholarship viewing
                .requestMatchers("/api/scholarships/**").permitAll()

                // ================= ADMIN ONLY =================
                .requestMatchers(
                        "/api/admin/**",
                        "/api/users/all"
                ).hasRole("ADMIN")

                // ================= USER + ADMIN =================
                .requestMatchers(
                        "/api/profile/**",
                        "/api/saved/**",
                        "/api/applications/**",
                        "/api/notifications/**"
                ).hasAnyRole("USER", "ADMIN")

                // Everything else requires authentication
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.disable());

        return http.build();
    }

    // ================= CORS CONFIG =================
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

    // ================= PASSWORD ENCODER =================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}