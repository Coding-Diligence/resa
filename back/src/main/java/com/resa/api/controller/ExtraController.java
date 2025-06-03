package com.resa.api.controller;

import com.resa.api.model.Extra;
import com.resa.api.service.ExtraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/extra")
public class ExtraController {

    @Autowired
    private ExtraService extraService;

    @GetMapping
    public List<Extra> getAllExtras() {
        return extraService.getAllExtras();
    }

    @GetMapping("/{id}")
    public Extra getExtraById(@PathVariable Integer id) {
        return extraService.getExtraById(id);
    }

    @PostMapping
    public Extra createExtra(@Valid @RequestBody Extra extra) {
        return extraService.createExtra(extra);
    }

    @PutMapping("/{id}")
    public Extra updateExtra(@PathVariable Integer id, @Valid @RequestBody Extra extra) {
        return extraService.updateExtra(id, extra);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExtra(@PathVariable Integer id) {
        extraService.deleteExtra(id);
        return ResponseEntity.ok().build();
    }
} 