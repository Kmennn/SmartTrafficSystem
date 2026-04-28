package com.traffic.service;

import com.traffic.model.*;

public class TrafficService {

    public static Violation process(VehicleEvent event) {
        if (event.speed > 80 && !event.emergency) {

            int fine;
            if (event.speed > 120) fine = 5000;
            else if (event.speed > 100) fine = 2000;
            else fine = 1000;

            return new Violation(event.vehicleId, event.speed, event.zone, fine);
        }
        return null;
    }
}