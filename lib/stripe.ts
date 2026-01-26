import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2025-08-27.basil", // ✅ updated API version
  appInfo: {
    name: "nextjs-with-stripe-typescript-demo",
    url: "http://localhost:3000",
  },
});
