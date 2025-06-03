package com.resa.api.controller;

import com.resa.api.model.Travel;
import com.resa.api.service.TravelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/travels")
@Tag(name = "Travel Management", description = "APIs for managing travels")
public class TravelController {

    @Autowired
    private TravelService travelService;

    @GetMapping
    @Operation(summary = "Get all travels", description = "Retrieves a list of all travels")
    public List<Travel> getAllTravels() {
        return travelService.getAllTravels();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get travel by ID", description = "Retrieves a travel by its ID")
    public Travel getTravelById(@PathVariable Integer id) {
        return travelService.getTravelById(id);
    }

    @GetMapping("/departure-port/{port}")
    @Operation(summary = "Get travels by departure port", description = "Retrieves a list of travels from the specified port")
    public List<Travel> getTravelsByDeparturePort(@PathVariable String port) {
        return travelService.getTravelsByDeparturePort(port);
    }

    @GetMapping("/arrival-port/{port}")
    @Operation(summary = "Get travels by arrival port", description = "Retrieves a list of travels to the specified port")
    public List<Travel> getTravelsByArrivalPort(@PathVariable String port) {
        return travelService.getTravelsByArrivalPort(port);
    }

    @GetMapping("/date-range")
    @Operation(summary = "Get travels by date range", description = "Retrieves a list of travels within the specified date range")
    public List<Travel> getTravelsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return travelService.getTravelsByDateRange(startDate, endDate);
    }

    @GetMapping("/boat/{boatId}")
    @Operation(summary = "Get travels by boat", description = "Retrieves a list of travels for the specified boat")
    public List<Travel> getTravelsByBoat(@PathVariable Integer boatId) {
        return travelService.getTravelsByBoat(boatId);
    }

    @PostMapping
    @Operation(summary = "Create travel", description = "Creates a new travel")
    public Travel createTravel(@Valid @RequestBody Travel travel) {
        return travelService.createTravel(travel);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update travel", description = "Updates an existing travel's information")
    public Travel updateTravel(@PathVariable Integer id, @Valid @RequestBody Travel travel) {
        return travelService.updateTravel(id, travel);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete travel", description = "Deletes a travel")
    public ResponseEntity<?> deleteTravel(@PathVariable Integer id) {
        travelService.deleteTravel(id);
        return ResponseEntity.ok().build();
    }
}
