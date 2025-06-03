package com.resa.api.controller;

import com.resa.api.model.InvoiceExtra;
import com.resa.api.service.InvoiceExtraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoice-extra")
public class InvoiceExtraController {

    @Autowired
    private InvoiceExtraService invoiceExtraService;

    @GetMapping
    public List<InvoiceExtra> getAllInvoiceExtras() {
        return invoiceExtraService.getAllInvoiceExtras();
    }

    @GetMapping("/{id}")
    public InvoiceExtra getInvoiceExtraById(@PathVariable Integer id) {
        return invoiceExtraService.getInvoiceExtraById(id);
    }

    @PostMapping
    public InvoiceExtra createInvoiceExtra(@Valid @RequestBody InvoiceExtra invoiceExtra) {
        return invoiceExtraService.createInvoiceExtra(invoiceExtra);
    }

    @PutMapping("/{id}")
    public InvoiceExtra updateInvoiceExtra(@PathVariable Integer id, @Valid @RequestBody InvoiceExtra invoiceExtra) {
        return invoiceExtraService.updateInvoiceExtra(id, invoiceExtra);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoiceExtra(@PathVariable Integer id) {
        invoiceExtraService.deleteInvoiceExtra(id);
        return ResponseEntity.ok().build();
    }
} 