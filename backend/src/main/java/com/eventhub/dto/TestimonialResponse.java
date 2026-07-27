package com.eventhub.dto;

import com.eventhub.model.Testimonial;

public class TestimonialResponse {

    private Long id;
    private String name;
    private String city;
    private String quote;
    private Integer rating;
    private String createdAt;

    public static TestimonialResponse from(Testimonial t) {
        TestimonialResponse r = new TestimonialResponse();
        r.id = t.getId();
        r.name = t.getUser() != null ? t.getUser().getName() : "EventHub user";
        r.city = t.getUser() != null ? t.getUser().getCity() : null;
        r.quote = t.getQuote();
        r.rating = t.getRating();
        r.createdAt = t.getCreatedAt() != null ? t.getCreatedAt().toString() : null;
        return r;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCity() { return city; }
    public String getQuote() { return quote; }
    public Integer getRating() { return rating; }
    public String getCreatedAt() { return createdAt; }
}
