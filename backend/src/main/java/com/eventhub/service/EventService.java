package com.eventhub.service;

import com.eventhub.dto.EventRequest;
import com.eventhub.exception.BadRequestException;
import com.eventhub.exception.ForbiddenException;
import com.eventhub.exception.ResourceNotFoundException;
import com.eventhub.model.Event;
import com.eventhub.model.Role;
import com.eventhub.model.User;
import com.eventhub.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    public List<Event> getFeatured() {
        return eventRepository.findByFeaturedTrue();
    }

    public List<Event> search(String keyword, String city) {
        return eventRepository.search(
                (keyword == null || keyword.isBlank()) ? null : keyword,
                (city == null || city.isBlank()) ? null : city
        );
    }

    public Event getById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id " + id));
    }

    /** Any logged-in user can create an event - they become its organizer. */
    public Event create(User creator, EventRequest req) {
        Event event = new Event();
        event.setOrganizer(creator);
        applyRequest(event, req);
        return eventRepository.save(event);
    }

    /** Only the event's organizer, or an admin, can edit it. */
    public Event update(Long id, User currentUser, EventRequest req) {
        Event event = getById(id);
        assertCanModify(event, currentUser);
        applyRequest(event, req);
        return eventRepository.save(event);
    }

    /** Only the event's organizer, or an admin, can delete it. */
    public void delete(Long id, User currentUser) {
        Event event = getById(id);
        assertCanModify(event, currentUser);
        eventRepository.delete(event);
    }

    private void assertCanModify(Event event, User currentUser) {
        boolean isAdmin = currentUser.getRole() == Role.ADMIN;
        boolean isOwner = event.getOrganizer() != null && event.getOrganizer().getId().equals(currentUser.getId());
        if (!isAdmin && !isOwner) {
            throw new ForbiddenException("You can only edit or delete events you created");
        }
    }

    /** Decrements seats after a successful booking. Throws if not enough seats remain. */
    public void reduceSeats(Event event, int qty) {
        if (event.getSeats() < qty) {
            throw new BadRequestException("Not enough seats available for this event");
        }
        event.setSeats(event.getSeats() - qty);
        eventRepository.save(event);
    }

    /** Restores seats back to an event after a booking is cancelled. */
    public void increaseSeats(Event event, int qty) {
        event.setSeats(event.getSeats() + qty);
        eventRepository.save(event);
    }

    private void applyRequest(Event event, EventRequest req) {
        event.setTitle(req.getTitle());
        event.setCategory(req.getCategory());
        event.setCity(req.getCity());
        event.setEventDate(req.getEventDate());
        event.setPrice(req.getPrice());
        event.setSeats(req.getSeats());
        event.setRating(req.getRating() == null ? 4.5 : req.getRating());
        event.setFeatured(req.getFeatured() != null && req.getFeatured());
        event.setImageUrl(req.getImageUrl());
        event.setVenue(req.getVenue());
        event.setDescription(req.getDescription());
    }
}
