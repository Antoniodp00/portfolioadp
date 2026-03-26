package com.portfolio.backend.service;

import com.portfolio.backend.config.DataStore;
import com.portfolio.backend.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final DataStore store;

    public Profile getProfile()              { return store.getProfile(); }
    public List<Skill> getSkills()           { return store.getSkills(); }
    public List<Project> getProjects()       { return store.getProjects(); }
    public List<Experience> getExperience()  { return store.getExperiences(); }
    public List<Education> getEducation()    { return store.getEducations(); }

    public void sendContactMessage(ContactMessage message) {
        System.out.printf("Contact from %s <%s>: %s%n",
                message.getName(), message.getEmail(), message.getSubject());
    }
}
