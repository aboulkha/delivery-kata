package com.example.delivery.dto;

import com.example.delivery.model.DeliveryMethod;
import com.example.delivery.model.TimeSlot;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class TimeSlotResponse {
    private UUID id;
    private LocalDate date;
    private LocalTime start;
    private LocalTime end;
    private DeliveryMethod method;
    private boolean reserved;

    public static TimeSlotResponse from(TimeSlot slot) {
        return new TimeSlotResponse(
                slot.getId(),
                slot.getDate(),
                slot.getStart(),
                slot.getEnd(),
                slot.getMethod(),
                slot.isReserved()
        );
    }
}
