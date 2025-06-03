package com.resa.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class UserController {

  @GetMapping("/user")
  public String getMethodName(@RequestParam String param) {
      return new String();
  }
  
}
