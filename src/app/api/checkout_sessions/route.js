import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";
import { getSession } from "better-auth/api";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const userSession = await getSession()

    const title = formData.get("title");
    const price = Number(formData.get("price"));

    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: userSession?.customer_email,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/dashboard/pricing-upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
