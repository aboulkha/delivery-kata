package com.example.delivery;

import com.example.delivery.dto.ReservationRequest;
import com.example.delivery.model.TimeSlot;
import com.example.delivery.repository.TimeSlotRepository;
import com.example.delivery.service.DeliveryService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.*;

@SpringBootTest
public class DeliveryServiceTest {

    @Autowired
    private DeliveryService service;

    @Autowired
    private TimeSlotRepository slotRepo;

    @Test
    public void concurrentReservationShouldAllowOnlyOne() throws InterruptedException, ExecutionException {
        List<TimeSlot> slots = service.getSlots(com.example.delivery.model.DeliveryMethod.DELIVERY, LocalDate.now());
        Assertions.assertFalse(slots.isEmpty());
        TimeSlot slot = slots.get(0);

        ExecutorService exec = Executors.newFixedThreadPool(2);
        Callable<Boolean> task = () -> {
            ReservationRequest r = new ReservationRequest();
            r.setCustomerId(Thread.currentThread().getName());
            r.setSlotId(slot.getId());
            try {
                service.reserve(r);
                return true;
            } catch (Exception e) {
                return false;
            }
        };

        Future<Boolean> f1 = exec.submit(task);
        Future<Boolean> f2 = exec.submit(task);

        int success = 0;
        if (f1.get()) success++;
        if (f2.get()) success++;

        Assertions.assertEquals(1, success, "Only one reservation should succeed");

        exec.shutdown();
    }
}
