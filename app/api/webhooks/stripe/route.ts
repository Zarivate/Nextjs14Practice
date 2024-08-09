import { createTransaction } from "@/lib/actions/transaction.actions";
import { NextResponse } from "next/server";
import stripe from "stripe";

// This endpoint is pinged via a webhook setup in stripe
export async function POST(request: Request) {
  // Access body of request
  const body = await request.text();

  // Get signature to make sure request is valid
  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  // Create the event
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE if event type is one that was set in Stripe
  if (eventType === "checkout.session.completed") {
    // Grab parameters from data object
    const { id, amount_total, metadata } = event.data.object;

    // Format data into an object that fits the createTransaction Type parameters
    const transaction = {
      stripeId: id,
      amount: amount_total ? amount_total / 100 : 0,
      plan: metadata?.plan || "",
      credits: Number(metadata?.credits) || 0,
      buyerId: metadata?.buyerId || "",
      createdAt: new Date(),
    };

    const newTransaction = await createTransaction(transaction);

    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}
