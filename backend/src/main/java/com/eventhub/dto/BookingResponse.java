package com.eventhub.dto;

import com.eventhub.model.Booking;

public class BookingResponse {

    private Long id;
    private String bookingReference;
    private Long eventId;
    private String eventTitle;
    private String eventImage;
    private String eventCity;
    private String eventDate;
    private String ticketType;
    private Integer quantity;
    private Double amount;
    private String status;
    private String attendeeName;

    public static BookingResponse from(Booking b) {
        BookingResponse r = new BookingResponse();
        r.id = b.getId();
        r.bookingReference = b.getBookingReference();
        r.eventId = b.getEvent() != null ? b.getEvent().getId() : null;
        r.eventTitle = b.getEvent() != null ? b.getEvent().getTitle() : "Event removed";
        r.eventImage = b.getEvent() != null ? b.getEvent().getImageUrl() : "";
        r.eventCity = b.getEvent() != null ? b.getEvent().getCity() : "";
        r.eventDate = b.getEvent() != null ? b.getEvent().getEventDate() : "";
        r.ticketType = b.getTicketType();
        r.quantity = b.getQuantity();
        r.amount = b.getAmount();
        r.status = b.getStatus().name().toLowerCase();
        r.attendeeName = b.getAttendeeName();
        return r;
    }

    public Long getId() { return id; }
    public String getBookingReference() { return bookingReference; }
    public Long getEventId() { return eventId; }
    public String getEventTitle() { return eventTitle; }
    public String getEventImage() { return eventImage; }
    public String getEventCity() { return eventCity; }
    public String getEventDate() { return eventDate; }
    public String getTicketType() { return ticketType; }
    public Integer getQuantity() { return quantity; }
    public Double getAmount() { return amount; }
    public String getStatus() { return status; }
    public String getAttendeeName() { return attendeeName; }
}
