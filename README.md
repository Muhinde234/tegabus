# TegaBus

TegaBus is a modern bus booking platform built with Next.js, React, and TypeScript. It features advanced seat selection, admin dashboards, Stripe integration, and multi-language support.

## Features

- **Bus Seat Selection:** Interactive seat map with real-time selection and reservation status.
- **Admin Dashboard:** View stats, manage bookings, and monitor bus schedules.
- **Stripe Payments:** Secure online payments for seat bookings.
- **Multi-language Support:** Easily switch between English, French, and Kinyarwanda.
- **Responsive UI:** Built with Tailwind CSS and Radix UI components.

## Tech Stack

- [Next.js](https://nextjs.org/) (v15)
- [React](https://react.dev/) (v19)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Stripe](https://stripe.com/) for payments
- [next-intl](https://github.com/amannn/next-intl) for i18n
- [react-day-picker](https://react-day-picker.js.org/) for calendar UI
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```sh
git clone https://github.com/yourusername/tegabus.git
cd tegabus
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```sh
npm run build
npm start
```

## Project Structure

- `app/` - Next.js app directory (pages, layouts, API routes)
- `components/` - Reusable UI and dashboard components
- `public/` - Static assets (images, icons)
- `messages/` - Localization files (JSON)
- `utils/` - Utility functions (e.g., Stripe, greetings)
- `config/` - Configuration files

## Key Files

- **Admin Dashboard:** [`app/[locale]/admin/page.tsx`](app/[locale]/admin/page.tsx)
- **Seat Selection Page:** [`app/[locale]/(guest)/schedule/page.tsx`](app/[locale]/(guest)/schedule/page.tsx)
- **Dependencies:** [`package.json`](package.json)

## Environment Variables

Create a `.env` file for your environment variables (e.g., Stripe keys).

## License

MIT
