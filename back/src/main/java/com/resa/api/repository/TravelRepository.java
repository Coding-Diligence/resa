package com.resa.api.repository;

import com.resa.api.model.Travel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TravelRepository extends JpaRepository<Travel, Integer> {
    List<Travel> findByDeparturePort(String port);
    List<Travel> findByArrivalPort(String port);
    List<Travel> findByDepartureTimeBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Travel> findByBoatId(Integer boatId);
}