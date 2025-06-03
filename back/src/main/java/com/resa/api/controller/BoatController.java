package com.resa.api.controller;

import com.resa.api.model.Boat;
import com.resa.api.service.BoatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boats")
@Tag(name = "Boat Management", description = "APIs for managing boats")
public class BoatController {

    @Autowired
    private BoatService boatService;

    @GetMapping
    @Operation(summary = "Get all boats", description = "Retrieves a list of all boats")
    public List<Boat> getAllBoats() {
        return boatService.getAllBoats();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get boat by ID", description = "Retrieves a boat by its ID")
    public Boat getBoatById(@PathVariable Integer id) {
        return boatService.getBoatById(id);
    }

    @GetMapping("/available")
    @Operation(summary = "Get available boats", description = "Retrieves a list of boats that are not assigned to any travel")
    public List<Boat> getAvailableBoats() {
        return boatService.getAvailableBoats();
    }

    @GetMapping("/departure-port/{port}")
    @Operation(summary = "Get boats by departure port", description = "Retrieves a list of boats that have travels from the specified port")
    public List<Boat> getBoatsByDeparturePort(@PathVariable String port) {
        return boatService.getBoatsByDeparturePort(port);
    }

    @GetMapping("/arrival-port/{port}")
    @Operation(summary = "Get boats by arrival port", description = "Retrieves a list of boats that have travels to the specified port")
    public List<Boat> getBoatsByArrivalPort(@PathVariable String port) {
        return boatService.getBoatsByArrivalPort(port);
    }

    @GetMapping("/available/departure-port/{port}")
    @Operation(summary = "Get available boats by departure port", description = "Retrieves a list of available boats that have travels from the specified port")
    public List<Boat> getAvailableBoatsByDeparturePort(@PathVariable String port) {
        return boatService.getAvailableBoatsByDeparturePort(port);
    }

    @GetMapping("/available/arrival-port/{port}")
    @Operation(summary = "Get available boats by arrival port", description = "Retrieves a list of available boats that have travels to the specified port")
    public List<Boat> getAvailableBoatsByArrivalPort(@PathVariable String port) {
        return boatService.getAvailableBoatsByArrivalPort(port);
    }

    @PostMapping
    @Operation(summary = "Create boat", description = "Creates a new boat")
    public Boat createBoat(@RequestBody Boat boat) {
        return boatService.createBoat(boat);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update boat", description = "Updates an existing boat's information")
    public Boat updateBoat(@PathVariable Integer id, @RequestBody Boat boatDetails) {
        return boatService.updateBoat(id, boatDetails);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete boat", description = "Deletes a boat")
    public ResponseEntity<?> deleteBoat(@PathVariable Integer id) {
        boatService.deleteBoat(id);
        return ResponseEntity.ok().build();
    }
}
