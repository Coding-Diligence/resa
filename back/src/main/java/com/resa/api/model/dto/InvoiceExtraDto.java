package com.resa.api.model.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.resa.api.model.InvoiceExtra;

import lombok.Data;

@Data
public class InvoiceExtraDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private Integer invoice_id;
    private Integer extra_id;
    private BigDecimal price;
    private Integer quantity;

    public InvoiceExtraDto(InvoiceExtra invoiceExtra) {
        this.id = invoiceExtra.getId();
        this.created_at = invoiceExtra.getCreatedAt();
        this.updated_at = invoiceExtra.getUpdatedAt();
        this.invoice_id = invoiceExtra.getInvoice().getId();
        this.extra_id = invoiceExtra.getExtra().getId();
        this.price = invoiceExtra.getPrice();
        this.quantity = invoiceExtra.getQuantity();
    }
} 