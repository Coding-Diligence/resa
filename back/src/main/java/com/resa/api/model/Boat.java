package com.resa.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.EqualsAndHashCode;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "boat")
@EqualsAndHashCode(callSuper = true)
public class Boat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(name = "place_human_and_pet", nullable = false)
    private Integer placeHumanAndPet;

    @Column(nullable = false)
    private Integer cabins;

    @Column(name = "place_freight", nullable = false)
    private Integer placeFreight;

    @Column(nullable = false)
    private String port;

    @OneToMany(mappedBy = "boat")
    private List<Travel> travels;
} 