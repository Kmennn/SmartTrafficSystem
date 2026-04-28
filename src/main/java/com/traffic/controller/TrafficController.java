package com.traffic.controller;

import com.traffic.model.*;
import com.traffic.service.TrafficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/traffic")
public class TrafficController {

    @Autowired
    private TrafficService trafficService;

    @PostMapping("/check")
    public Violation check(@RequestBody VehicleEvent event) {
        return trafficService.process(event);
    }

    @GetMapping("/violations")
    public List<Violation> getAllViolations() {
        return trafficService.getAllViolations();
    }
}