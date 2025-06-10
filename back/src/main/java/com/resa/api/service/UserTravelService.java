package com.resa.api.service;

import com.resa.api.model.UserTravel;
import java.util.List;

public interface UserTravelService {
    List<UserTravel> getAllUserTravels();
    UserTravel getUserTravelById(Integer id);
    UserTravel createUserTravel(UserTravel userTravel);
    UserTravel updateUserTravel(Integer id, UserTravel userTravel);
    void deleteUserTravel(Integer id);
    List<UserTravel> getUserTravelsByUserId(Integer userId);
    List<UserTravel> getUserTravelsByTravelId(Integer travelId);
} 