package com.example.delivery;

import com.example.delivery.model.DeliveryMethod;
import com.example.delivery.model.TimeSlot;
import com.example.delivery.repository.TimeSlotRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DataInitializer implements CommandLineRunner {
    private final TimeSlotRepository slotRepo;

    public DataInitializer(TimeSlotRepository slotRepo) {
        this.slotRepo = slotRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        LocalDate today = LocalDate.now();
        for (int d = 0; d < 3; d++) {
            LocalDate date = today.plusDays(d);
            slotRepo.save(new TimeSlot(date, LocalTime.of(9,0), LocalTime.of(11,0), DeliveryMethod.DELIVERY));
            slotRepo.save(new TimeSlot(date, LocalTime.of(14,0), LocalTime.of(16,0), DeliveryMethod.DELIVERY));
            slotRepo.save(new TimeSlot(date, LocalTime.of(10,0), LocalTime.of(12,0), DeliveryMethod.DRIVE));
            slotRepo.save(new TimeSlot(date, LocalTime.of(16,0), LocalTime.of(18,0), DeliveryMethod.DRIVE));
            slotRepo.save(new TimeSlot(date, LocalTime.of(12,0), LocalTime.of(13,0), DeliveryMethod.DELIVERY_TODAY));
            slotRepo.save(new TimeSlot(date, LocalTime.of(18,0), LocalTime.of(19,0), DeliveryMethod.DELIVERY_ASAP));
        }
    }
}
