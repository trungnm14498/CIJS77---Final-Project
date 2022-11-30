import logo from '../assets/logo/test.png';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectItemTotal, selectItem } from '../redux/selectors';
import { weekdays } from '../components';
import cartHandleSlice from '../redux/cartHandleSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentForm } from '../components';

const PUBLIC_KEY = "pk_test_51M9iHxFBSEeFbPeSNkMYKPHttryM0cLdB41zNoIp0D6Wvx1wM6mgyYLmzxy1VkAhmCnLeaaEeMv00muEGZnXzKH000loS2ILt3";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Order = () => {
    const dispatch = useDispatch();

    const [groupItemsInCart, setGroupItemInCart] = useState([])

    const items = useSelector(selectItem);
    const totalPrice = useSelector(selectItemTotal);

    const taxPrice = parseFloat((totalPrice * 0.1).toFixed(2));
    const billPrice = totalPrice + taxPrice;

    // For the time now
    const currentdate = new Date();
    const orderTime = currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + " "
        + weekdays[new Date().getDay()] + ", "
        + currentdate.getDate() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getFullYear();

    useEffect(() => {
        const groupItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupItemInCart(groupItems);
    }, [items])

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto px-10 flex flex-col sm:mt-40 mt-28">
            <div className='w-fit'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>Y O U R &nbsp; O R D E R.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <div className="flex sm:flex-row flex-col mt-14 justify-between w-full">
                <div className="flex flex-col justify-start items-center relative border-2 border-solid border-[#A98E77] min-h-[600px] xs:w-[500px] w-full sm:m-0 mx-auto xs:p-10 p-5">
                    <div className='absolute top-[-50px] w-fit bg-[#151515]'>
                        <img src={logo} alt="" className='h-[120px] w-[120px]' />
                    </div>
                    <h3 className='font-semibold font-script md:text-5xl xs:text-4xl text-2xl xs:mt-6 mt-10 mb-3 p-3'>After 11 Restaurant</h3>
                    <div className='xs:text-base text-sm mb-8 text-center'>{orderTime}</div>

                    <div className='w-full h-[65%] overflow-scroll bill'>
                        {
                            Object.entries(groupItemsInCart).map((item, index) =>
                                <div key={index} className='flex justify-between items-center text-dimWhite mb-2'>
                                    <div className='w-[150px]'>{item[1][0].name}</div>
                                    <div>{item[1].length}</div>
                                    <div className='w-[80px] text-right'>{item[1][0].price * item[1].length}</div>
                                </div>)
                        }
                    </div>

                    <div className='flex justify-between items-center w-full text-lg font-semibold'>
                        <h4>Sub-Total</h4>
                        <span>$ {totalPrice}</span>
                    </div>

                    <div className='flex justify-between items-center w-full text-lg font-semibold my-1'>
                        <h4>10% Tax</h4>
                        <span>$ {taxPrice}</span>
                    </div>

                    <div className='h-[1px] w-full bg-dimWhite my-2' />

                    <div className='flex justify-between items-center w-full text-lg font-semibold'>
                        <h4>Total</h4>
                        <span>$ {billPrice}</span>
                    </div>
                </div>

                <Elements stripe={stripeTestPromise}>
                    <PaymentForm billPrice={billPrice} orderTime={orderTime} />
                </Elements>
            </div>
        </section >
    );
};

export default Order;
