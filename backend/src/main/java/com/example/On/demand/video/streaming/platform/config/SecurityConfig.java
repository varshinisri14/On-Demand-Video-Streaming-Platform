package com.example.On.demand.video.streaming.platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(request -> {

                    var configuration =
                            new org.springframework.web.cors.CorsConfiguration();

                    configuration.setAllowedOrigins(
                            java.util.List.of(
                                    "http://localhost:5173"
                            )
                    );

                    configuration.setAllowedMethods(
                            java.util.List.of(
                                    "GET",
                                    "POST",
                                    "PUT",
                                    "DELETE",
                                    "OPTIONS"
                            )
                    );

                    configuration.setAllowedHeaders(
                            java.util.List.of("*")
                    );

                    configuration.setAllowCredentials(true);

                    return configuration;
                }))

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login",
                                "/api/videos/approved",
                                "/api/videos/stream/**"
                        )
                        .permitAll()

                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}