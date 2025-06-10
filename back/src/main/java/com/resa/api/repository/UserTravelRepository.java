package com.resa.api.repository;

import com.resa.api.model.UserTravel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTravelRepository extends JpaRepository<UserTravel, Integer> {
    List<UserTravel> findByUserId(Integer userId);
    List<UserTravel> findByTravelId(Integer travelId);
} 