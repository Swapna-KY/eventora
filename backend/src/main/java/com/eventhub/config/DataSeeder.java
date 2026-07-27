package com.eventhub.config;

import com.eventhub.model.*;
import com.eventhub.repository.BookingRepository;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.NotificationRepository;
import com.eventhub.repository.TestimonialRepository;
import com.eventhub.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

/**
 * Seeds the database with realistic starting data so every number shown on the frontend -
 * the stats strip, category counts, testimonials, analytics - reflects something that actually
 * lives in MySQL, instead of being typed directly into the frontend.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final BookingRepository bookingRepository;
    private final TestimonialRepository testimonialRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(EventRepository eventRepository, UserRepository userRepository,
                       NotificationRepository notificationRepository, BookingRepository bookingRepository,
                       TestimonialRepository testimonialRepository, PasswordEncoder passwordEncoder) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
        this.bookingRepository = bookingRepository;
        this.testimonialRepository = testimonialRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        List<User> allUsers = seedUsers();
        User admin = allUsers.stream().filter(u -> u.getRole() == Role.ADMIN).findFirst().orElse(null);
        List<User> customers = allUsers.stream().filter(u -> u.getRole() != Role.ADMIN).collect(Collectors.toList());

        List<Event> events = seedEvents(admin);
        seedBookings(customers, events);
        seedTestimonials(customers);
    }

    private List<User> seedUsers() {
        if (userRepository.count() > 0) {
            return userRepository.findAll();
        }

        User admin = new User("Swapna KY", "swapna@eventora.in", passwordEncoder.encode("admin123"), Role.ADMIN);
        admin.setCity("Bangalore");
        userRepository.save(admin);

        User demo = new User("Priya Sharma", "demo@eventhub.in", passwordEncoder.encode("demo123"), Role.USER);
        demo.setCity("Mysuru");
        userRepository.save(demo);

        User rohit = new User("Rohit Mehta", "rohit.mehta@eventhub.in", passwordEncoder.encode("password123"), Role.USER);
        rohit.setCity("Mumbai");
        userRepository.save(rohit);

        User karthik = new User("Karthik Iyer", "karthik.iyer@eventhub.in", passwordEncoder.encode("password123"), Role.USER);
        karthik.setCity("Hyderabad");
        userRepository.save(karthik);

        System.out.println("Seeded demo accounts:");
        System.out.println("  Admin -> swapna@eventora.in / admin123");
        System.out.println("  User  -> demo@eventhub.in / demo123");

        return List.of(admin, demo, rohit, karthik);
    }

    private List<Event> seedEvents(User organizer) {
        if (eventRepository.count() > 0) {
            return eventRepository.findAll();
        }

        List<Event> events = List.of(
            buildEvent("AI Summit 2027", "Technology", "Bangalore", "Feb 14, 2027",
                4999.0, 120, 4.9, true, "Bangalore International Exhibition Centre",
                "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80",
                "A landmark gathering of AI researchers, founders and engineers shaping what's next.", organizer),

            buildEvent("Sunburn Festival Goa", "Music", "Goa", "Dec 28, 2026",
                2499.0, 340, 4.8, true, "Vagator Beach Grounds",
                "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
                "India's biggest electronic music festival returns to the beaches of Goa.", organizer),

            buildEvent("Startup Founders Mixer", "Business", "Mumbai", "Sep 12, 2026",
                999.0, 45, 4.7, true, "WeWork BKC",
                "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
                "An intimate evening of networking with 50 early-stage founders and investors.", organizer),

            buildEvent("Indie Music Night", "Music", "Mysuru", "Aug 22, 2026",
                599.0, 80, 4.6, true, "Rangayana Open Air Theatre",
                "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80",
                "Local indie bands take the stage for an unplugged night under the stars.", organizer),

            buildEvent("Comedy Carnival", "Comedy", "Hyderabad", "Aug 30, 2026",
                799.0, 60, 4.9, true, "Shilpakala Vedika",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
                "Five of India's sharpest stand-up comics, one unforgettable night.", organizer),

            buildEvent("Modern Art Exhibition", "Art & Culture", "Delhi", "Oct 5, 2026",
                399.0, 95, 4.5, true, "Bikaner House",
                "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=900&q=80",
                "Contemporary works from 30 emerging South Asian artists.", organizer),

            buildEvent("Mindful Wellness Retreat", "Wellness", "Coorg", "Sep 20, 2026",
                3499.0, 30, 4.8, true, "Coorg Wilderness Resort",
                "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80",
                "A weekend of yoga, sound healing and slow mornings in the hills of Coorg.", organizer),

            buildEvent("Culinary Masterclass", "Food & Drink", "Bangalore", "Aug 10, 2026",
                1799.0, 25, 4.7, true, "The Leela Palace Culinary Studio",
                "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
                "Hands-on pasta and sourdough workshop with a Michelin-trained chef.", organizer),

            buildEvent("Marathon for a Cause", "Sports", "Mumbai", "Nov 2, 2026",
                699.0, 500, 4.6, true, "Marine Drive",
                "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
                "A 10K city run raising funds for children's education across Maharashtra.", organizer)
        );

        eventRepository.saveAll(events);
        System.out.println("Seeded " + eventRepository.count() + " sample events.");
        return events;
    }

    /** A handful of real bookings so the stats strip and analytics charts aren't just zeros on first run. */
    private void seedBookings(List<User> customers, List<Event> events) {
        if (bookingRepository.count() > 0 || customers.isEmpty() || events.isEmpty()) return;

        record SeedBooking(int customerIdx, int eventIdx, String ticketType, int qty, int daysAgo) {}
        List<SeedBooking> plan = List.of(
            new SeedBooking(0, 1, "GENERAL", 2, 1),
            new SeedBooking(1, 0, "VIP", 1, 2),
            new SeedBooking(2, 4, "GENERAL", 3, 0),
            new SeedBooking(0, 5, "GENERAL", 1, 4),
            new SeedBooking(1, 3, "GROUP", 4, 6)
        );

        for (SeedBooking sb : plan) {
            User user = customers.get(sb.customerIdx() % customers.size());
            Event event = events.get(sb.eventIdx() % events.size());
            TicketType type = TicketType.fromString(sb.ticketType());

            Booking booking = new Booking();
            booking.setBookingReference("EH-" + ThreadLocalRandom.current().nextInt(100000, 999999));
            booking.setUser(user);
            booking.setEvent(event);
            booking.setTicketType(type.name());
            booking.setQuantity(sb.qty());
            booking.setAmount(event.getPrice() * type.getMultiplier() * sb.qty());
            booking.setStatus(BookingStatus.CONFIRMED);
            booking.setAttendeeName(user.getName());
            booking.setAttendeeEmail(user.getEmail());
            booking.setCreatedAt(LocalDateTime.now().minusDays(sb.daysAgo()));
            bookingRepository.save(booking);
        }
        System.out.println("Seeded " + bookingRepository.count() + " sample bookings.");
    }

    /** Real testimonials tied to real seeded users - served via GET /api/testimonials, not hardcoded in the frontend. */
    private void seedTestimonials(List<User> customers) {
        if (testimonialRepository.count() > 0 || customers.size() < 3) return;

        testimonialRepository.save(new Testimonial(customers.get(0),
                "Booked the AI Summit in under two minutes. The whole flow feels like a proper product, not a ticketing afterthought.", 5));
        testimonialRepository.save(new Testimonial(customers.get(1),
                "EventHub's founder mixers are how I met my co-founder. The platform just gets the details right.", 5));
        testimonialRepository.save(new Testimonial(customers.get(2),
                "Seat selection, instant e-tickets, clean refunds when a show got rescheduled - genuinely premium experience.", 5));

        System.out.println("Seeded " + testimonialRepository.count() + " sample testimonials.");
    }

    private Event buildEvent(String title, String category, String city, String date, Double price,
                              Integer seats, Double rating, Boolean featured, String venue, String img, String desc,
                              User organizer) {
        Event e = new Event();
        e.setTitle(title);
        e.setCategory(category);
        e.setCity(city);
        e.setEventDate(date);
        e.setPrice(price);
        e.setSeats(seats);
        e.setRating(rating);
        e.setFeatured(featured);
        e.setVenue(venue);
        e.setImageUrl(img);
        e.setDescription(desc);
        e.setOrganizer(organizer);
        return e;
    }
}
