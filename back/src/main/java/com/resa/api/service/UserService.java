package com.resa.api.service;

import com.resa.api.model.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    User getUserByEmail(String email);
    User createUser(User user);
    User updateUser(Integer id, User userDetails);
    void deleteUser(Integer id);
    User updateUserRole(Integer id, String role);
}