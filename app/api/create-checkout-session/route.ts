import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import {CURRENCY} from "@/config";
import { formatAmountForStripe } from '@/utils/stripe-helpers';

export async function POST(req: NextRequest) {
    try {
        const { selectedSeats, totalPrice } = await req.json();

        if (!selectedSeats || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
            return NextResponse.json({ error: 'Invalid selected seats' }, { status: 400 });
        }
        if (!totalPrice || typeof totalPrice !== 'number') {
            return NextResponse.json({ error: 'Invalid total price' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: CURRENCY,
                        product_data: {
                            name: 'Bus Ticket',
                            description: `Seats: ${selectedSeats.join(', ')}`,
                        },
                        unit_amount: formatAmountForStripe(2500, CURRENCY), // 2500 RWF per seat
                    },
                    quantity: selectedSeats.length,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/cancel`,
            metadata: {
                selectedSeats: selectedSeats.join(','),
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
}