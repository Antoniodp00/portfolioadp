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
public class Experience {
    private Long id;
    private String company;
    private String role;
    private String period;
    private String startDate;
    private String endDate;
    private boolean current;
    private String description;
    private List<String> achievements;
    private String companyUrl;
    private String logoUrl;
}
