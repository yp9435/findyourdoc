# FindyourDoc

FindyourDoc is a doctor listing and search interface built for the Campus Assessment by **Bajaj Finserv Health**. The goal was to create a clean and functional page to help users find doctors based on filters, search, and sort options — all done on the frontend.

**Live Site:** [https://findyourdoc-yeshi.vercel.app/doctors](https://findyourdoc-yeshi.vercel.app/doctors)

**Created By Yeshaswi:** [Portfolio](https://yeshipopo.vercel.app)

---

## How I made it

- **Framework**: Built with [Next.js 15](https://nextjs.org/), using the App Router.
- **Styling**: Done with TailwindCSS for a simple and clean layout.
- **Language**: TypeScript
- **Data Handling**:
  - Doctor data is fetched from the provided API once on load.
  - All filters, sorting, and search features run fully on the client side.
- **State Management**: Search and filters are synced with the URL using query parameters so the page remembers your selection even if you refresh or use the browser's back button.
- **Testing Ready**: Added all the `data-testid` attributes required for automation testing.

---

## Features

- Autocomplete search for doctor names
- Filters by:
  - Consultation mode (Video/In-Clinic)
  - Multiple specialties
- Sort by:
  - Fees (ascending)
  - Experience (descending)
- All functionality works on the client after the initial data load

---

## What I'd like to add next

This was a focused version of the platform for the assessment, but I'd love to keep building on it and eventually develop a full-featured site. Some things I have in mind for the future:

- A detailed doctor profile page with availability, reviews, and booking options
- Responsive design for mobile and tablets
- Option to favorite or bookmark doctors
- Animations and subtle transitions to make the UI feel smoother
- Possibly adding authentication and a simple dashboard for users

---
## Screenshots

### Dashboard
![Home Page](https://github.com/yp9435/findyourdoc/blob/main/screenshots/1.png?raw=true)

### Filter Panel
![Filter Panel](https://github.com/yp9435/findyourdoc/blob/main/screenshots/2.png?raw=true)

### Autocomplete 
![Autocomplete](https://github.com/yp9435/findyourdoc/blob/main/screenshots/3.png?raw=true)

---



Thank youuuuu!
