package com.resa.api.service;

import com.resa.api.model.Boat;
import com.resa.api.repository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BoatService {

    @Autowired
    private BoatRepository boatRepository;

    public List<Boat> getAllBoats() {
        return boatRepository.findAll();
    }

    public Optional<Boat> getBoatById(Integer id) {
        return boatRepository.findById(id);
    }

    public List<Boat> getAvailableBoats() {
        return boatRepository.findByTravelsIsEmpty();
    }

    public List<Boat> getBoatsByPort(String port) {
        return boatRepository.findByPort(port);
    }

    public List<Boat> getAvailableBoatsByPort(String port) {
        return boatRepository.findByPortAndTravelsIsEmpty(port);
    }

    @Transactional
    public Boat createBoat(Boat boat) {
        return boatRepository.save(boat);
    }

    @Transactional
    public Boat updateBoat(Integer id, Boat boatDetails) {
        Boat boat = boatRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Boat not found"));

        boat.setName(boatDetails.getName());
        boat.setPlaceHumanAndPet(boatDetails.getPlaceHumanAndPet());
        boat.setCabins(boatDetails.getCabins());
        boat.setPlaceFreight(boatDetails.getPlaceFreight());
        boat.setPort(boatDetails.getPort());

        return boatRepository.save(boat);
    }

    @Transactional
    public void deleteBoat(Integer id) {
        if (!boatRepository.existsById(id)) {
            throw new IllegalArgumentException("Boat not found");
        }
        boatRepository.deleteById(id);
    }
} 