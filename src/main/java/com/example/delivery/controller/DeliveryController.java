package com.example.delivery.controller;

import com.example.delivery.dto.ReservationRequest;
import com.example.delivery.dto.ReservationResponse;
import com.example.delivery.dto.TimeSlotResponse;
import com.example.delivery.exception.SlotUnavailableException;
import com.example.delivery.model.DeliveryMethod;
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
    public List<DeliveryMethod> methods() {
        return service.getMethods();
    }

    @GetMapping("/slots")
    public List<TimeSlotResponse> slots(@RequestParam DeliveryMethod method,
                                      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return service.getSlots(method, date).stream()
                .map(TimeSlotResponse::from)
                .toList();
    }

    @PostMapping("/reservations")
    public ResponseEntity<ReservationResponse> reserve(@RequestBody ReservationRequest req) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ReservationResponse.from(service.reserve(req)));
        } catch (SlotUnavailableException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}
