package com.resa.api.controller;

import com.resa.api.model.Invoice;
import com.resa.api.model.Extra;
import com.resa.api.model.dto.InvoiceDto;
import com.resa.api.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public List<InvoiceDto> getAllInvoices() {
        return invoiceService.getAllInvoices().stream()
                .map(InvoiceDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public InvoiceDto getInvoiceById(@PathVariable Integer id) {
        return new InvoiceDto(invoiceService.getInvoiceById(id));
    }

    @GetMapping("/user/{userId}")
    public List<InvoiceDto> getInvoicesByUserId(@PathVariable Integer userId) {
        return invoiceService.getInvoicesByUserId(userId).stream()
                .map(InvoiceDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/travel/{travelId}")
    public List<InvoiceDto> getInvoicesByTravelId(@PathVariable Integer travelId) {
        return invoiceService.getInvoicesByTravelId(travelId).stream()
                .map(InvoiceDto::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    public InvoiceDto createInvoice(@Valid @RequestBody Invoice invoice) {
        return new InvoiceDto(invoiceService.createInvoice(invoice));
    }

    @PutMapping("/{id}")
    public InvoiceDto updateInvoice(@PathVariable Integer id, @Valid @RequestBody Invoice invoice) {
        return new InvoiceDto(invoiceService.updateInvoice(id, invoice));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable Integer id) {
        invoiceService.deleteInvoice(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{invoiceId}/extras")
    public InvoiceDto addExtraToInvoice(@PathVariable Integer invoiceId, @Valid @RequestBody Extra extra) {
        return new InvoiceDto(invoiceService.addExtraToInvoice(invoiceId, extra));
    }

    @DeleteMapping("/{invoiceId}/extras/{extraId}")
    public ResponseEntity<?> removeExtraFromInvoice(@PathVariable Integer invoiceId, @PathVariable Integer extraId) {
        invoiceService.removeExtraFromInvoice(invoiceId, extraId);
        return ResponseEntity.ok().build();
    }
} 