package com.example.delivery.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeSlot {
    @Id
    private UUID id = UUID.randomUUID();

    @jakarta.persistence.Column(name = "slot_date")
    private LocalDate date;

    @jakarta.persistence.Column(name = "start_time")
    private LocalTime start;

    @jakarta.persistence.Column(name = "end_time")
    private LocalTime end;

    @Enumerated(EnumType.STRING)
    private DeliveryMethod method;

    @jakarta.persistence.Column(name = "reserved", nullable = false)
    private boolean reserved = false;

    @Version
    private Long version;

    public TimeSlot(LocalDate date, LocalTime start, LocalTime end, DeliveryMethod method) {
        this.date = date;
        this.start = start;
        this.end = end;
        this.method = method;
    }
}
