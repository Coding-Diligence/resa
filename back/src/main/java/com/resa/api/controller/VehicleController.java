package com.resa.api.controller;

import com.resa.api.model.Vehicle;
import com.resa.api.model.dto.VehicleDto;
import com.resa.api.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public List<VehicleDto> getAllVehicles() {
        return vehicleService.getAllVehicles().stream()
                .map(VehicleDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user/{userId}")
    public List<VehicleDto> getVehiclesByUserId(@PathVariable Integer userId) {
        return vehicleService.getVehiclesByUserId(userId).stream()
                .map(VehicleDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public VehicleDto getVehicleById(@PathVariable Integer id) {
        return new VehicleDto(vehicleService.getVehicleById(id));
    }

    @PostMapping
    public VehicleDto createVehicle(@Valid @RequestBody Vehicle vehicle) {
        return new VehicleDto(vehicleService.createVehicle(vehicle));
    }

    @PutMapping("/{id}")
    public VehicleDto updateVehicle(@PathVariable Integer id, @Valid @RequestBody Vehicle vehicle) {
        return new VehicleDto(vehicleService.updateVehicle(id, vehicle));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable Integer id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok().build();
    }
}
