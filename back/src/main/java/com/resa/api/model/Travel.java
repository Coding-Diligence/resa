package com.resa.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @NotNull(message = "La date de départ est obligatoire")
    @Future(message = "La date de départ doit être dans le futur")
    @Column(name = "departure_time", nullable = false)
    private LocalDateTime departureTime;

    @NotNull(message = "La date d'arrivée est obligatoire")
    @Future(message = "La date d'arrivée doit être dans le futur")
    @Column(name = "arrival_time", nullable = false)
    private LocalDateTime arrivalTime;

    @NotBlank(message = "Le port de départ est obligatoire")
    @Size(min = 2, max = 100, message = "Le port de départ doit contenir entre 2 et 100 caractères")
    @Column(name = "departure_port", nullable = false)
    private String departurePort;

    @NotBlank(message = "Le port d'arrivée est obligatoire")
    @Size(min = 2, max = 100, message = "Le port d'arrivée doit contenir entre 2 et 100 caractères")
    @Column(name = "arrival_port", nullable = false)
    private String arrivalPort;

    @NotNull(message = "Le prix pour une personne est obligatoire")
    @DecimalMin(value = "0.0", inclusive = false, message = "Le prix pour une personne doit être supérieur à 0")
    @Column(name = "price_human", nullable = false)
    private BigDecimal priceHuman;

    @NotNull(message = "Le prix pour un véhicule est obligatoire")
    @DecimalMin(value = "0.0", inclusive = false, message = "Le prix pour un véhicule doit être supérieur à 0")
    @Column(name = "price_vehicle", nullable = false)
    private BigDecimal priceVehicle;

    @NotNull(message = "Le bateau est obligatoire")
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