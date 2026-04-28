package com.traffic.service;

import com.traffic.model.*;
import com.traffic.repository.ViolationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrafficService {

    @Autowired
    private ViolationRepository repository;

    public Violation process(VehicleEvent event) {
        if (event.speed > 80 && !event.emergency) {

            int fine;
            if (event.speed > 120) fine = 5000;
            else if (event.speed > 100) fine = 2000;
            else fine = 1000;

            Violation violation = new Violation(event.vehicleId, event.speed, event.zone, fine);
            // Save to PostgreSQL database!
            return repository.save(violation);
        }
        return null;
    }

    public List<Violation> getAllViolations() {
        return repository.findAll();
    }
}