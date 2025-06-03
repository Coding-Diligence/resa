package com.resa.api.repository;

import com.resa.api.model.Boat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoatRepository extends JpaRepository<Boat, Integer> {
    List<Boat> findByTravelsIsEmpty();
    List<Boat> findByPort(String port);
    List<Boat> findByPortAndTravelsIsEmpty(String port);
} 