package com.resa.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "extra")
@EqualsAndHashCode(callSuper = true)
public class Extra extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "travel_id", nullable = false)
    private Travel travel;

    @OneToMany(mappedBy = "extra")
    private List<InvoiceExtra> invoiceExtras;
} 