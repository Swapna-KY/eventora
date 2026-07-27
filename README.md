# Eventora 🎟️✨

**Eventora** is a modern, high-performance, full-stack web application designed for discovering, hosting, and managing events seamlessly. Built with a sleek React frontend and a robust Spring Boot backend powered by MySQL.

---

## 🌟 Key Features

- 🎪 **Event Discovery & Filtering:** Browse curated featured events, filter by category (Music, Tech, Business, Comedy, Arts, Sports, Food), city, or search by event keywords.
- 🖼️ **Interactive Event Gallery:** High-resolution masonry gallery featuring event highlights with category filtering and full-screen lightbox viewing.
- 🎟️ **Instant Booking System:** Book seats, select ticket types (General Admission, VIP, Group), and receive instant e-tickets.
- ➕ **Host & Manage Events:** Registered users can create and publish their own events directly through the dashboard.
- ⚙️ **Admin Dashboard:** Administrative panel to manage events, track bookings, oversee contact inquiries, and view analytics.
- 💬 **Testimonials & Reviews:** Verified attendee reviews and ratings sharing real user experiences.
- 📱 **Fully Responsive & Modern UI:** Designed with smooth transitions, dynamic glassmorphism, responsive grid layouts, and fast loading times.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Vanilla CSS (Design Tokens, Grid & Flexbox) |
| **Backend** | Java 21, Spring Boot 3.2.5, Spring Data JPA, RESTful APIs |
| **Database** | MySQL Server 8.0 |
| **Authentication** | Custom Session/Token Auth with role-based access (USER / ADMIN) |

---

## 📁 Project Structure

```text
eventhub-fullstack/
├── backend/                  # Spring Boot REST API
│   ├── src/main/java/        # Java Controllers, Services, Models, Repositories
│   └── src/main/resources/   # Application properties & Database config
├── frontend/                 # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/       # UI Components (Navbar, Hero, Gallery, EventCard, etc.)
│   │   ├── pages/            # Page Views (Home, Events, Gallery, Contact, Admin, Dashboard)
│   │   ├── context/          # React Context (Auth, Data, Modal, Toast)
│   │   ├── styles/           # Modular CSS Design System
│   │   └── api/              # Axios / Fetch Client integration
│   └── index.html            # Main HTML template
└── add_events.sql            # Database seed script
```

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18+) & **npm**
- **Java JDK 21**
- **Maven**
- **MySQL Server 8.0**

---

### Step 1: Database Setup

1. Open your MySQL client (Command Line, MySQL Workbench, etc.) and create the database:
   ```sql
   CREATE DATABASE eventhub_db CHARACTER SET utf8mb4;
   ```
2. Run the seed script `add_events.sql` to populate sample events:
   ```bash
   mysql -u root -p eventhub_db < add_events.sql
   ```

---

### Step 2: Run the Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```
> The backend server will start on `http://localhost:3035` (or configured port).

---

### Step 3: Run the Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
> The application will open locally at `http://localhost:5173`.
<<<<<<< HEAD
---

## 📄 License & Credits

=======

---



## 📄 License & Credits

>>>>>>> 1248cb4 (Connect frontend to live Render backend API)
- Developed by **Swapna KY**
- Designed for seamless event ticketing and management.
