package com.resa.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "boat")
public class Boat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;
} 