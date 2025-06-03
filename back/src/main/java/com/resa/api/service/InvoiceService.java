package com.resa.api.service;

import com.resa.api.model.Invoice;
import com.resa.api.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Integer id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
    }

    public Invoice createInvoice(Invoice invoice) {
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setUpdatedAt(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Integer id, Invoice invoiceDetails) {
        Invoice invoice = getInvoiceById(id);
        
        invoice.setTravel(invoiceDetails.getTravel());
        invoice.setUser(invoiceDetails.getUser());
        invoice.setInvoiceExtras(invoiceDetails.getInvoiceExtras());
        invoice.setUpdatedAt(LocalDateTime.now());
        
        return invoiceRepository.save(invoice);
    }

    public void deleteInvoice(Integer id) {
        Invoice invoice = getInvoiceById(id);
        invoiceRepository.delete(invoice);
    }
} 