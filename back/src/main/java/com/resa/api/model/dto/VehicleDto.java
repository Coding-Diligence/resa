package com.resa.api.model.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.resa.api.model.Vehicle;

import lombok.Data;

@Data
public class VehicleDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private String registration;
    private String type;
    private Integer user_id;
    private List<Integer> travels_id;

    public VehicleDto(Vehicle vehicle) {
        this.id = vehicle.getId();
        this.created_at = vehicle.getCreatedAt();
        this.updated_at = vehicle.getUpdatedAt();
        this.registration = vehicle.getRegistration();
        this.type = vehicle.getType();
        this.user_id = vehicle.getUser().getId();
        this.travels_id = vehicle.getTravels().stream()
                .map(travel -> travel.getId())
                .collect(Collectors.toList());
    }
}
