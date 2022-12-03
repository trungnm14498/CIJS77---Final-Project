import axios from "axios";
import { useState, useEffect } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { orderSort1API, orderSort2API, orderSort3API, orderSort4API, orderFirstPageAPI, orderAPI } from "../hooks";
import { useGetOrderHistories } from "../hooks/feedbacks/useGetOrderHistories";

const AdminOrderHistories = () => {

    const { ordersByYear, count, isLoading, setIsLoading, filters } = useGetOrderHistories(true, orderAPI)

    const [orders, setOrders] = useState([]);
    const [direction, setDirection] = useState('first');
    const [urlByAmount, setUrlByAmount] = useState('')
    const [isShow, setIsShow] = useState(true);

    const years = Array.from(new Set(filters));

    const [currentUrl, setCurrentUrl] = useState(orderFirstPageAPI);

    function parseLinkHeader(linkHeader) {
        const linkHeadersArray = linkHeader.split(", ").map(header => header.split("; "));
        const linkHeadersMap = linkHeadersArray.map(header => {
            const thisHeaderRel = header[1].replace(/"/g, "").replace("rel=", "");
            const thisHeaderUrl = header[0].slice(1, -1);
            return [thisHeaderRel, thisHeaderUrl]
        });
        return Object.fromEntries(linkHeadersMap);
    }

    const handleOrdersFetch = (direction) => {
        axios.get(currentUrl)
            .then(function (response) {
                setIsShow(true);
                let linkHeaders = parseLinkHeader(response.headers.get('Link'));
                if (!!linkHeaders[direction]) {
                    setCurrentUrl(linkHeaders[direction]);
                    axios.get(linkHeaders[direction])
                        .then(function (response) {
                            setOrders(response.data);
                            setUrlByAmount('');
                        }).then(function () {
                            setIsLoading(true);
                            setDirection('');
                        });
                }
            })
    }

    const nextPage = () => {
        setDirection('next');
    }

    const prevPage = () => {
        setDirection('prev');
    }

    const filterAmount = (e) => {
        switch (e.target.value) {
            case "all":
                handleOrdersFetch('first');
            case "1":
                setUrlByAmount(orderSort1API);
                break;
            case "2":
                setUrlByAmount(orderSort2API);
                break;
            case "3":
                setUrlByAmount(orderSort3API);
                break;
            case "4":
                setUrlByAmount(orderSort4API);
            default:
                break;
        }
    }

    const filterYear = (e) => {
        setOrders(ordersByYear.filter(order => order.time.includes(e.target.value)));
        setIsShow(false);
    }

    const fetchByAmount = () => {
        if (urlByAmount != '') {
            setIsShow(false);
            axios.get(urlByAmount)
                .then(function (response) {
                    setOrders(response.data);
                    setCount(response.data.length);
                })
        }
    }

    useEffect(() => {
        handleOrdersFetch(direction);
    }, [direction]);

    useEffect(() => {
        fetchByAmount();
    }, [urlByAmount])

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28" >
            <div className='w-fit xs:mb-10'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>O R D E R &nbsp; H I S T O R I E S.</h2>
                <div className='h-[3px] bg-cf-gradient' />
                <div className="font-semibold text-dimWhite text-xl xs:mt-10 mt-3">Order histories count: {count}</div>
            </div>

            <div className="text-dimWhite text-lg flex flex-col items-start gap-5">
                <div className="flex items-center gap-5 xs:mt-0 mt-3">
                    <label htmlFor="byYear">Filter by Year</label>
                    <select name="byYear" className="bg-gray-300 text-black px-3 py-1 rounded-md" onChange={filterYear} defaultValue='2022'>
                        {
                            years.map(year => <option key={year} value={year}>{year}</option>)
                        }
                    </select>
                </div>

                <div className="flex items-center gap-5 mb-10">
                    <label htmlFor="byYear" className="">Filter by Amount</label>
                    <select name="byYear" className="bg-gray-300 text-black px-3 py-1 rounded-md text-center" onChange={filterAmount} defaultValue='all'>
                        <option value='all' >All</option>
                        <option value="1">$0 - $50</option>
                        <option value="2">$50 - $100</option>
                        <option value="3">$100 - $150</option>
                        <option value="4">&gt; $150</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-1 flex-wrap gap-10 justify-center">
                {
                    isLoading ?
                        orders.map(order => {
                            return (
                                <div key={order.id} className="w-[420px] sm:h-[520px] h-fit border-solid border-2 border-primary text-lg text-dimWhite rounded-md">
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
            {isShow && <div className="flex gap-20 items-center justify-center mt-10">
                <button className='btn-sub flex justify-center items-center gap-5 font-semibold text-xl' onClick={prevPage}><AiOutlineArrowLeft /> Prev </button>
                <button className="btn-sub flex justify-center items-center gap-5 font-semibold text-xl" onClick={nextPage}><AiOutlineArrowRight /> Next </button>
            </div>}
        </section >
    )
};

export default AdminOrderHistories;
