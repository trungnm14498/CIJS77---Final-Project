import logo from '../assets/logo/test.png';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectItemTotal, selectItem, billPriceSelector, orderTimeSelector } from '../redux/selectors';
import { weekdays } from '../components';
import cartHandleSlice from '../redux/cartHandleSlice';

const Order = () => {
    const dispatch = useDispatch();

    const [groupItemsInCart, setGroupItemInCart] = useState([])

    const items = useSelector(selectItem);
    const totalPrice = useSelector(selectItemTotal);

    const taxPrice = parseFloat((totalPrice * 0.1).toFixed(2));
    const billPrice = totalPrice + taxPrice;

    // For the time now
    const currentdate = new Date();
    const datetime = currentdate.getHours() + ":"
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

    const handleSubmit = (e) => {
        dispatch(
            cartHandleSlice.actions.setBillPrice(billPrice)
        )
        dispatch(
            cartHandleSlice.actions.setOrderTime(datetime)
        )
        e.preventDefault();
    }

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
                    <div className='xs:text-base text-sm mb-8 text-center'>{datetime}</div>

                    <div className='w-full h-[65%] overflow-scroll bill'>
                        {
                            Object.entries(groupItemsInCart).map((item, index) =>
                                <div key={index} className='flex justify-between items-center text-dimWhite mb-2'>
                                    <div className='w-[150px]'>{item[1][0].name}</div>
                                    <div>{item[1].length}</div>
                                    <div className='w-[80px] text-right'>{item[1][0].price * item[1].length}</div>
                                </div>)
                        }
                        {/* <div className='flex justify-between items-center text-dimWhite mb-2'>
                            <div className='w-[150px]'>Pho Bo</div>
                            <div>2</div>
                            <div className='w-[80px] text-right'>$ 60</div>
                        </div>
                        <div className='flex justify-between items-center text-dimWhite mb-2'>
                            <div className='w-[150px]'>Bun Bo Hue</div>
                            <div>2</div>
                            <div className='w-[80px] text-right'>$ 70</div>
                        </div>
                        <div className='flex justify-between items-center text-dimWhite mb-2'>
                            <div className='w-[150px]'>Bun Cha</div>
                            <div>2</div>
                            <div className='w-[80px] text-right'>$ 60</div>
                        </div>
                        <div className='flex justify-between items-center text-dimWhite mb-2'>
                            <div className='w-[150px]'>Bac Xiu</div>
                            <div>2</div>
                            <div className='w-[80px] text-right'>$ 10</div>
                        </div>
                        <div className='flex justify-between items-center text-dimWhite mb-2'>
                            <div className='w-[150px]'>Banh Chuoi</div>
                            <div>2</div>
                            <div className='w-[80px] text-right'>$ 10</div>
                        </div> */}
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

                <form className='flex flex-col xs:w-[550px] w-full gap-5 items-center sm:mx-5 mx-auto sm:mt-0 mt-10'>
                    <div className='flex xs:flex-row flex-col xs:justify-between justify-start w-full gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className='text-lg text-dimWhite'>Full Name</label>
                            <input type="text" name="name" id="name" className='p-3 bg-transparent border-2 border-solid border-[#A98E77] rounded-lg text-lg appearance-none' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phone" className='text-lg text-dimWhite'>Phone number</label>
                            <input type="tel" name="phone" id="phone" className='p-3 bg-transparent border-2 border-solid border-[#A98E77] rounded-lg text-lg appearance-none ' required />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="address" className='text-lg text-dimWhite'>Address</label>
                        <input type="text" name='address' id='address' className='p-3 bg-transparent border-2 border-solid border-[#A98E77] rounded-lg text-lg appearance-none' required />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="note" className='text-lg text-dimWhite'>Note</label>
                        <textarea name="note" id="note" rows="7" className='p-3 bg-transparent border-2 border-solid border-[#A98E77] rounded-lg text-lg resize-none appearance-none' required></textarea>
                    </div>

                    <button type="submit" className='btn-sub w-fit' onSubmit={handleSubmit}>Order now!</button>
                </form>
            </div>
        </section>
    );
};

export default Order;
