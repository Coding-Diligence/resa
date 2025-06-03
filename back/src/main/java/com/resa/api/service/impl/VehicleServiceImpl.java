package com.resa.api.service.impl;

import com.resa.api.model.Vehicle;
import com.resa.api.repository.VehicleRepository;
import com.resa.api.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public List<Vehicle> getVehiclesByUserId(Integer userId) {
        return vehicleRepository.findByUserId(userId);
    }

    @Override
    public Vehicle getVehicleById(Integer id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
    }

    @Override
    public Vehicle createVehicle(Vehicle vehicle) {
        if (vehicleRepository.existsByRegistration(vehicle.getRegistration())) {
            throw new RuntimeException("Vehicle with registration " + vehicle.getRegistration() + " already exists");
        }
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(Integer id, Vehicle vehicleDetails) {
        Vehicle vehicle = getVehicleById(id);
        
        // Vérifier si la nouvelle immatriculation existe déjà pour un autre véhicule
        if (!vehicle.getRegistration().equals(vehicleDetails.getRegistration()) &&
            vehicleRepository.existsByRegistration(vehicleDetails.getRegistration())) {
            throw new RuntimeException("Vehicle with registration " + vehicleDetails.getRegistration() + " already exists");
        }

        vehicle.setRegistration(vehicleDetails.getRegistration());
        vehicle.setType(vehicleDetails.getType());
        vehicle.setUser(vehicleDetails.getUser());
        
        return vehicleRepository.save(vehicle);
    }

    @Override
    public void deleteVehicle(Integer id) {
        Vehicle vehicle = getVehicleById(id);
        vehicleRepository.delete(vehicle);
    }
} 