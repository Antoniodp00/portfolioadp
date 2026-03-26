package com.portfolio.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Education {
    private Long id;
    private String institution;
    private String degree;
    private String field;
    private String period;
    private String startDate;
    private String endDate;
    private String description;
    private String logoUrl;
}
