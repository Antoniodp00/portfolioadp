package com.portfolio.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private List<String> technologies;
    private String githubUrl;
    private String liveUrl;
    private String category;
    private boolean featured;
}
