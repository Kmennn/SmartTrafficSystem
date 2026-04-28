package com.traffic.model;

public class Violation {
    public String vehicleId;
    public double speed;
    public String zone;
    public int fine;

    public Violation(String vehicleId, double speed, String zone, int fine) {
        this.vehicleId = vehicleId;
        this.speed = speed;
        this.zone = zone;
        this.fine = fine;
    }
}
