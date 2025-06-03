package com.resa.api.controller;

import com.resa.api.model.Travel;
import com.resa.api.service.TravelService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travel")
public class TravelController {

    @Autowired
    private TravelService travelService;

    @GetMapping
    public List<Travel> getAllTravels() {
        return travelService.getAllTravels();
    }

    @GetMapping("/{id}")
    public Travel getTravelById(@PathVariable Integer id) {
        return travelService.getTravelById(id);
    }

    @PostMapping
    public Travel createTravel(@Valid @RequestBody Travel travel) {
        return travelService.createTravel(travel);
    }

    @PutMapping("/{id}")
    public Travel updateTravel(@PathVariable Integer id, @Valid @RequestBody Travel travel) {
        return travelService.updateTravel(id, travel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTravel(@PathVariable Integer id) {
        travelService.deleteTravel(id);
        return ResponseEntity.ok().build();
    }
}
