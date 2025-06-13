package com.resa.api.repository;

import com.resa.api.model.Travel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TravelRepository extends JpaRepository<Travel, Integer> {

    List<Travel> findByDeparturePort(String port);
    List<Travel> findByArrivalPort(String port);
    List<Travel> findByDepartureTimeBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Travel> findByBoatId(Integer boatId);

    @Query("SELECT t FROM Travel t WHERE " +
            "LOWER(t.departurePort) = LOWER(:departurePort) AND " +
            "LOWER(t.arrivalPort) = LOWER(:arrivalPort) AND " +
            "t.departureTime BETWEEN :startDate AND :endDate")
    List<Travel> findByDateAndPorts(@Param("startDate") LocalDateTime startDate,
                                    @Param("endDate") LocalDateTime endDate,
                                    @Param("departurePort") String departurePort,
                                    @Param("arrivalPort") String arrivalPort);
}
