package com.eventhub.dto;

import java.util.List;
import java.util.Map;

public class AnalyticsResponse {

    private double totalRevenue;
    private int totalTicketsSold;
    private int activeEvents;
    private double conversionRate;
    private List<Integer> bookingsLast7Days; // Mon..Sun
    private Map<String, Integer> seatsByCategory;

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public int getTotalTicketsSold() { return totalTicketsSold; }
    public void setTotalTicketsSold(int totalTicketsSold) { this.totalTicketsSold = totalTicketsSold; }

    public int getActiveEvents() { return activeEvents; }
    public void setActiveEvents(int activeEvents) { this.activeEvents = activeEvents; }

    public double getConversionRate() { return conversionRate; }
    public void setConversionRate(double conversionRate) { this.conversionRate = conversionRate; }

    public List<Integer> getBookingsLast7Days() { return bookingsLast7Days; }
    public void setBookingsLast7Days(List<Integer> bookingsLast7Days) { this.bookingsLast7Days = bookingsLast7Days; }

    public Map<String, Integer> getSeatsByCategory() { return seatsByCategory; }
    public void setSeatsByCategory(Map<String, Integer> seatsByCategory) { this.seatsByCategory = seatsByCategory; }
}
