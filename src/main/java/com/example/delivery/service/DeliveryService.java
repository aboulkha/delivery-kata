package com.example.delivery.service;

import com.example.delivery.dto.ReservationRequest;
import com.example.delivery.exception.SlotUnavailableException;
import com.example.delivery.model.DeliveryMethod;
import com.example.delivery.model.Reservation;
import com.example.delivery.model.TimeSlot;
import com.example.delivery.repository.ReservationRepository;
import com.example.delivery.repository.TimeSlotRepository;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class DeliveryService {
    private final TimeSlotRepository slotRepo;
    private final ReservationRepository reservationRepo;

    public DeliveryService(TimeSlotRepository slotRepo, ReservationRepository reservationRepo) {
        this.slotRepo = slotRepo;
        this.reservationRepo = reservationRepo;
    }

    public List<DeliveryMethod> getMethods() {
        return List.of(DeliveryMethod.values());
    }

    public List<TimeSlot> getSlots(DeliveryMethod method, LocalDate date) {
        return slotRepo.findByMethodAndDate(method, date);
    }

    @Transactional
    public Reservation reserve(ReservationRequest req) {
        if (req.getSlotId() == null) {
            throw new IllegalArgumentException("slotId is required");
        }
        UUID id = req.getSlotId();
        TimeSlot slot = slotRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("slot not found"));
        if (slot.isReserved()) throw new SlotUnavailableException("Time-slot already reserved");
        slot.setReserved(true);
        try {
            slotRepo.save(slot);
        } catch (OptimisticLockingFailureException e) {
            throw new SlotUnavailableException("Time-slot already reserved");
        }
        Reservation r = new Reservation(req.getCustomerId(), slot.getId());
        reservationRepo.save(r);
        return r;
    }
}
