package com.eventhub.controller;

import com.eventhub.dto.StatsResponse;
import com.eventhub.service.StatsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    // Public - real counts computed from the database, not hardcoded anywhere.
    @GetMapping
    public StatsResponse getStats() {
        return statsService.getStats();
    }
}
