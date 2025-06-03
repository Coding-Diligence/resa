package com.resa.api.service.impl;

import com.resa.api.model.Travel;
import com.resa.api.repository.TravelRepository;
import com.resa.api.service.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TravelServiceImpl implements TravelService {

    @Autowired
    private TravelRepository travelRepository;

    @Override
    public List<Travel> getAllTravels() {
        return travelRepository.findAll();
    }

    @Override
    public Travel getTravelById(Integer id) {
        return travelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Travel not found with id: " + id));
    }

    @Override
    public Travel createTravel(Travel travel) {
        return travelRepository.save(travel);
    }

    @Override
    public Travel updateTravel(Integer id, Travel travelDetails) {
        Travel travel = getTravelById(id);
        travel.setDepartureTime(travelDetails.getDepartureTime());
        travel.setArrivalTime(travelDetails.getArrivalTime());
        travel.setDeparturePort(travelDetails.getDeparturePort());
        travel.setArrivalPort(travelDetails.getArrivalPort());
        travel.setPriceHuman(travelDetails.getPriceHuman());
        travel.setPriceVehicle(travelDetails.getPriceVehicle());
        travel.setBoat(travelDetails.getBoat());
        return travelRepository.save(travel);
    }

    @Override
    public void deleteTravel(Integer id) {
        Travel travel = getTravelById(id);
        travelRepository.delete(travel);
    }

    @Override
    public List<Travel> getTravelsByDeparturePort(String port) {
        return travelRepository.findByDeparturePort(port);
    }

    @Override
    public List<Travel> getTravelsByArrivalPort(String port) {
        return travelRepository.findByArrivalPort(port);
    }

    @Override
    public List<Travel> getTravelsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return travelRepository.findByDepartureTimeBetween(startDate, endDate);
    }

    @Override
    public List<Travel> getTravelsByBoat(Integer boatId) {
        return travelRepository.findByBoatId(boatId);
    }
}