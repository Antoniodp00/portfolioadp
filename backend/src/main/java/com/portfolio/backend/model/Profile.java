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
public class Profile {
    private String name;
    private String title;
    private String subtitle;
    private String bio;
    private String email;
    private String phone;
    private String location;
    private String avatarUrl;
    private List<SocialLink> socialLinks;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SocialLink {
        private String platform;
        private String url;
        private String icon;
    }
}
