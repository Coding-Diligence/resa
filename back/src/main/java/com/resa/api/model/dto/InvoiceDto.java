package com.resa.api.model.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.resa.api.model.Invoice;

import lombok.Data;

@Data
public class InvoiceDto {
    private Integer id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private Integer travel_id;
    private Integer user_id;
    private List<InvoiceExtraDto> invoice_extras;

    public InvoiceDto(Invoice invoice) {
        this.id = invoice.getId();
        this.created_at = invoice.getCreatedAt();
        this.updated_at = invoice.getUpdatedAt();
        this.travel_id = invoice.getTravel().getId();
        this.user_id = invoice.getUser().getId();
        this.invoice_extras = invoice.getInvoiceExtras().stream()
                .map(InvoiceExtraDto::new)
                .collect(Collectors.toList());
    }
}
