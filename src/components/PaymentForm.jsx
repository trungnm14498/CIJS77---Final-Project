import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { accountInfoSelector } from '../redux/selectors';

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '24px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': { color: '#87bbfd' },
            '::placeholder': { color: '#87bbfd' },
        },
        invalid: {
            iconColor: '#f74a61',
            color: '#f74a61',
        },
    },
};

const PaymentForm = ({ billPrice, orderTime }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const accountInfo = useSelector(accountInfoSelector);

    const [orderInfo, setOrderInfo] = useState({
        name: accountInfo.name,
        phone: accountInfo.phone,
        address: accountInfo.address,
        note: '',
    });

    const handleOnChange = (e) => {
        let newValue = e.target.value;
        setOrderInfo((prev) => {
            return { ...prev, [e.target.name]: newValue };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { method } = paymentMethod;
                const response = await axios
                    .post('https://after-eleven-server.herokuapp.com/api/histories', {
                        amount: billPrice,
                        time: orderTime,
                        method: method,
                        username: accountInfo.username,
                        name: orderInfo.name,
                        phone: orderInfo.phone,
                        address: orderInfo.address,
                        note: orderInfo.note,
                    })
                    .then(function () {
                        alert('Successful Payment! Thanks for your trust!');
                    })
                    .then(function () {
                        navigate('/');
                    });
            } catch (error) {
                alert('Check info again!');
            }
        } else {
            console.log(error.message);
        }
    };

    return (
        <div>
            {
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col xs:w-[550px] w-full gap-5 items-center sm:mx-5 mx-auto sm:mt-0 mt-10"
                >
                    <div className="flex xs:flex-row flex-col xs:justify-between justify-start w-full gap-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-lg text-dimWhite">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="p-3 bg-transparent border-2 border-solid border-[#A98E77] rounded-lg text-lg appearance-none"
                                defaultValue={accountInfo.name}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="text-lg text-dimWhite">
                                Phone number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="p-3 bg-transparent border-2 border-solid border-[#A98E77] rounded-lg text-lg appearance-none "
                                defaultValue={accountInfo.phone}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="address" className="text-lg text-dimWhite">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            className="p-3 bg-transparent border-2 border-solid border-[#A98E77] rounded-lg text-lg appearance-none"
                            defaultValue={accountInfo.address}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="note" className="text-lg text-dimWhite">
                            Note
                        </label>
                        <textarea
                            name="note"
                            id="note"
                            rows="7"
                            className="p-3 bg-transparent border-2 border-solid border-[#A98E77] rounded-lg text-lg resize-none appearance-none"
                            placeholder="Anything we need to pay attention to?"
                            onChange={handleOnChange}
                        ></textarea>
                    </div>

                    <fieldset className="w-full m-5 border-solid border-4 rounded-lg bg-slate-500">
                        <div className="p-5">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button type="submit" className="btn-sub text-2xl font-semibold">
                        Pay
                    </button>
                </form>
            }
        </div>
    );
};

export default PaymentForm;