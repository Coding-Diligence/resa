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
    private BoatDto boat;

    public TravelDto(Travel t) {
        this.id = t.getId();

        this.created_at = t.getCreatedAt();
        this.updated_at = t.getUpdatedAt();

        this.arrival_port = t.getArrivalPort();
        this.arrival_time = t.getArrivalTime();

        this.departure_port = t.getDeparturePort();
        this.departure_time = t.getDepartureTime();

        this.price_human = t.getPriceHuman();
        this.price_vehicle = t.getPriceVehicle();

        this.boat = new BoatDto(t.getBoat());
    }
}