import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY!, {
  apiVersion: '2023-10-16'
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { car, totalCost } = req.body 

      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [],
        line_items: [{
          price_data: {
            currency: 'USD',
            product_data: {
              name: car.model,
              images: [car.image.url],
            },
            unit_amount: totalCost * 100
          },
          adjustable_quantity: {
            enabled: false,
          },
          quantity: 1
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`
      });

      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : null
      });
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed');
  }
}
