package com.resa.api.model.dto;

import java.time.LocalDateTime;

import com.resa.api.model.UserRoles;

import lombok.Data;

@Data
public class UserRoleDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private String roles;

    public UserRoleDto(UserRoles userRole) {
        this.id = userRole.getId();
        this.created_at = userRole.getCreatedAt();
        this.updated_at = userRole.getUpdatedAt();
        this.roles = userRole.getRoles();
    }
} 