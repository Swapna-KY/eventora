package com.eventhub.service;

import com.eventhub.dto.StatsResponse;
import com.eventhub.model.Booking;
import com.eventhub.model.Event;
import com.eventhub.repository.BookingRepository;
import com.eventhub.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class StatsService {

    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;

    public StatsService(EventRepository eventRepository, BookingRepository bookingRepository) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
    }

    public StatsResponse getStats() {
        java.util.List<Event> events = eventRepository.findAll();
        java.util.List<Booking> bookings = bookingRepository.findAll();

        StatsResponse res = new StatsResponse();
        res.setEventsHosted(events.size());
        res.setHappyAttendees(bookings.stream().mapToLong(Booking::getQuantity).sum());
        res.setCitiesCovered(events.stream().map(Event::getCity).filter(Objects::nonNull).distinct().count());
        res.setPartnerVenues(events.stream().map(Event::getVenue).filter(Objects::nonNull).filter(v -> !v.isBlank()).distinct().count());
        return res;
    }
}
