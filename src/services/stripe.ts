import type { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'

let stripePromise: Stripe

const getStripe = async () => {
  if (!stripePromise) {
    // @ts-ignore
    stripePromise = new loadStripe('pk_test_51OIIVUBdsnzyC5hwP4XaKyu5wNpnGaEqgjKL3mnttdA9W6aspR3iJbMHhDpt2FNtlUzbFqeS7FWvY93f7sTFHBzg00xRxlN2m2')
  }

  return stripePromise
}

export default getStripe
