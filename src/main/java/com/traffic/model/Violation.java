package com.traffic.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Violation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    
    public String vehicleId;
    public double speed;
    public String zone;
    public int fine;

    // Default constructor required by JPA
    public Violation() {}

    public Violation(String vehicleId, double speed, String zone, int fine) {
        this.vehicleId = vehicleId;
        this.speed = speed;
        this.zone = zone;
        this.fine = fine;
    }
}
