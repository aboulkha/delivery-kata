package com.example.delivery.repository;

import com.example.delivery.model.TimeSlot;
import com.example.delivery.model.Reservation;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

public class InMemoryRepository {
    private final Map<UUID, TimeSlot> slots = new ConcurrentHashMap<>();
    private final Map<UUID, Reservation> reservations = new ConcurrentHashMap<>();

    public InMemoryRepository() {
        // initialize with sample slots for next 3 days
        LocalDate today = LocalDate.now();
        for (int d = 0; d < 3; d++) {
            LocalDate date = today.plusDays(d);
            // two example slots per day
            addSlot(new TimeSlot(date, LocalTime.of(9, 0), LocalTime.of(11, 0), com.example.delivery.model.DeliveryMethod.DELIVERY));
            addSlot(new TimeSlot(date, LocalTime.of(14, 0), LocalTime.of(16, 0), com.example.delivery.model.DeliveryMethod.DELIVERY));
            addSlot(new TimeSlot(date, LocalTime.of(10, 0), LocalTime.of(12, 0), com.example.delivery.model.DeliveryMethod.DRIVE));
            addSlot(new TimeSlot(date, LocalTime.of(16, 0), LocalTime.of(18, 0), com.example.delivery.model.DeliveryMethod.DRIVE));
            addSlot(new TimeSlot(date, LocalTime.of(12, 0), LocalTime.of(13, 0), com.example.delivery.model.DeliveryMethod.DELIVERY_TODAY));
            addSlot(new TimeSlot(date, LocalTime.of(18, 0), LocalTime.of(19, 0), com.example.delivery.model.DeliveryMethod.DELIVERY_ASAP));
        }
    }

    public void addSlot(TimeSlot slot) {
        slots.put(slot.getId(), slot);
    }

    public Optional<TimeSlot> findSlot(UUID id) {
        return Optional.ofNullable(slots.get(id));
    }

    public List<TimeSlot> findSlotsByMethodAndDate(com.example.delivery.model.DeliveryMethod method, LocalDate date) {
        return slots.values().stream()
                .filter(s -> s.getMethod() == method && s.getDate().equals(date))
                .collect(Collectors.toList());
    }

    public void addReservation(Reservation r) {
        reservations.put(r.getId(), r);
    }
}
