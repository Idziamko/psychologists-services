# Psychologists.Services

A web app for a company that offers professional psychologist services. Users can
browse psychologists, sort the list, read reviews, save favorites and book a trial
appointment.

Live demo: https://idziamko.github.io/psychologists-services/

## Features

- Email and password authentication with Firebase (sign up, log in, log out).
- Home page with the company slogan and a call to action.
- Psychologists page with sorting by name, price and rating.
- Three cards per page, the rest are loaded on demand with a new database request.
- Expandable card with the full description and client reviews.
- Favorites saved per user and restored after a page reload.
- Private Favorites page available only to signed in users.
- Appointment form in a modal window with field validation.
- Modals close with the close button, a backdrop click and the Escape key.
- Fluid layout from 320px to 1440px.

## Tech stack

- React 18 and Vite 6 with TypeScript
- React Router 6
- Firebase Authentication and Realtime Database
- react-hook-form and yup
- CSS Modules
- react-hot-toast

## Design and specification

- Figma layout: [Psychologists.Services](https://www.figma.com/design/AK60wIj6R8xYZ3NCTRZyQP/Psychologists.Services--Copy-)
- Technical specification: GoIT pet project «Psychologists.Services»

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` with the credentials of your own Firebase project:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

In the Firebase console enable Email/Password authentication, create a Realtime
Database, publish the rules from `database.rules.json` and import the
psychologists collection.

## Scripts

| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | start the dev server       |
| `npm run build`  | type-check and build for production |
| `npm run preview`| preview the built app      |
| `npm run lint`   | run ESLint                 |
| `npm run format` | format the source with Prettier |
| `npm run deploy` | build and publish to GitHub Pages |

## Project structure

```
src/
  assets/       images used in the layout
  components/   reusable interface components
  contexts/     authentication and favorites providers
  firebase/     Firebase initialization
  hooks/        custom hooks
  pages/        route level components
  services/     Firebase requests
  styles/       design tokens and global styles
  types/        shared TypeScript types
  utils/        validation schemas and helpers
```
