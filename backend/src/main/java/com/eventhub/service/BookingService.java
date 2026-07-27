package com.eventhub.service;

import com.eventhub.dto.BookingRequest;
import com.eventhub.dto.BookingResponse;
import com.eventhub.exception.BadRequestException;
import com.eventhub.exception.ForbiddenException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.model.*;
import com.eventhub.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventService eventService;
    private final NotificationService notificationService;

    public BookingService(BookingRepository bookingRepository, EventService eventService,
                           NotificationService notificationService) {
        this.bookingRepository = bookingRepository;
        this.eventService = eventService;
        this.notificationService = notificationService;
    }

    public BookingResponse createBooking(User user, BookingRequest req) {
        Event event = eventService.getById(req.getEventId());

        TicketType type = TicketType.fromString(req.getTicketType());
        double amount = event.getPrice() * type.getMultiplier() * req.getQuantity();

        // Reserve the seats (throws if not enough available)
        eventService.reduceSeats(event, req.getQuantity());

        Booking booking = new Booking();
        booking.setBookingReference(generateReference());
        booking.setUser(user);
        booking.setEvent(event);
        booking.setTicketType(type.name());
        booking.setQuantity(req.getQuantity());
        booking.setAmount(Math.round(amount * 100.0) / 100.0);
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setAttendeeName(req.getAttendeeName());
        booking.setAttendeeEmail(req.getAttendeeEmail());
        booking.setAttendeePhone(req.getAttendeePhone());

        Booking saved = bookingRepository.save(booking);

        notificationService.notify(user, "i-ticket",
                "Your booking for " + event.getTitle() + " is confirmed.");

        return BookingResponse.from(saved);
    }

    public List<BookingResponse> getMyBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(BookingResponse::from).collect(Collectors.toList());
    }

    /** Cancels a booking - only the person who made it (or an admin) can cancel, and seats are restored. */
    public BookingResponse cancelBooking(Long bookingId, User currentUser) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        boolean isOwner = booking.getUser() != null && booking.getUser().getId().equals(currentUser.getId());
        if (!isAdmin && !isOwner) {
            throw new ForbiddenException("You can only cancel your own bookings");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("This booking is already cancelled");
        }
        if (booking.getStatus() == BookingStatus.PAST) {
            throw new BadRequestException("Past events can't be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking saved = bookingRepository.save(booking);

        if (booking.getEvent() != null) {
            eventService.increaseSeats(booking.getEvent(), booking.getQuantity());
        }

        if (booking.getUser() != null && booking.getEvent() != null) {
            notificationService.notify(booking.getUser(), "i-bell",
                    "Your booking for " + booking.getEvent().getTitle() + " has been cancelled.");
        }

        return BookingResponse.from(saved);
    }

    public List<BookingResponse> getAllBookings(String keyword) {
        List<Booking> all = bookingRepository.findAllByOrderByCreatedAtDesc();
        if (keyword != null && !keyword.isBlank()) {
            String k = keyword.toLowerCase();
            all = all.stream().filter(b ->
                    b.getBookingReference().toLowerCase().contains(k) ||
                    (b.getAttendeeName() != null && b.getAttendeeName().toLowerCase().contains(k)) ||
                    (b.getEvent() != null && b.getEvent().getTitle().toLowerCase().contains(k))
            ).collect(Collectors.toList());
        }
        return all.stream().map(BookingResponse::from).collect(Collectors.toList());
    }

    public List<Booking> getAllRaw() {
        return bookingRepository.findAll();
    }

    private String generateReference() {
        int random = ThreadLocalRandom.current().nextInt(100000, 999999);
        return "EH-" + random;
    }
}
