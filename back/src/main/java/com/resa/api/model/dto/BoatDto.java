package com.resa.api.model.dto;

import java.time.LocalDateTime;

import com.resa.api.model.Boat;

import lombok.Data;

@Data
public class BoatDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private Integer cabins;
    private String name;
    private Integer place_freight;
    private Integer place_human_and_pets;

    public BoatDto (Boat boat) {
        this.id = boat.getId();

        this.created_at = boat.getCreatedAt();
        this.updated_at = boat.getUpdatedAt();

        this.cabins = boat.getCabins();
        this.name = boat.getName();

        this.place_freight = boat.getPlaceFreight();
        this.place_human_and_pets = boat.getPlaceHumanAndPet();
    }
}

