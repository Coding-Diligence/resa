package com.resa.api.model.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.resa.api.model.Travel;
import com.resa.api.model.Vehicle;

import lombok.Data;

@Data
public class VehicleDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private String registration;
    private String type;
    private String user;
    private Integer user_id;
    private List<Travel> travels;
    private List<Integer> travels_id;

    public VehicleDto (Vehicle v) {
        this.id = v.getId();

        this.created_at = v.getCreatedAt();
        this.updated_at = v.getUpdatedAt();

        this.registration = v.getRegistration();
        this.type = v.getType();

        this.user = v.getUser().getName();
        this.user_id = v.getUser().getId();
    }
}
