package com.resa.api.service.impl;

import com.resa.api.model.Invoice;
import com.resa.api.model.Extra;
import com.resa.api.model.InvoiceExtra;
import com.resa.api.repository.InvoiceRepository;
import com.resa.api.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @Override
    public Invoice getInvoiceById(Integer id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
    }

    @Override
    public List<Invoice> getInvoicesByUserId(Integer userId) {
        return invoiceRepository.findByUserId(userId);
    }

    @Override
    public List<Invoice> getInvoicesByTravelId(Integer travelId) {
        return invoiceRepository.findByTravelId(travelId);
    }

    @Override
    public Invoice createInvoice(Invoice invoice) {
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setUpdatedAt(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    @Override
    public Invoice updateInvoice(Integer id, Invoice invoiceDetails) {
        Invoice invoice = getInvoiceById(id);
        invoice.setTravel(invoiceDetails.getTravel());
        invoice.setUser(invoiceDetails.getUser());
        invoice.setUpdatedAt(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    @Override
    public void deleteInvoice(Integer id) {
        Invoice invoice = getInvoiceById(id);
        invoiceRepository.delete(invoice);
    }

    @Override
    public Invoice addExtraToInvoice(Integer invoiceId, Extra extra) {
        Invoice invoice = getInvoiceById(invoiceId);
        InvoiceExtra invoiceExtra = new InvoiceExtra();
        invoiceExtra.setInvoice(invoice);
        invoiceExtra.setExtra(extra);
        invoiceExtra.setPrice(extra.getPrice());
        invoiceExtra.setQuantity(extra.getQuantity());
        invoice.getInvoiceExtras().add(invoiceExtra);
        invoice.setUpdatedAt(LocalDateTime.now());
        return invoiceRepository.save(invoice);
    }

    @Override
    public void removeExtraFromInvoice(Integer invoiceId, Integer extraId) {
        Invoice invoice = getInvoiceById(invoiceId);
        InvoiceExtra invoiceExtra = invoice.getInvoiceExtras().stream()
                .filter(ie -> ie.getExtra().getId().equals(extraId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Extra not found in invoice with id: " + invoiceId));
        invoice.getInvoiceExtras().remove(invoiceExtra);
        invoice.setUpdatedAt(LocalDateTime.now());
        invoiceRepository.save(invoice);
    }
} 