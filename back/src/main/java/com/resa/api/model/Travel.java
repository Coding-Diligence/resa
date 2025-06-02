package com.resa.api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "travel")
@EqualsAndHashCode(callSuper = true)
public class Travel extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Integer id;

    @Column(name = "departure_time", nullable = false)
    private LocalDateTime departureTime;

    @Column(name = "arrival_time", nullable = false)
    private LocalDateTime arrivalTime;

    @Column(name = "departure_port", nullable = false)
    private String departurePort;

    @Column(name = "arrival_port", nullable = false)
    private String arrivalPort;

    @Column(name = "price_human", nullable = false)
    private BigDecimal priceHuman;

    @Column(name = "price_vehicle", nullable = false)
    private BigDecimal priceVehicle;

    @ManyToOne
    @JoinColumn(name = "boat_id", nullable = false)
    private Boat boat;

    @OneToMany(mappedBy = "travel")
    private List<Extra> extras;

    @OneToMany(mappedBy = "travel")
    private List<Invoice> invoices;

    @ManyToMany(mappedBy = "travels")
    private List<User> users;

    @ManyToMany(mappedBy = "travels")
    private List<Vehicle> vehicles;
} 