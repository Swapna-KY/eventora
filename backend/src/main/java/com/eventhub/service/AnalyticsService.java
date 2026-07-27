package com.eventhub.service;

import com.eventhub.dto.AnalyticsResponse;
import com.eventhub.model.Booking;
import com.eventhub.model.Event;
import com.eventhub.repository.BookingRepository;
import com.eventhub.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class AnalyticsService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;

    public AnalyticsService(BookingRepository bookingRepository, EventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
    }

    public AnalyticsResponse getAnalytics() {
        List<Booking> bookings = bookingRepository.findAll();
        List<Event> events = eventRepository.findAll();

        AnalyticsResponse res = new AnalyticsResponse();

        double revenue = bookings.stream().mapToDouble(Booking::getAmount).sum();
        int tickets = bookings.stream().mapToInt(Booking::getQuantity).sum();

        res.setTotalRevenue(Math.round(revenue * 100.0) / 100.0);
        res.setTotalTicketsSold(tickets);
        res.setActiveEvents(events.size());
        // Simple illustrative conversion metric: tickets sold vs total seats ever listed.
        int totalCapacity = events.stream().mapToInt(e -> e.getSeats() == null ? 0 : e.getSeats()).sum() + tickets;
        res.setConversionRate(totalCapacity == 0 ? 0 : Math.round((tickets * 100.0 / totalCapacity) * 10) / 10.0);

        // Bookings per day for the last 7 days (Mon..Sun bucket based on createdAt)
        List<Integer> last7 = new ArrayList<>(Collections.nCopies(7, 0));
        LocalDate today = LocalDate.now();
        for (Booking b : bookings) {
            if (b.getCreatedAt() == null) continue;
            LocalDate created = b.getCreatedAt().atZone(ZoneId.systemDefault()).toLocalDate();
            long daysAgo = java.time.temporal.ChronoUnit.DAYS.between(created, today);
            if (daysAgo >= 0 && daysAgo < 7) {
                int idx = (int) (6 - daysAgo);
                last7.set(idx, last7.get(idx) + b.getQuantity());
            }
        }
        res.setBookingsLast7Days(last7);

        // Seats sold (booked) by event category
        Map<String, Integer> byCategory = new LinkedHashMap<>();
        for (Booking b : bookings) {
            if (b.getEvent() == null) continue;
            String cat = b.getEvent().getCategory();
            byCategory.merge(cat, b.getQuantity(), Integer::sum);
        }
        res.setSeatsByCategory(byCategory);

        return res;
    }
}
