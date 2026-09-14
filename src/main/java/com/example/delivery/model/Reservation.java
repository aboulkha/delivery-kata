package com.example.delivery.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reservation {
    @Id
    private UUID id = UUID.randomUUID();

    private String customerId;
    private UUID slotId;

    public Reservation(String customerId, UUID slotId) {
        this.customerId = customerId;
        this.slotId = slotId;
    }
}
