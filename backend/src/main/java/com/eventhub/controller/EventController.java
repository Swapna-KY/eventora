package com.eventhub.controller;

import com.eventhub.dto.EventRequest;
import com.eventhub.model.Event;
import com.eventhub.model.User;
import com.eventhub.security.CurrentUserService;
import com.eventhub.service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final CurrentUserService currentUserService;

    public EventController(EventService eventService, CurrentUserService currentUserService) {
        this.eventService = eventService;
        this.currentUserService = currentUserService;
    }

    // GET /api/events                -> all events
    // GET /api/events?featured=true  -> only featured events
    // GET /api/events?q=ai&city=Bangalore -> search
    @GetMapping
    public List<Event> getEvents(@RequestParam(required = false) Boolean featured,
                                  @RequestParam(required = false) String q,
                                  @RequestParam(required = false) String city) {
        if (Boolean.TRUE.equals(featured)) {
            return eventService.getFeatured();
        }
        if (q != null || city != null) {
            return eventService.search(q, city);
        }
        return eventService.getAll();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getById(id);
    }

    // Any logged-in user can create an event - they become its organizer (enforced in SecurityConfig: just needs auth).
    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody EventRequest request) {
        User user = currentUserService.getCurrentUser();
        return ResponseEntity.ok(eventService.create(user, request));
    }

    // Only the organizer or an admin can edit (enforced in EventService.assertCanModify).
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @Valid @RequestBody EventRequest request) {
        User user = currentUserService.getCurrentUser();
        return ResponseEntity.ok(eventService.update(id, user, request));
    }

    // Only the organizer or an admin can delete (enforced in EventService.assertCanModify).
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        User user = currentUserService.getCurrentUser();
        eventService.delete(id, user);
        return ResponseEntity.noContent().build();
    }
}
