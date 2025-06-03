package com.resa.api.model.dto;

import java.time.LocalDateTime;

import com.resa.api.model.User;

import lombok.Data;

@Data
public class UserDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private String name;
    private String email;
    private String password;

    public UserDto (User user) {
        this.id = user.getId();

        this.created_at = user.getCreatedAt();
        this.updated_at = user.getUpdatedAt();
    }
}
