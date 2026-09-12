package com.example.delivery.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class Reservation {
    @Id
    private UUID id = UUID.randomUUID();

    private String customerId;
    private UUID slotId;

    protected Reservation() {}

    public Reservation(String customerId, UUID slotId) {
        this.customerId = customerId;
        this.slotId = slotId;
    }

    public UUID getId() {
        return id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public UUID getSlotId() {
        return slotId;
    }
}
