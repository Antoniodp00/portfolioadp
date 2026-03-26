package com.portfolio.backend.controller;

import com.portfolio.backend.model.AuthRequest;
import com.portfolio.backend.model.AuthResponse;
import com.portfolio.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;

    @Value("${portfolio.admin.username}")
    private String adminUsername;

    @Value("${portfolio.admin.password}")
    private String adminPassword;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        if (adminUsername.equals(req.getUsername()) && adminPassword.equals(req.getPassword())) {
            String token = jwtService.generateToken(req.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, req.getUsername(), jwtService.getExpiration()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(java.util.Map.of("error", "Credenciales incorrectas"));
    }
}
