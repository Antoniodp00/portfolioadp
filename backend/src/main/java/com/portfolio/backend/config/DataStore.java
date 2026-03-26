package com.portfolio.backend.config;

import com.portfolio.backend.model.*;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class DataStore {

    private final AtomicLong skillSeq    = new AtomicLong(10);
    private final AtomicLong projectSeq  = new AtomicLong(10);
    private final AtomicLong expSeq      = new AtomicLong(10);
    private final AtomicLong eduSeq      = new AtomicLong(10);

    private Profile profile;
    private final List<Skill>      skills      = new ArrayList<>();
    private final List<Project>    projects    = new ArrayList<>();
    private final List<Experience> experiences = new ArrayList<>();
    private final List<Education>  educations  = new ArrayList<>();

    @PostConstruct
    public void init() {
        profile = Profile.builder()
                .name("Tu Nombre")
                .title("Full Stack Developer")
                .subtitle("Apasionado por construir soluciones digitales de alto impacto")
                .bio("Desarrollador Full Stack con más de 5 años de experiencia diseñando y construyendo aplicaciones web escalables. Especializado en Java/Spring Boot y Angular, con sólidos conocimientos en arquitecturas de microservicios, CI/CD y buenas prácticas de desarrollo.")
                .email("tunombre@email.com")
                .phone("+34 600 000 000")
                .location("Madrid, España")
                .avatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio")
                .socialLinks(new ArrayList<>(List.of(
                        Profile.SocialLink.builder().platform("GitHub").url("https://github.com").icon("github").build(),
                        Profile.SocialLink.builder().platform("LinkedIn").url("https://linkedin.com").icon("linkedin").build(),
                        Profile.SocialLink.builder().platform("Twitter").url("https://twitter.com").icon("twitter").build()
                )))
                .build();

        skills.addAll(List.of(
                Skill.builder().id(1L).name("Java").category("Backend").level(92).icon("java").build(),
                Skill.builder().id(2L).name("Spring Boot").category("Backend").level(90).icon("spring").build(),
                Skill.builder().id(3L).name("Node.js").category("Backend").level(75).icon("nodejs").build(),
                Skill.builder().id(4L).name("Angular").category("Frontend").level(88).icon("angular").build(),
                Skill.builder().id(5L).name("TypeScript").category("Frontend").level(85).icon("typescript").build(),
                Skill.builder().id(6L).name("Docker").category("DevOps").level(80).icon("docker").build(),
                Skill.builder().id(7L).name("PostgreSQL").category("Database").level(82).icon("postgresql").build(),
                Skill.builder().id(8L).name("Git").category("Tools").level(92).icon("git").build()
        ));

        projects.addAll(List.of(
                Project.builder().id(1L).title("E-Commerce Platform")
                        .description("Plataforma de comercio electrónico con microservicios, pasarela de pagos y panel de administración.")
                        .technologies(new ArrayList<>(List.of("Spring Boot","Angular","PostgreSQL","Docker")))
                        .githubUrl("https://github.com").liveUrl("https://example.com")
                        .category("Full Stack").featured(true).build(),
                Project.builder().id(2L).title("Task Management App")
                        .description("Gestión de tareas colaborativa con notificaciones en tiempo real y tablero Kanban.")
                        .technologies(new ArrayList<>(List.of("Angular","Spring Boot","WebSocket","MongoDB")))
                        .githubUrl("https://github.com").liveUrl("https://example.com")
                        .category("Full Stack").featured(true).build(),
                Project.builder().id(3L).title("API Gateway & Auth Service")
                        .description("Servicio de autenticación con JWT, OAuth2, rate limiting para microservicios.")
                        .technologies(new ArrayList<>(List.of("Spring Security","JWT","Redis","Docker")))
                        .githubUrl("https://github.com")
                        .category("Backend").featured(true).build()
        ));

        experiences.addAll(List.of(
                Experience.builder().id(1L).company("Tech Solutions S.A.").role("Senior Full Stack Developer")
                        .period("Ene 2022 – Presente").startDate("2022-01").current(true)
                        .description("Liderazgo técnico en desarrollo de plataformas empresariales con Spring Boot y Angular.")
                        .achievements(new ArrayList<>(List.of(
                                "Reducción del 40% en tiempo de respuesta con Redis",
                                "Migración de monolito a microservicios para 500k usuarios"
                        )))
                        .companyUrl("https://example.com").build(),
                Experience.builder().id(2L).company("Digital Factory").role("Full Stack Developer")
                        .period("Mar 2020 – Dic 2021").startDate("2020-03").endDate("2021-12").current(false)
                        .description("Desarrollo de aplicaciones fintech y retail en equipo ágil.")
                        .achievements(new ArrayList<>(List.of("Módulo de pagos con +1M transacciones/mes")))
                        .companyUrl("https://example.com").build()
        ));

        educations.addAll(List.of(
                Education.builder().id(1L).institution("Universidad Politécnica de Madrid")
                        .degree("Grado").field("Ingeniería Informática")
                        .period("2015 – 2019").startDate("2015").endDate("2019")
                        .description("Especialización en Ingeniería del Software y Sistemas Distribuidos.").build(),
                Education.builder().id(2L).institution("Spring Academy")
                        .degree("Certificación").field("Spring Professional Developer")
                        .period("2021").startDate("2021").endDate("2021")
                        .description("Certificación oficial de VMware para Spring Framework.").build()
        ));
    }

    // ── Profile ──────────────────────────────────────────────────
    public Profile getProfile() { return profile; }
    public void setProfile(Profile p) { this.profile = p; }

    // ── Skills ───────────────────────────────────────────────────
    public List<Skill> getSkills() { return skills; }

    public Skill saveSkill(Skill s) {
        if (s.getId() == null) {
            s.setId(skillSeq.incrementAndGet());
            skills.add(s);
        } else {
            skills.replaceAll(x -> x.getId().equals(s.getId()) ? s : x);
        }
        return s;
    }

    public boolean deleteSkill(Long id) {
        return skills.removeIf(s -> s.getId().equals(id));
    }

    // ── Projects ─────────────────────────────────────────────────
    public List<Project> getProjects() { return projects; }

    public Project saveProject(Project p) {
        if (p.getId() == null) {
            p.setId(projectSeq.incrementAndGet());
            projects.add(p);
        } else {
            projects.replaceAll(x -> x.getId().equals(p.getId()) ? p : x);
        }
        return p;
    }

    public boolean deleteProject(Long id) {
        return projects.removeIf(p -> p.getId().equals(id));
    }

    // ── Experience ───────────────────────────────────────────────
    public List<Experience> getExperiences() { return experiences; }

    public Experience saveExperience(Experience e) {
        if (e.getId() == null) {
            e.setId(expSeq.incrementAndGet());
            experiences.add(e);
        } else {
            experiences.replaceAll(x -> x.getId().equals(e.getId()) ? e : x);
        }
        return e;
    }

    public boolean deleteExperience(Long id) {
        return experiences.removeIf(e -> e.getId().equals(id));
    }

    // ── Education ────────────────────────────────────────────────
    public List<Education> getEducations() { return educations; }

    public Education saveEducation(Education e) {
        if (e.getId() == null) {
            e.setId(eduSeq.incrementAndGet());
            educations.add(e);
        } else {
            educations.replaceAll(x -> x.getId().equals(e.getId()) ? e : x);
        }
        return e;
    }

    public boolean deleteEducation(Long id) {
        return educations.removeIf(e -> e.getId().equals(id));
    }
}
