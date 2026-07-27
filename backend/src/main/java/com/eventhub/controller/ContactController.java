package com.eventhub.controller;

import com.eventhub.dto.ContactMessageRequest;
import com.eventhub.dto.MessageResponse;
import com.eventhub.model.ContactMessage;
import com.eventhub.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ContactController {

    private final ContactMessageService contactMessageService;

    public ContactController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    // POST /api/contact - public, this is what the "Let's talk events" form actually submits to.
    @PostMapping("/api/contact")
    public ResponseEntity<MessageResponse> submit(@Valid @RequestBody ContactMessageRequest request) {
        contactMessageService.create(request);
        return ResponseEntity.ok(new MessageResponse("Message received - we'll get back to you shortly."));
    }

    // GET /api/admin/messages - ADMIN only (covered by the existing /api/admin/** security rule)
    @GetMapping("/api/admin/messages")
    public List<ContactMessage> getMessages() {
        return contactMessageService.getAll();
    }

    // PATCH /api/admin/messages/{id}/read - ADMIN only
    @PatchMapping("/api/admin/messages/{id}/read")
    public ResponseEntity<Void> markRead(@PathVariable Long id) {
        contactMessageService.markRead(id);
        return ResponseEntity.ok().build();
    }
}
