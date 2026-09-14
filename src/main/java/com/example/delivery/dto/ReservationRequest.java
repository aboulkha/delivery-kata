package com.example.delivery.dto;

import com.example.delivery.model.DeliveryMethod;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
public class ReservationRequest {
    private String customerId;
    private DeliveryMethod method;
    private LocalDate date;
    private UUID slotId;
}
