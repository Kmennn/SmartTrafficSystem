package com.traffic.controller;

import com.traffic.model.*;
import com.traffic.service.TrafficService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/traffic")
public class TrafficController {

    @PostMapping("/check")
    public Violation check(@RequestBody VehicleEvent event) {
        return TrafficService.process(event);
    }
}