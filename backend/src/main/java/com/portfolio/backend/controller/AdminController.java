package com.portfolio.backend.controller;

import com.portfolio.backend.config.DataStore;
import com.portfolio.backend.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final DataStore store;

    // ── Profile ──────────────────────────────────────────────────
    @PutMapping("/profile")
    public ResponseEntity<Profile> updateProfile(@RequestBody Profile profile) {
        store.setProfile(profile);
        return ResponseEntity.ok(store.getProfile());
    }

    // ── Skills ───────────────────────────────────────────────────
    @PostMapping("/skills")
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        skill.setId(null);
        return ResponseEntity.ok(store.saveSkill(skill));
    }

    @PutMapping("/skills/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody Skill skill) {
        skill.setId(id);
        return ResponseEntity.ok(store.saveSkill(skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Map<String,String>> deleteSkill(@PathVariable Long id) {
        store.deleteSkill(id);
        return ResponseEntity.ok(Map.of("status", "deleted"));
    }

    // ── Projects ─────────────────────────────────────────────────
    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        project.setId(null);
        return ResponseEntity.ok(store.saveProject(project));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
        project.setId(id);
        return ResponseEntity.ok(store.saveProject(project));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Map<String,String>> deleteProject(@PathVariable Long id) {
        store.deleteProject(id);
        return ResponseEntity.ok(Map.of("status", "deleted"));
    }

    // ── Experience ───────────────────────────────────────────────
    @PostMapping("/experience")
    public ResponseEntity<Experience> createExperience(@RequestBody Experience exp) {
        exp.setId(null);
        return ResponseEntity.ok(store.saveExperience(exp));
    }

    @PutMapping("/experience/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody Experience exp) {
        exp.setId(id);
        return ResponseEntity.ok(store.saveExperience(exp));
    }

    @DeleteMapping("/experience/{id}")
    public ResponseEntity<Map<String,String>> deleteExperience(@PathVariable Long id) {
        store.deleteExperience(id);
        return ResponseEntity.ok(Map.of("status", "deleted"));
    }

    // ── Education ────────────────────────────────────────────────
    @PostMapping("/education")
    public ResponseEntity<Education> createEducation(@RequestBody Education edu) {
        edu.setId(null);
        return ResponseEntity.ok(store.saveEducation(edu));
    }

    @PutMapping("/education/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education edu) {
        edu.setId(id);
        return ResponseEntity.ok(store.saveEducation(edu));
    }

    @DeleteMapping("/education/{id}")
    public ResponseEntity<Map<String,String>> deleteEducation(@PathVariable Long id) {
        store.deleteEducation(id);
        return ResponseEntity.ok(Map.of("status", "deleted"));
    }
}
