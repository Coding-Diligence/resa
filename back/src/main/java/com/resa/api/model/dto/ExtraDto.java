package com.resa.api.model.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.resa.api.model.Extra;

import lombok.Data;

@Data
public class ExtraDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private String name;
    private BigDecimal price;
    private Integer travel_id;

    public ExtraDto (Extra e) {
        this.id = e.getId();

        this.created_at = e.getCreatedAt();
        this.updated_at = e.getUpdatedAt();

        this.name = e.getName();
        this.price = e.getPrice();

        this.travel_id = e.getTravel().getId();
    }
}
