package com.resa.api.repository;

import com.resa.api.model.Extra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExtraRepository extends JpaRepository<Extra, Integer> {
    List<Extra> findByTravelId(Integer travelId);
} 