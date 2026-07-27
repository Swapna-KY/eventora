package com.eventhub.model;

/**
 * Mirrors the ticket-type pricing logic from the frontend's ticketTypes() function:
 * General = base price, VIP = 1.8x, Group = 3.4x.
 * Keeping this server-side means price can never be tampered with from the client.
 */
public enum TicketType {
    GENERAL("General Admission", 1.0),
    VIP("VIP Access", 1.8),
    GROUP("Group of 4", 3.4);

    private final String label;
    private final double multiplier;

    TicketType(String label, double multiplier) {
        this.label = label;
        this.multiplier = multiplier;
    }

    public String getLabel() {
        return label;
    }

    public double getMultiplier() {
        return multiplier;
    }

    public static TicketType fromString(String value) {
        if (value == null) return GENERAL;
        try {
            return TicketType.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return GENERAL;
        }
    }
}
