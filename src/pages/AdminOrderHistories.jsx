import axios from "axios";
import { useState, useEffect } from "react";
import 'swiper/css';
import 'swiper/css/pagination';

const AdminOrderHistories = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleOrdersFetch = () => {
        axios.get('http://localhost:3000/api/histories')
            .then(function (response) {
                setOrders(response.data);
            })
            .then(function () {
                setIsLoading(true);
            })
    }

    useEffect(() => {
        handleOrdersFetch();
    }, []);

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28" >
            <div className='w-fit xs:mb-10'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>O R D E R &nbsp; H I S T O R I E S.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <div className="flex flex-1 flex-wrap gap-5">
                {
                    isLoading ?
                        orders.map(order => {
                            return (
                                <div key={order.id} className="w-[45%] border-solid border-2 border-primary text-lg text-dimWhite rounded-md">
                                    <div className="flex justify-between items-center gap-2 p-5">
                                        <div className="flex flex-col gap-3 justify-center">
                                            <div>Order ID: <span className="font-semibold">{order.id}</span> </div>
                                            <div>Customer name: <span className="font-semibold capitalize">{order.name}</span></div>
                                            <div>Username: <span className="font-semibold">{order.username}</span></div>
                                            <div>Phone number: <span className="font-semibold">{order.phone}</span></div>
                                            <div>Address: <span className="font-semibold capitalize">{order.address}</span></div>
                                            <div>Time: <span className="font-semibold capitalize">{order.time}</span></div>
                                            <div>Amount: <span className="font-semibold capitalize">{order.amount}</span></div>
                                            <div>Bill's Info:
                                                <p className="italic text-xl border-l-4 border-solid pl-5 p-2 mt-3 font-semibold"><span>Note:</span> {order.note}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null
                }
            </div>
        </section >
    )
};

export default AdminOrderHistories;
