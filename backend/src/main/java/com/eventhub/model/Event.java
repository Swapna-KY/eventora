package com.eventhub.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String city;

    // Kept as a display string (e.g. "June 25, 2026") to match the frontend's
    // simple date rendering. Swap for java.time.LocalDate if you need real date filtering/sorting.
    @Column(name = "event_date", nullable = false)
    private String eventDate;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer seats;

    @Column(nullable = false)
    private Double rating = 4.5;

    @Column(nullable = false)
    private Boolean featured = false;

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    @Column(length = 255)
    private String venue;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private User organizer;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Event() {
    }

    // Exposed instead of the full organizer object, so the JSON never leaks a nested User
    // (and never risks exposing a password hash, even an encoded one).
    public Long getOrganizerId() { return organizer != null ? organizer.getId() : null; }
    public String getOrganizerName() { return organizer != null ? organizer.getName() : null; }

    public User getOrganizer() { return organizer; }
    public void setOrganizer(User organizer) { this.organizer = organizer; }

    // ---------- getters & setters ----------
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getSeats() { return seats; }
    public void setSeats(Integer seats) { this.seats = seats; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
