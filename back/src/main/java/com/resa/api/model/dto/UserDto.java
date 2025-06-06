package com.resa.api.model.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.resa.api.model.Travel;
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
    private List<Integer> travels_id;

    public UserDto (User u) {
        this.id = u.getId();

        this.created_at = u.getCreatedAt();
        this.updated_at = u.getUpdatedAt();

        this.name = u.getName();

        this.email = u.getEmail();
        this.password = u.getPassword();

        this.travels_id = u.getTravels().stream().map(Travel::getId).collect(Collectors.toList());
    }
}
