package com.example.delivery.controller;

import com.example.delivery.dto.ReservationRequest;
import com.example.delivery.exception.SlotUnavailableException;
import com.example.delivery.model.Reservation;
import com.example.delivery.model.TimeSlot;
import com.example.delivery.service.DeliveryService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DeliveryController {
    private final DeliveryService service;

    public DeliveryController(DeliveryService service) {
        this.service = service;
    }

    @GetMapping("/methods")
    public List<com.example.delivery.model.DeliveryMethod> methods() {
        return service.getMethods();
    }

    @GetMapping("/slots")
    public List<TimeSlot> slots(@RequestParam com.example.delivery.model.DeliveryMethod method,
                                @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return service.getSlots(method, date);
    }

    @PostMapping("/reservations")
    public ResponseEntity<Reservation> reserve(@RequestBody ReservationRequest req) {
        try {
            Reservation r = service.reserve(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(r);
        } catch (SlotUnavailableException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}
