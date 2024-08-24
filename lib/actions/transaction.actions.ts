// This file is for handling anything related to Clerk side transactions such as checkouts
"use server";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import Transaction from "../database/models/transaction.model";
import { updateCredits } from "./user.actions";
import { CheckoutTransactionParams, CreateTransactionParams } from "@/types";

// Function to handle payment processes
export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  // Create a Stripe instance
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // Stripe processes transactions in cents so multiply by 100 to get the dollar amount
  const amount = Number(transaction.amount) * 100;

  // Create Stripe session using user data
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SECURE_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SECURE_URL}/`,
  });
  redirect(session.url!);
}

// Creates a transaction record in the database. Will be triggered using a Stripe webhook that triggers once payment is completed.
export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    await connectToDatabase();

    // Create transaction using buyer ID
    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });

    // Update the user credits
    await updateCredits(transaction.buyerId, transaction.credits);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
}
