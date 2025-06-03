package com.resa.api.service;

import com.resa.api.model.Vehicle;
import java.util.List;

public interface VehicleService {
    List<Vehicle> getAllVehicles();
    List<Vehicle> getVehiclesByUserId(Integer userId);
    Vehicle getVehicleById(Integer id);
    Vehicle createVehicle(Vehicle vehicle);
    Vehicle updateVehicle(Integer id, Vehicle vehicle);
    void deleteVehicle(Integer id);
} 