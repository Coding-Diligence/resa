package com.resa.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "boat")
public class Boat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotNull
    @Positive
    @Column(name = "place_human_and_pet", nullable = false)
    private Integer placeHumanAndPet;

    @NotNull
    @Positive
    @Column(nullable = false)
    private Integer cabins;

    @NotNull
    @Positive
    @Column(name = "place_freight", nullable = false)
    private Integer placeFreight;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "boat")
    private List<Travel> travels;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPlaceHumanAndPet() {
        return placeHumanAndPet;
    }

    public void setPlaceHumanAndPet(Integer placeHumanAndPet) {
        this.placeHumanAndPet = placeHumanAndPet;
    }

    public Integer getCabins() {
        return cabins;
    }

    public void setCabins(Integer cabins) {
        this.cabins = cabins;
    }

    public Integer getPlaceFreight() {
        return placeFreight;
    }

    public void setPlaceFreight(Integer placeFreight) {
        this.placeFreight = placeFreight;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Travel> getTravels() {
        return travels;
    }

    public void setTravels(List<Travel> travels) {
        this.travels = travels;
    }
} 