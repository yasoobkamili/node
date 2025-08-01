# SEVA Service Booking Platform

## Overview

SEVA is a Node.js web application for booking and managing household services such as cleaning, plumbing, and laundry. It features user authentication, profile management, and a full booking workflow, all backed by MongoDB and rendered with EJS templates.

## Features

- User registration and login (with secure password hashing)
- Session-based authentication
- Book cleaning, plumbing, and laundry services
- View and manage your bookings (cancel bookings)
- User profile page with booking stats
- Logout functionality

## Tech Stack

- Node.js, Express.js
- MongoDB (Mongoose)
- EJS (Embedded JavaScript Templates)
- express-session for authentication
- method-override for RESTful form actions

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd node
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start MongoDB:**
   Ensure MongoDB is running locally on the default port (27017).

4. **Start the server:**

   ```bash
   node src/index.js
   # or, for auto-reload:
   npx nodemon src/index.js
   ```

5. **Open the app:**
   Visit [http://localhost:5000](http://localhost:5000) in your browser.

## Usage

- **Register** a new account via the signup page.
- **Log in** with your credentials.
- **Book a service** using the form on the main page.
- **View your bookings** at `/mybookings`.
- **Cancel bookings** directly from the bookings page.
- **View and edit your profile** at `/myprofile`.
- **Log out** via the user menu or `/logout`.

## Testing

- Use the UI to register, log in, book services, and manage bookings.
- You can also use tools like Postman to test API endpoints (see routes in `routes/booking.js` and `routes/profile.js`).

## Project Structure

- `src/` - Main server code
- `models/` - Mongoose models (User, Booking)
- `controllers/` - Route logic
- `routes/` - Express route definitions
- `views/` - EJS templates for frontend
- `public/` - Static assets (CSS)

## Notes

- For production, change the session secret in `src/index.js` to a strong, secure value.
- Make sure MongoDB is running before starting the app.

---

**SEVA** - Simplifying home service bookings!
