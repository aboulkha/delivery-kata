package com.example.delivery.dto;

import com.example.delivery.model.DeliveryMethod;

import java.util.UUID;

public class ReservationRequest {
    private String customerId;
    private DeliveryMethod method;
    private java.time.LocalDate date;
    private UUID slotId;

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public DeliveryMethod getMethod() {
        return method;
    }

    public void setMethod(DeliveryMethod method) {
        this.method = method;
    }

    public java.time.LocalDate getDate() {
        return date;
    }

    public void setDate(java.time.LocalDate date) {
        this.date = date;
    }

    public UUID getSlotId() {
        return slotId;
    }

    public void setSlotId(UUID slotId) {
        this.slotId = slotId;
    }
}
