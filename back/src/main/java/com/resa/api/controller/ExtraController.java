package com.resa.api.controller;

import com.resa.api.model.Extra;
import com.resa.api.model.dto.ExtraDto;
import com.resa.api.service.ExtraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/extras")
public class ExtraController {

    @Autowired
    private ExtraService extraService;

    @GetMapping
    public List<ExtraDto> getAllExtras() {
        return extraService.getAllExtras().stream()
                .map(ExtraDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ExtraDto getExtraById(@PathVariable Integer id) {
        return new ExtraDto(extraService.getExtraById(id));
    }

    @GetMapping("/travel/{travelId}")
    public List<ExtraDto> getExtrasByTravelId(@PathVariable Integer travelId) {
        return extraService.getExtrasByTravelId(travelId).stream()
                .map(ExtraDto::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ExtraDto createExtra(@Valid @RequestBody Extra extra) {
        return new ExtraDto(extraService.createExtra(extra));
    }

    @PutMapping("/{id}")
    public ExtraDto updateExtra(@PathVariable Integer id, @Valid @RequestBody Extra extra) {
        return new ExtraDto(extraService.updateExtra(id, extra));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExtra(@PathVariable Integer id) {
        extraService.deleteExtra(id);
        return ResponseEntity.ok().build();
    }
} 