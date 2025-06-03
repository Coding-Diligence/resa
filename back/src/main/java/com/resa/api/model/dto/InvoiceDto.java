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

    public InvoiceDto (Invoice invoice) {
        this.id = invoice.getId();

        this.created_at = invoice.getCreatedAt();
        this.updated_at = invoice.getUpdatedAt();
    }
}
