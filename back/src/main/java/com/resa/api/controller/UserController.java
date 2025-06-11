package com.resa.api.controller;

import com.resa.api.model.User;
import com.resa.api.model.dto.UserDto;
import com.resa.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "APIs for managing users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieves a list of all users")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieves a user by their ID")
    public UserDto getUserById(@PathVariable Integer id) {
        return new UserDto(userService.getUserById(id));
    }

    @PostMapping
    @Operation(summary = "Create user", description = "Creates a new user")
    public UserDto createUser(@RequestBody User user) {
        return new UserDto(userService.createUser(user));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update user", description = "Updates an existing user's information")
    public UserDto updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
        return new UserDto(userService.updateUser(id, userDetails));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user", description = "Deletes a user")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/role")
    @Operation(summary = "Update user role", description = "Updates the role of an existing user")
    public UserDto updateUserRole(@PathVariable Integer id, @RequestParam String role) {
        return new UserDto(userService.updateUserRole(id, role));
    }
}