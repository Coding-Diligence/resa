package com.resa.api.repository;

import com.resa.api.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    List<Invoice> findByUserId(Integer userId);
    List<Invoice> findByTravelId(Integer travelId);
} 