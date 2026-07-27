package com.eventhub.controller;

import com.eventhub.dto.TestimonialRequest;
import com.eventhub.dto.TestimonialResponse;
import com.eventhub.model.User;
import com.eventhub.security.CurrentUserService;
import com.eventhub.service.TestimonialService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;
    private final CurrentUserService currentUserService;

    public TestimonialController(TestimonialService testimonialService, CurrentUserService currentUserService) {
        this.testimonialService = testimonialService;
        this.currentUserService = currentUserService;
    }

    // Public - this is what the homepage "What attendees are saying" section reads.
    @GetMapping
    public List<TestimonialResponse> getTestimonials() {
        return testimonialService.getLatest();
    }

    // Logged-in users only - lets real customers leave a real review.
    @PostMapping
    public TestimonialResponse submit(@Valid @RequestBody TestimonialRequest request) {
        User user = currentUserService.getCurrentUser();
        return testimonialService.create(user, request);
    }
}
