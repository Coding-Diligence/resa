package com.resa.api.controller;

import com.resa.api.model.Boat;
import com.resa.api.service.BoatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boats")
@CrossOrigin(origins = "*")
public class BoatController {

    @Autowired
    private BoatService boatService;

    @GetMapping
    public List<Boat> getAllBoats() {
        return boatService.getAllBoats();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Boat> getBoatById(@PathVariable Integer id) {
        return boatService.getBoatById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/port/{port}")
    public List<Boat> getBoatsByPort(@PathVariable String port) {
        return boatService.getBoatsByPort(port);
    }

    @GetMapping("/available")
    public List<Boat> getAvailableBoats() {
        return boatService.getAvailableBoats();
    }

    @GetMapping("/port/{port}/available")
    public List<Boat> getAvailableBoatsByPort(@PathVariable String port) {
        return boatService.getAvailableBoatsByPort(port);
    }

    @PostMapping
    public ResponseEntity<Boat> createBoat(@RequestBody Boat boat) {
        try {
            Boat createdBoat = boatService.createBoat(boat);
            return ResponseEntity.ok(createdBoat);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boat> updateBoat(@PathVariable Integer id, @RequestBody Boat boatDetails) {
        try {
            Boat updatedBoat = boatService.updateBoat(id, boatDetails);
            return ResponseEntity.ok(updatedBoat);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoat(@PathVariable Integer id) {
        try {
            boatService.deleteBoat(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
