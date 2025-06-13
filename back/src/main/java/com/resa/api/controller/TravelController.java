package com.resa.api.controller;

import com.resa.api.model.Travel;
import com.resa.api.model.dto.TravelDto;
import com.resa.api.service.TravelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/travels")
@Tag(name = "Travel Management", description = "APIs for managing travels")
public class TravelController {

    @Autowired
    private TravelService travelService;

    @GetMapping
    @Operation(summary = "Get all travels", description = "Retrieves a list of all travels")
    public List<TravelDto> getAllTravels() {
        return travelService.getAllTravels().stream()
                .map(TravelDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get travel by ID", description = "Retrieves a travel by its ID")
    public TravelDto getTravelById(@PathVariable Integer id) {
        return new TravelDto(travelService.getTravelById(id));
    }

    @GetMapping("/departure-port/{port}")
    @Operation(summary = "Get travels by departure port", description = "Retrieves a list of travels from the specified port")
    public List<TravelDto> getTravelsByDeparturePort(@PathVariable String port) {
        return travelService.getTravelsByDeparturePort(port).stream()
                .map(TravelDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/arrival-port/{port}")
    @Operation(summary = "Get travels by arrival port", description = "Retrieves a list of travels to the specified port")
    public List<TravelDto> getTravelsByArrivalPort(@PathVariable String port) {
        return travelService.getTravelsByArrivalPort(port).stream()
                .map(TravelDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/date-range")
    @Operation(summary = "Get travels by date range", description = "Retrieves a list of travels within the specified date range")
    public List<TravelDto> getTravelsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return travelService.getTravelsByDateRange(startDate, endDate).stream()
                .map(TravelDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/boat/{boatId}")
    @Operation(summary = "Get travels by boat", description = "Retrieves a list of travels for the specified boat")
    public List<TravelDto> getTravelsByBoat(@PathVariable Integer boatId) {
        return travelService.getTravelsByBoat(boatId).stream()
                .map(TravelDto::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    @Operation(summary = "Create travel", description = "Creates a new travel")
    public TravelDto createTravel(@Valid @RequestBody Travel travel) {
        return new TravelDto(travelService.createTravel(travel));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update travel", description = "Updates an existing travel's information")
    public TravelDto updateTravel(@PathVariable Integer id, @Valid @RequestBody Travel travel) {
        return new TravelDto(travelService.updateTravel(id, travel));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete travel", description = "Deletes a travel")
    public ResponseEntity<?> deleteTravel(@PathVariable Integer id) {
        travelService.deleteTravel(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search-round")
    @Operation(summary = "Search for round trip travels", description = "Search by ports and dates, return nearest if no exact match.")
    public ResponseEntity<?> searchRoundTrip(
            @RequestParam String departurePort,
            @RequestParam String arrivalPort,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime departureDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime returnDate
    ) {
        Travel departureTravel = travelService.findClosestTravel(departureDate, departurePort, arrivalPort);

        Travel returnTravel = null;
        if (returnDate != null) {
            returnTravel = travelService.findClosestTravel(returnDate, arrivalPort, departurePort);
        }

        return ResponseEntity.ok(
                Map.of("departure", departureTravel, "return", returnTravel)
        );
    }


}
