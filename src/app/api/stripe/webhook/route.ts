import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { cartItemTable, cartTable, orderTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
  if (event.type === "checkout.session.completed") {
    console.log("Checkout session completed");
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (!orderId) {
      return NextResponse.error();
    }
    const [order] = await db
      .update(orderTable)
      .set({
        status: "paid",
      })
      .where(eq(orderTable.id, orderId))
      .returning({
        userId: orderTable.userId,
      });
    if (!order?.userId) {
      return NextResponse.error();
    }
    const [cart] = await db
      .select({
        id: cartTable.id,
      })
      .from(cartTable)
      .where(eq(cartTable.userId, order.userId));
    if (cart) {
      await db.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
    }
  }
  return NextResponse.json({ received: true });
};