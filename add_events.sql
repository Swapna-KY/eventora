USE eventhub_db;

-- ── Step 1: Fix existing events (update to future dates + mark all featured) ──
UPDATE events SET event_date='Feb 14, 2027', title='AI Summit 2027', featured=1 WHERE title='AI Summit 2026';
UPDATE events SET event_date='Sep 12, 2026', featured=1 WHERE title='Startup Founders Mixer';
UPDATE events SET event_date='Aug 22, 2026', featured=1 WHERE title='Indie Music Night';
UPDATE events SET event_date='Aug 30, 2026', featured=1 WHERE title='Comedy Carnival';
UPDATE events SET event_date='Oct 05, 2026', featured=1 WHERE title='Modern Art Exhibition';
UPDATE events SET event_date='Sep 20, 2026', featured=1 WHERE title='Mindful Wellness Retreat';
UPDATE events SET event_date='Aug 10, 2026', featured=1 WHERE title='Culinary Masterclass';
UPDATE events SET event_date='Nov 02, 2026', featured=1 WHERE title='Marathon for a Cause';

-- ── Step 2: Add 6 more new events (admin user id = 1) ──
INSERT INTO events (title, category, city, event_date, price, seats, rating, featured, venue, image_url, description, organizer_id, created_at)
VALUES
(
  'Bangalore Design Week',
  'Art & Culture',
  'Bangalore',
  'Aug 18, 2026',
  799.00, 200, 4.7, 1,
  'NIMHANS Convention Centre',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  'A celebration of architecture, graphic design, and product innovation by South India''s best creative minds.',
  1, NOW()
),
(
  'Telugu Film Music Night',
  'Music',
  'Hyderabad',
  'Sep 06, 2026',
  1299.00, 500, 4.8, 1,
  'Hitex Exhibition Centre',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
  'An electrifying live concert celebrating iconic Telugu film music across decades.',
  1, NOW()
),
(
  'Startup India Pitch Fest',
  'Business',
  'Bangalore',
  'Oct 18, 2026',
  1499.00, 300, 4.6, 1,
  'Taj MG Road',
  'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=900&q=80',
  'Top 50 startups pitch live to a panel of 20 investors. Network, learn, and get inspired.',
  1, NOW()
),
(
  'Yoga & Meditation Camp',
  'Wellness',
  'Mysuru',
  'Aug 28, 2026',
  2499.00, 50, 4.9, 1,
  'Mysore Palace Grounds',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
  'A full-day outdoor yoga and guided meditation camp in the heart of the Yoga capital of India.',
  1, NOW()
),
(
  'Street Food Festival',
  'Food & Drink',
  'Mumbai',
  'Sep 27, 2026',
  399.00, 1000, 4.5, 1,
  'Bandra Kurla Complex Grounds',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
  'Over 80 stalls featuring the best street food from every corner of India — all under one roof.',
  1, NOW()
),
(
  'Half Marathon Mysuru',
  'Sports',
  'Mysuru',
  'Nov 15, 2026',
  599.00, 800, 4.6, 1,
  'Mysore Palace to KRS Road',
  'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=900&q=80',
  'Run through the heritage streets of Mysuru in this scenic half marathon open to all fitness levels.',
  1, NOW()
);

-- ── Verify all events ──
SELECT id, title, event_date, featured FROM events ORDER BY id;
