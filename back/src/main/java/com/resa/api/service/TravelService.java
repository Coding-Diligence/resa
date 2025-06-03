package com.resa.api.service;

import com.resa.api.model.Travel;
import java.util.List;

public interface TravelService {
    List<Travel> getAllTravels();
    Travel getTravelById(Integer id);
    Travel createTravel(Travel travel);
    Travel updateTravel(Integer id, Travel travel);
    void deleteTravel(Integer id);
} 