package com.resa.api.repository;

import com.resa.api.model.InvoiceExtra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceExtraRepository extends JpaRepository<InvoiceExtra, Integer> {
} 