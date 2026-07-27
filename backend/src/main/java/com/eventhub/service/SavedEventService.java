package com.eventhub.service;

import com.eventhub.model.Event;
import com.eventhub.model.SavedEvent;
import com.eventhub.model.User;
import com.eventhub.repository.SavedEventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SavedEventService {

    private final SavedEventRepository savedEventRepository;
    private final EventService eventService;

    public SavedEventService(SavedEventRepository savedEventRepository, EventService eventService) {
        this.savedEventRepository = savedEventRepository;
        this.eventService = eventService;
    }

    public List<Event> getSavedEvents(Long userId) {
        return savedEventRepository.findByUserId(userId)
                .stream().map(SavedEvent::getEvent).collect(Collectors.toList());
    }

    public void save(User user, Long eventId) {
        if (savedEventRepository.existsByUserIdAndEventId(user.getId(), eventId)) return;
        Event event = eventService.getById(eventId);
        savedEventRepository.save(new SavedEvent(user, event));
    }

    @Transactional
    public void unsave(Long userId, Long eventId) {
        savedEventRepository.deleteByUserIdAndEventId(userId, eventId);
    }
}
