package com.example.delivery.dto;

import com.example.delivery.model.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class ReservationResponse {
    private UUID id;
    private String customerId;
    private UUID slotId;

    public static ReservationResponse from(Reservation reservation) {
        return new ReservationResponse(
                reservation.getId(),
                reservation.getCustomerId(),
                reservation.getSlotId()
        );
    }
}
