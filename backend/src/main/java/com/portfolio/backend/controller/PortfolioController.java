package com.portfolio.backend.controller;

import com.portfolio.backend.model.*;
import com.portfolio.backend.service.PortfolioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() {
        return ResponseEntity.ok(portfolioService.getProfile());
    }

    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(portfolioService.getSkills());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(portfolioService.getProjects());
    }

    @GetMapping("/experience")
    public ResponseEntity<List<Experience>> getExperience() {
        return ResponseEntity.ok(portfolioService.getExperience());
    }

    @GetMapping("/education")
    public ResponseEntity<List<Education>> getEducation() {
        return ResponseEntity.ok(portfolioService.getEducation());
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> sendContact(@Valid @RequestBody ContactMessage message) {
        portfolioService.sendContactMessage(message);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Mensaje recibido correctamente. Te contactaremos pronto."
        ));
    }
}
