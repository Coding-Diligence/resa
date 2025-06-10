package com.resa.api.service;

import com.resa.api.model.InvoiceExtra;
import com.resa.api.repository.InvoiceExtraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvoiceExtraService {

    @Autowired
    private InvoiceExtraRepository invoiceExtraRepository;

    public List<InvoiceExtra> getAllInvoiceExtras() {
        return invoiceExtraRepository.findAll();
    }

    public InvoiceExtra getInvoiceExtraById(Integer id) {
        return invoiceExtraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("InvoiceExtra not found with id: " + id));
    }

    public InvoiceExtra createInvoiceExtra(InvoiceExtra invoiceExtra) {
        invoiceExtra.setCreatedAt(LocalDateTime.now());
        invoiceExtra.setUpdatedAt(LocalDateTime.now());
        return invoiceExtraRepository.save(invoiceExtra);
    }

    public InvoiceExtra updateInvoiceExtra(Integer id, InvoiceExtra invoiceExtraDetails) {
        InvoiceExtra invoiceExtra = getInvoiceExtraById(id);
        
        invoiceExtra.setInvoice(invoiceExtraDetails.getInvoice());
        invoiceExtra.setExtra(invoiceExtraDetails.getExtra());
        invoiceExtra.setUpdatedAt(LocalDateTime.now());
        
        return invoiceExtraRepository.save(invoiceExtra);
    }

    public void deleteInvoiceExtra(Integer id) {
        InvoiceExtra invoiceExtra = getInvoiceExtraById(id);
        invoiceExtraRepository.delete(invoiceExtra);
    }
} 