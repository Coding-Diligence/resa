package com.resa.api.model.dto;

import java.time.LocalDateTime;

import com.resa.api.model.Invoice;

import lombok.Data;

@Data
public class InvoiceDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private Integer travel_id;
    private Integer user_id;

    public InvoiceDto (Invoice i) {
        this.id = i.getId();

        this.created_at = i.getCreatedAt();
        this.updated_at = i.getUpdatedAt();

        this.travel_id = i.getTravel().getId();
        this.user_id = i.getUser().getId();
    }
}
