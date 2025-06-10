package com.resa.api.service.impl;

import com.resa.api.model.UserTravel;
import com.resa.api.repository.UserTravelRepository;
import com.resa.api.service.UserTravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserTravelServiceImpl implements UserTravelService {

    @Autowired
    private UserTravelRepository userTravelRepository;

    @Override
    public List<UserTravel> getAllUserTravels() {
        return userTravelRepository.findAll();
    }

    @Override
    public UserTravel getUserTravelById(Integer id) {
        return userTravelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserTravel not found with id: " + id));
    }

    @Override
    public UserTravel createUserTravel(UserTravel userTravel) {
        userTravel.setCreatedAt(LocalDateTime.now());
        userTravel.setUpdatedAt(LocalDateTime.now());
        return userTravelRepository.save(userTravel);
    }

    @Override
    public UserTravel updateUserTravel(Integer id, UserTravel userTravelDetails) {
        UserTravel userTravel = getUserTravelById(id);
        userTravel.setUser(userTravelDetails.getUser());
        userTravel.setTravel(userTravelDetails.getTravel());
        userTravel.setUpdatedAt(LocalDateTime.now());
        return userTravelRepository.save(userTravel);
    }

    @Override
    public void deleteUserTravel(Integer id) {
        UserTravel userTravel = getUserTravelById(id);
        userTravelRepository.delete(userTravel);
    }

    @Override
    public List<UserTravel> getUserTravelsByUserId(Integer userId) {
        return userTravelRepository.findByUserId(userId);
    }

    @Override
    public List<UserTravel> getUserTravelsByTravelId(Integer travelId) {
        return userTravelRepository.findByTravelId(travelId);
    }
} 