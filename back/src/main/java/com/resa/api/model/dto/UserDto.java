package com.resa.api.model.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.resa.api.model.User;

import lombok.Data;

@Data
public class UserDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private String name;
    private String email;
    private List<UserRoleDto> roles;

    public UserDto(User user) {
        this.id = user.getId();
        this.created_at = user.getCreatedAt();
        this.updated_at = user.getUpdatedAt();
        this.name = user.getName();
        this.email = user.getEmail();
        this.roles = user.getRoles().stream()
                .map(UserRoleDto::new)
                .collect(Collectors.toList());
    }
}
