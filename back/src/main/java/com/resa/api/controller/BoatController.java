package com.resa.api.controller;

import com.resa.api.model.Boat;
import com.resa.api.model.dto.BoatDto;
import com.resa.api.service.BoatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/boats")
@Tag(name = "Boat Management", description = "APIs for managing boats")
public class BoatController {

    @Autowired
    private BoatService boatService;

    @GetMapping
    @Operation(summary = "Get all boats", description = "Retrieves a list of all boats")
    public List<BoatDto> getAllBoats() {
        return boatService.getAllBoats().stream()
                .map(BoatDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get boat by ID", description = "Retrieves a boat by its ID")
    public BoatDto getBoatById(@PathVariable Integer id) {
        return new BoatDto(boatService.getBoatById(id));
    }

    @GetMapping("/available")
    @Operation(summary = "Get available boats", description = "Retrieves a list of boats that are not assigned to any travel")
    public List<BoatDto> getAvailableBoats() {
        return boatService.getAvailableBoats().stream()
                .map(BoatDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/departure-port/{port}")
    @Operation(summary = "Get boats by departure port", description = "Retrieves a list of boats that have travels from the specified port")
    public List<BoatDto> getBoatsByDeparturePort(@PathVariable String port) {
        return boatService.getBoatsByDeparturePort(port).stream()
                .map(BoatDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/arrival-port/{port}")
    @Operation(summary = "Get boats by arrival port", description = "Retrieves a list of boats that have travels to the specified port")
    public List<BoatDto> getBoatsByArrivalPort(@PathVariable String port) {
        return boatService.getBoatsByArrivalPort(port).stream()
                .map(BoatDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/available/departure-port/{port}")
    @Operation(summary = "Get available boats by departure port", description = "Retrieves a list of available boats that have travels from the specified port")
    public List<BoatDto> getAvailableBoatsByDeparturePort(@PathVariable String port) {
        return boatService.getAvailableBoatsByDeparturePort(port).stream()
                .map(BoatDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/available/arrival-port/{port}")
    @Operation(summary = "Get available boats by arrival port", description = "Retrieves a list of available boats that have travels to the specified port")
    public List<BoatDto> getAvailableBoatsByArrivalPort(@PathVariable String port) {
        return boatService.getAvailableBoatsByArrivalPort(port).stream()
                .map(BoatDto::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    @Operation(summary = "Create boat", description = "Creates a new boat")
    public BoatDto createBoat(@RequestBody Boat boat) {
        return new BoatDto(boatService.createBoat(boat));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update boat", description = "Updates an existing boat's information")
    public BoatDto updateBoat(@PathVariable Integer id, @RequestBody Boat boatDetails) {
        return new BoatDto(boatService.updateBoat(id, boatDetails));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete boat", description = "Deletes a boat")
    public ResponseEntity<?> deleteBoat(@PathVariable Integer id) {
        boatService.deleteBoat(id);
        return ResponseEntity.ok().build();
    }
}
