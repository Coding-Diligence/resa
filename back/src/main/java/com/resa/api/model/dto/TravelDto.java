package com.resa.api.model.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.resa.api.model.Travel;

import lombok.Data;

@Data
public class TravelDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private String arrival_port;
    private LocalDateTime arrival_time;
    private String departure_port;
    private LocalDateTime departure_time;
    private BigDecimal price_human;
    private BigDecimal price_vehicle;
    private Integer boat_id;

    public TravelDto (Travel travel) {
        this.id = travel.getId();

        this.created_at = travel.getCreatedAt();
        this.updated_at = travel.getUpdatedAt();

        this.arrival_port = travel.getArrivalPort();
        this.arrival_time = travel.getArrivalTime();

        this.departure_port = travel.getDeparturePort();
        this.departure_time = travel.getDepartureTime();

        this.price_human = travel.getPriceHuman();
        this.price_vehicle = travel.getPriceVehicle();
    } 
}