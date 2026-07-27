package com.eventhub.dto;

public class StatsResponse {
    private long eventsHosted;
    private long happyAttendees;
    private long citiesCovered;
    private long partnerVenues;

    public long getEventsHosted() { return eventsHosted; }
    public void setEventsHosted(long eventsHosted) { this.eventsHosted = eventsHosted; }

    public long getHappyAttendees() { return happyAttendees; }
    public void setHappyAttendees(long happyAttendees) { this.happyAttendees = happyAttendees; }

    public long getCitiesCovered() { return citiesCovered; }
    public void setCitiesCovered(long citiesCovered) { this.citiesCovered = citiesCovered; }

    public long getPartnerVenues() { return partnerVenues; }
    public void setPartnerVenues(long partnerVenues) { this.partnerVenues = partnerVenues; }
}
