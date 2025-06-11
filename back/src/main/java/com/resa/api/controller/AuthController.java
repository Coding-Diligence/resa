package com.resa.api.controller;

import com.resa.api.model.User;
import com.resa.api.model.dto.AuthDto;
import com.resa.api.model.dto.UserResponseDto;
import com.resa.api.security.JwtService;
import com.resa.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "APIs for user authentication")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Creates a new user account and returns a JWT token")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        User createdUser = userService.createUser(user);
        String token = jwtService.generateToken(createdUser);
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", new UserResponseDto(createdUser));
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Authenticates a user and returns a JWT token")
    public ResponseEntity<?> login(@Valid @RequestBody AuthDto loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );

        User user = userService.getUserByEmail(loginRequest.getEmail());
        String token = jwtService.generateToken(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", new UserResponseDto(user));
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user", description = "Retrieves information about the currently authenticated user")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(new UserResponseDto(user));
    }
} 