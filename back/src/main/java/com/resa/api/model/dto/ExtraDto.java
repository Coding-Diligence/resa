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
    private Integer quantity;
    private Integer travel_id;

    public ExtraDto(Extra extra) {
        this.id = extra.getId();
        this.created_at = extra.getCreatedAt();
        this.updated_at = extra.getUpdatedAt();
        this.name = extra.getName();
        this.price = extra.getPrice();
        this.quantity = extra.getQuantity();
        this.travel_id = extra.getTravel().getId();
    }
}
