package com.eventhub.controller;

import com.eventhub.dto.BookingRequest;
import com.eventhub.dto.BookingResponse;
import com.eventhub.model.User;
import com.eventhub.security.CurrentUserService;
import com.eventhub.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final CurrentUserService currentUserService;

    public BookingController(BookingService bookingService, CurrentUserService currentUserService) {
        this.bookingService = bookingService;
        this.currentUserService = currentUserService;
    }

    // POST /api/bookings  (any logged-in user) -> create a booking for themselves
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request) {
        User user = currentUserService.getCurrentUser();
        return ResponseEntity.ok(bookingService.createBooking(user, request));
    }

    // GET /api/bookings/my  -> the logged-in user's own bookings
    @GetMapping("/my")
    public List<BookingResponse> getMyBookings() {
        User user = currentUserService.getCurrentUser();
        return bookingService.getMyBookings(user.getId());
    }

    // PATCH /api/bookings/{id}/cancel -> cancel a booking you made (or any, if admin); restores seats
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long id) {
        User user = currentUserService.getCurrentUser();
        return ResponseEntity.ok(bookingService.cancelBooking(id, user));
    }

    // GET /api/bookings  (ADMIN only, enforced in SecurityConfig) -> every booking on the platform
    @GetMapping
    public List<BookingResponse> getAllBookings(@RequestParam(required = false) String q) {
        return bookingService.getAllBookings(q);
    }
}
