package com.eventhub.controller;

import com.eventhub.model.Event;
import com.eventhub.model.User;
import com.eventhub.security.CurrentUserService;
import com.eventhub.service.SavedEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved")
public class SavedEventController {

    private final SavedEventService savedEventService;
    private final CurrentUserService currentUserService;

    public SavedEventController(SavedEventService savedEventService, CurrentUserService currentUserService) {
        this.savedEventService = savedEventService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<Event> getSaved() {
        User user = currentUserService.getCurrentUser();
        return savedEventService.getSavedEvents(user.getId());
    }

    @PostMapping("/{eventId}")
    public ResponseEntity<Void> save(@PathVariable Long eventId) {
        User user = currentUserService.getCurrentUser();
        savedEventService.save(user, eventId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> unsave(@PathVariable Long eventId) {
        User user = currentUserService.getCurrentUser();
        savedEventService.unsave(user.getId(), eventId);
        return ResponseEntity.ok().build();
    }
}
