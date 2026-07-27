# EventHub — Frontend (React + Vite)

A proper multi-file React app (components, pages, contexts, API client, CSS all separated)
that talks to the Spring Boot + MySQL backend over REST.

```
src/
├── api/            fetch wrapper + one module per resource (events, bookings, auth, saved, notifications, analytics)
├── components/      Navbar, Hero, EventCard, FeaturedEvents, BookingModal, AuthModal, ...
├── context/         AuthContext, DataContext, ModalContext, NavigationContext, ToastContext
├── dashboard/        panels used by the user + admin dashboards (Profile, Bookings, Analytics, ...)
├── pages/            Home, UserDashboard, AdminDashboard
├── hooks/             useReveal (scroll animations), useCountUp (stats counters)
├── styles/            one .css file per area (navbar, hero, cards, sections, modals, dashboard, toast)
└── data/              static content not backed by the database (gallery, testimonials, FAQ, ticket types)
```

## Run it

```bash
npm install
cp .env.example .env   # adjust VITE_API_BASE if your backend isn't on localhost:3035
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). Make sure the backend
(`../backend`) is running first — see its own README for MySQL + Spring Boot setup.

```bash
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint
```

## How it talks to the backend

`src/api/client.js` is the only place that knows about `fetch()`, the JWT header, and error
parsing. Every other API module (`events.js`, `bookings.js`, ...) just calls `api.get/post/put/del`.

`src/api/mappers.js` translates backend field names (`eventDate`, `imageUrl`, `bookingReference`...)
into the shorter names the components use (`date`, `img`, `id`...) — so if the backend's JSON
shape ever changes, this is the one file to update.

The JWT is stored in `localStorage` (see `getToken`/`setToken` in `client.js`), so — unlike a
single-file demo — logging in survives a page refresh here.

## State

Four small Context providers (in `src/context`) replace what would otherwise be prop-drilling:
- **AuthContext** — current user, login/register/logout, restores session from `localStorage` on load
- **DataContext** — events/bookings/saved/notifications + all the mutating actions (book, save, admin CRUD)
- **ModalContext** — which modal (auth/booking) is open
- **NavigationContext** — which "page" is active (home/dashboard/admin), with login/role guards built in

## Known simplifications (same ones as the original prototype, see backend README too)
- Profile photo & admin "event image" upload preview locally only (`FileReader`) — not persisted,
  since that needs a real file-upload endpoint on the backend.
- Gallery photos, testimonials, sponsors, FAQ copy, and category list (`src/data/staticContent.js`)
  are static — there's no database table for them since the brief didn't need them admin-editable.
