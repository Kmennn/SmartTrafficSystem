package com.traffic.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "<h1>Welcome to the Smart Traffic System API!</h1>" +
               "<p>Your application is running successfully on Render.</p>" +
               "<p>View your stored traffic violations here: <a href=\"/traffic/violations\">/traffic/violations</a></p>" +
               "<p>View API Documentation (Swagger): <a href=\"/swagger-ui/index.html\">/swagger-ui/index.html</a></p>";
    }
}
