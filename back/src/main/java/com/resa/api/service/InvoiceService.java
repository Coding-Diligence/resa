package com.resa.api.service;

import com.resa.api.model.Invoice;
import com.resa.api.model.Extra;
import java.util.List;

public interface InvoiceService {
    List<Invoice> getAllInvoices();
    Invoice getInvoiceById(Integer id);
    List<Invoice> getInvoicesByUserId(Integer userId);
    List<Invoice> getInvoicesByTravelId(Integer travelId);
    Invoice createInvoice(Invoice invoice);
    Invoice updateInvoice(Integer id, Invoice invoice);
    void deleteInvoice(Integer id);
    Invoice addExtraToInvoice(Integer invoiceId, Extra extra);
    void removeExtraFromInvoice(Integer invoiceId, Integer extraId);
} 