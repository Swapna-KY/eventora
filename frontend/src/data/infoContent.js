export const INFO_PAGES = {
  about: {
    title: 'About EventHub',
    sections: [
      { body: "EventHub started with a simple frustration: booking a ticket online usually feels like an afterthought bolted onto someone else's website. We wanted the booking experience itself to feel as good as the event you're about to attend." },
      { heading: 'What we do', body: 'We connect people across India with concerts, conferences, comedy nights, wellness retreats and everything in between - and we give organizers, from solo hosts to big venues, the same booking, payments, and analytics tools that the platform itself runs on.' },
      { heading: 'Where we are', body: "Headquartered in Bangalore, with events listed across Mumbai, Delhi, Hyderabad, Mysuru, Goa and beyond. If there's a city you'd like to see more events in, tell us - that's literally what the contact form below is for." },
    ],
  },
  careers: {
    title: 'Careers at EventHub',
    sections: [
      { body: "We're a small team building the booking platform we always wished existed. If that sounds like your kind of problem to work on, we'd like to hear from you." },
      {
        heading: 'Open roles', list: [
          'Backend Engineer (Spring Boot / MySQL) - Bangalore or remote',
          'Frontend Engineer (React) - Bangalore or remote',
          'Customer Support Associate - Bangalore',
          "Don't see your role? We still want to hear from you.",
        ],
      },
      { heading: 'How to apply', body: 'Send your resume and a short note about what you\'d want to build to careers@eventhub.in.' },
    ],
  },
  press: {
    title: 'Press & Media',
    sections: [
      { body: 'For interview requests, press inquiries, or to request brand assets, reach out to our media team directly.' },
      { heading: 'Media contact', body: 'press@eventhub.in' },
      { heading: 'Quick facts', list: ['Founded in Bangalore', 'Events listed across 7+ Indian cities', 'Built on a Spring Boot + MySQL backend with a React frontend'] },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      { body: 'These terms are a starting template for a project at this stage, not a final legal document - replace this with real terms (ideally reviewed by a lawyer) before taking real payments from real customers.' },
      { heading: '1. Bookings', body: 'When you book an event through EventHub, you enter into an agreement with the event organizer. EventHub facilitates the booking and payment but is not the organizer unless explicitly stated.' },
      { heading: '2. Accounts', body: "You're responsible for keeping your login credentials secure and for any activity that happens under your account." },
      { heading: '3. Hosting events', body: 'Anyone may create and publish an event. You are responsible for the accuracy of your event listing and for honoring the tickets sold against it.' },
      { heading: '4. Cancellations', body: 'See our Refund Policy for cancellation terms.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { body: 'This is placeholder copy for a project at this stage, not a compliance-ready privacy policy - replace it with real legal language before handling real user data in production.' },
      { heading: 'What we collect', body: 'Name, email, and city you provide when creating an account; booking history; and any message you submit through the contact form.' },
      { heading: 'What we don\u2019t do', body: "We don't sell your data to third parties. Your password is never stored in plain text - it's hashed before it ever reaches our database." },
      { heading: 'Your data, your call', body: 'You can update your name, city, or photo at any time from your dashboard. Contact us if you would like your account removed entirely.' },
    ],
  },
  refund: {
    title: 'Refund Policy',
    sections: [
      { body: 'You can cancel a booking yourself at any time from My Bookings or Upcoming Events in your dashboard, as long as the event hasn\u2019t already happened - cancelling immediately frees up the seats for someone else.' },
      { heading: 'Refund timeline', body: 'Refunds to your original payment method are typically processed within 5\u20137 business days of cancellation.' },
      { heading: 'After the event', body: "Bookings can't be cancelled once an event has passed." },
      { heading: 'Organizer cancellations', body: 'If an organizer cancels or reschedules an event, every attendee is automatically eligible for a full refund regardless of the timing.' },
    ],
  },
  pricing: {
    title: 'Pricing for Organizers',
    sections: [
      { body: 'Hosting an event on EventHub is free to list. We only make money when you do.' },
      {
        heading: 'How it works', list: [
          'Free to create and publish an event - no upfront cost',
          'Small platform fee per ticket sold, deducted automatically from each booking',
          'No fee at all on free (₹0) events',
          'You set your own ticket price and quantity, and can edit or cancel anytime from My Events',
        ],
      },
    ],
  },
  resources: {
    title: 'Resources for Organizers',
    sections: [
      { body: 'A few quick tips from events that performed well on the platform.' },
      {
        heading: 'Before you publish', list: [
          'Use a real, high-quality image - listings with a clear hero image get noticeably more bookings',
          'Write a description that says what someone will actually do or feel, not just what the event is called',
          'Price General/VIP/Group tiers thoughtfully - Group pricing in particular drives bulk bookings',
        ],
      },
      {
        heading: 'After you publish', list: [
          'Check your event\u2019s seat count regularly from My Events',
          'Keep an eye on Bookings under your dashboard to see who is attending',
          'If you need to cancel, do it as early as possible - your attendees get notified automatically',
        ],
      },
    ],
  },
};
