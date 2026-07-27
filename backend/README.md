# EventHub Backend (Spring Boot + MySQL)

REST API for the EventHub event booking platform: events, bookings, users, saved events (wishlist),
notifications, and admin analytics. JWT-based authentication.

## 1. Prerequisites
- Java 17+
- Maven 3.8+ (or use your IDE's built-in Maven)
- MySQL 8 running locally (or remotely)

## 2. Create the database
```sql
CREATE DATABASE eventhub_db CHARACTER SET utf8mb4;
```
That's all you need to run manually — Hibernate creates the tables automatically on first boot
(`spring.jpa.hibernate.ddl-auto=update`). `schema-reference.sql` is included only as a reference
if you ever want to manage the schema by hand instead.

## 3. Configure
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```
Change `jwt.secret` to your own random string before deploying anywhere outside your laptop.

## 4. Run
```bash
mvn spring-boot:run
```
The API starts on **http://localhost:3035**.

On first run, `DataSeeder.java` automatically inserts:
- 9 sample events (the same ones from the frontend demo)
- An admin account: `admin@eventhub.in` / `admin123`
- A regular user account: `demo@eventhub.in` / `demo123`

## 5. Quick test
```bash
# Public: list events
curl http://localhost:3035/api/events

# Login
curl -X POST http://localhost:3035/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@eventhub.in","password":"demo123"}'
# -> copy the "token" value from the response

# Book an event (replace TOKEN)
curl -X POST http://localhost:3035/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"eventId":1,"ticketType":"GENERAL","quantity":2,"attendeeName":"Demo User","attendeeEmail":"demo@eventhub.in"}'
```

## API Overview

| Method | Endpoint                      | Auth        | Description                          |
|--------|--------------------------------|-------------|---------------------------------------|
| POST   | /api/auth/register             | Public      | Create a USER account                |
| POST   | /api/auth/login                 | Public      | Get a JWT token                      |
| GET    | /api/events                     | Public      | List all events (supports `?featured=true`, `?q=`, `?city=`) |
| GET    | /api/events/{id}                | Public      | Single event                         |
| POST   | /api/events                     | Logged in   | Create an event - **any logged-in user can host an event**, not just admins. You become its organizer. |
| PUT    | /api/events/{id}                | Logged in   | Update an event - only its organizer or an admin can do this |
| DELETE | /api/events/{id}                | Logged in   | Delete an event - only its organizer or an admin can do this |
| POST   | /api/bookings                   | Logged in   | Book tickets (price computed server-side) |
| GET    | /api/bookings/my                | Logged in   | Your own bookings                    |
| PATCH  | /api/bookings/{id}/cancel        | Logged in   | Cancel a booking you made (or any, if admin) - restores seats |
| GET    | /api/bookings                   | ADMIN       | All bookings (supports `?q=`)        |
| GET    | /api/saved                      | Logged in   | Your saved/wishlist events           |
| POST   | /api/saved/{eventId}            | Logged in   | Save an event                        |
| DELETE | /api/saved/{eventId}            | Logged in   | Unsave an event                      |
| GET    | /api/notifications               | Logged in   | Your notifications                   |
| PATCH  | /api/notifications/{id}/read     | Logged in   | Mark a notification read             |
| GET    | /api/users/me                    | Logged in   | Your profile                         |
| PUT    | /api/users/me                    | Logged in   | Update name/city/photoUrl            |
| GET    | /api/admin/analytics             | ADMIN       | Revenue, tickets sold, charts data   |
| GET    | /api/stats                       | Public      | Homepage stats strip (events/attendees/cities/venues) - computed from real data |
| GET    | /api/testimonials                | Public      | Latest customer testimonials                |
| POST   | /api/testimonials                | Logged in   | Submit your own testimonial (name/city come from your account) |
| POST   | /api/contact                      | Public      | Submit the "Let's talk events" contact form - persisted, not just a frontend toast |
| GET    | /api/admin/messages               | ADMIN       | View submitted contact messages       |
| PATCH  | /api/admin/messages/{id}/read      | ADMIN       | Mark a contact message as read        |

Every "Logged in" / "ADMIN" route requires header: `Authorization: Bearer <token>`.

## Notes
- **If you already ran this app before this update**: `users.photo_url` was widened from a short
  text column to `MEDIUMTEXT` so an uploaded profile photo can actually be saved (a base64 image
  is much longer than the old default). Hibernate's `ddl-auto=update` reliably adds new
  columns/tables but doesn't always alter an *existing* column's type - if photo uploads still
  fail after pulling this update, run this once:
  `ALTER TABLE users MODIFY photo_url MEDIUMTEXT;`
- **Event ownership**: any logged-in user can create an event (`Event.organizer`). Editing/deleting
  is restricted server-side in `EventService.assertCanModify()` to the event's organizer or an
  admin - this can't be bypassed from the frontend since it's enforced in the service layer, not
  just hidden in the UI.
- Ticket pricing (General / VIP / Group multipliers) is calculated **server-side** in `TicketType.java`
  and `BookingService.java` — the client only sends the ticket type and quantity, never the price.
  This means nobody can tamper with prices from the browser.
- CORS is wide open (`*`) for local development in `CorsConfig.java`. Restrict this to your real
  frontend domain before deploying anywhere public.
