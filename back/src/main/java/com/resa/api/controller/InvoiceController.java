package com.resa.api.controller;

import com.resa.api.model.Invoice;
import com.resa.api.model.Extra;
import com.resa.api.service.InvoiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")

public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/{id}")
    public Invoice getInvoiceById(@PathVariable Integer id) {
        return invoiceService.getInvoiceById(id);
    }

    @PostMapping
    public Invoice createInvoice(@Valid @RequestBody Invoice invoice) {
        return invoiceService.createInvoice(invoice);
    }

    @PutMapping("/{id}")
    public Invoice updateInvoice(@PathVariable Integer id, @Valid @RequestBody Invoice invoice) {
        return invoiceService.updateInvoice(id, invoice);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable Integer id) {
        invoiceService.deleteInvoice(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{invoiceId}/extras")
    public Invoice addExtraToInvoice(@PathVariable Integer invoiceId, @Valid @RequestBody Extra extra) {
        return invoiceService.addExtraToInvoice(invoiceId, extra);
    }

    @DeleteMapping("/{invoiceId}/extras/{extraId}")
    public ResponseEntity<?> removeExtraFromInvoice(@PathVariable Integer invoiceId, @PathVariable Integer extraId) {
        invoiceService.removeExtraFromInvoice(invoiceId, extraId);
        return ResponseEntity.ok().build();
    }
} 