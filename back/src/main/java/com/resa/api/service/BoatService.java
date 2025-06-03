package com.resa.api.service;

import com.resa.api.model.Boat;
import com.resa.api.repository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BoatService {

    @Autowired
    private BoatRepository boatRepository;

    public List<Boat> getAllBoats() {
        return boatRepository.findAll();
    }

    public Boat getBoatById(Integer id) {
        return boatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Boat not found with id: " + id));
    }

    public List<Boat> getAvailableBoats() {
        return boatRepository.findByTravelsIsEmpty();
    }

    public List<Boat> getBoatsByDeparturePort(String port) {
        return boatRepository.findByTravelsDeparturePort(port);
    }

    public List<Boat> getBoatsByArrivalPort(String port) {
        return boatRepository.findByTravelsArrivalPort(port);
    }

    public List<Boat> getAvailableBoatsByDeparturePort(String port) {
        return boatRepository.findByTravelsDeparturePortAndTravelsIsEmpty(port);
    }

    public List<Boat> getAvailableBoatsByArrivalPort(String port) {
        return boatRepository.findByTravelsArrivalPortAndTravelsIsEmpty(port);
    }

    @Transactional
    public Boat createBoat(Boat boat) {
        boat.setCreatedAt(LocalDateTime.now());
        boat.setUpdatedAt(LocalDateTime.now());
        return boatRepository.save(boat);
    }

    @Transactional
    public Boat updateBoat(Integer id, Boat boatDetails) {
        Boat boat = getBoatById(id);
        
        boat.setName(boatDetails.getName());
        boat.setPlaceHumanAndPet(boatDetails.getPlaceHumanAndPet());
        boat.setCabins(boatDetails.getCabins());
        boat.setPlaceFreight(boatDetails.getPlaceFreight());
        boat.setUpdatedAt(LocalDateTime.now());
        
        return boatRepository.save(boat);
    }

    @Transactional
    public void deleteBoat(Integer id) {
        Boat boat = getBoatById(id);
        boatRepository.delete(boat);
    }
} 