import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentForm } from '../components';

const PUBLIC_KEY = "pk_test_51M9iHxFBSEeFbPeSNkMYKPHttryM0cLdB41zNoIp0D6Wvx1wM6mgyYLmzxy1VkAhmCnLeaaEeMv00muEGZnXzKH000loS2ILt3";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Payment = () => {

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28">
            <div className='w-fit'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>P A Y M E N T.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <Elements stripe={stripeTestPromise}>
                <PaymentForm billPrice={billPrice} orderTime={orderTime} />
            </Elements>
        </section>
    )
};

export default Payment;
