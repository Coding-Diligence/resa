package com.resa.api.service;

import com.resa.api.model.Extra;
import com.resa.api.repository.ExtraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExtraService {

    @Autowired
    private ExtraRepository extraRepository;

    public List<Extra> getAllExtras() {
        return extraRepository.findAll();
    }

    public Extra getExtraById(Integer id) {
        return extraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Extra not found with id: " + id));
    }

    public Extra createExtra(Extra extra) {
        extra.setCreatedAt(LocalDateTime.now());
        extra.setUpdatedAt(LocalDateTime.now());
        return extraRepository.save(extra);
    }

    public Extra updateExtra(Integer id, Extra extraDetails) {
        Extra extra = getExtraById(id);
        
        extra.setName(extraDetails.getName());
        extra.setPrice(extraDetails.getPrice());
        extra.setQuantity(extraDetails.getQuantity());
        extra.setTravel(extraDetails.getTravel());
        extra.setUpdatedAt(LocalDateTime.now());
        
        return extraRepository.save(extra);
    }

    public void deleteExtra(Integer id) {
        Extra extra = getExtraById(id);
        extraRepository.delete(extra);
    }
} 