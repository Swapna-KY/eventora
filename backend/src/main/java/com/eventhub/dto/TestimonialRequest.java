package com.eventhub.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class TestimonialRequest {

    @NotBlank(message = "Please write a few words about your experience")
    private String quote;

    @Min(1)
    @Max(5)
    private Integer rating = 5;

    public String getQuote() { return quote; }
    public void setQuote(String quote) { this.quote = quote; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
}
