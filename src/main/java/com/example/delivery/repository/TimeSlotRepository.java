package com.example.delivery.repository;

import com.example.delivery.model.DeliveryMethod;
import com.example.delivery.model.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, UUID> {
    List<TimeSlot> findByMethodAndDate(DeliveryMethod method, LocalDate date);
}
