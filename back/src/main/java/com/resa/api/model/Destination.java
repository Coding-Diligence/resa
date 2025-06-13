package com.resa.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "destinations")
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String departurePort;

    private String arrivalPort;

    // Exemples si besoin
    private String countryFrom;
    private String countryTo;

    // Constructeurs
    public Destination() {}

    public Destination(String departurePort, String arrivalPort, String countryFrom, String countryTo) {
        this.departurePort = departurePort;
        this.arrivalPort = arrivalPort;
        this.countryFrom = countryFrom;
        this.countryTo = countryTo;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public String getDeparturePort() {
        return departurePort;
    }

    public void setDeparturePort(String departurePort) {
        this.departurePort = departurePort;
    }

    public String getArrivalPort() {
        return arrivalPort;
    }

    public void setArrivalPort(String arrivalPort) {
        this.arrivalPort = arrivalPort;
    }

    public String getCountryFrom() {
        return countryFrom;
    }

    public void setCountryFrom(String countryFrom) {
        this.countryFrom = countryFrom;
    }

    public String getCountryTo() {
        return countryTo;
    }

    public void setCountryTo(String countryTo) {
        this.countryTo = countryTo;
    }
}
