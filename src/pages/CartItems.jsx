import ItemInCart from "../components/ItemInCart";
import { useSelector } from 'react-redux';
import { selectItemTotal, selectItem, isLoginedSelector } from '../redux/selectors';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const CartItems = () => {
    const isLogined = useSelector(isLoginedSelector)

    const [groupItemsInCart, setGroupItemInCart] = useState([])
    const items = useSelector(selectItem);
    const totalPrice = useSelector(selectItemTotal);

    useEffect(() => {
        const groupItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupItemInCart(groupItems)
    }, [items])

    return (
        <section className="xl:max-w-[1400px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28">
            <div className='w-fit mb-5'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>Y O U R &nbsp;C A R T.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <div className='flex flex-col justify-center'>
                <span className='text-right text-2xl m-5'>Total: $ {totalPrice}</span>
                <div className='flex flex-wrap justify-center items-center gap-x-14 gap-y-10'>
                    {
                        Object.entries(groupItemsInCart).map(([key, item]) =>
                            <ItemInCart key={item[0].id + 1} id={item[0].id} name={item[0].name} price={item[0].price} image={item[0].image} amount={item.length} items={items} />)
                    }
                </div>
                <div className='mx-auto mt-20 flex xs:flex-row flex-col gap-2 justify-center items-center'>
                    <Link to='/menu/starter' className="btn-sub sm:text-xl text-lg sm:mb-2 w-fit xs:mr-10 mr-0">Back To Menu</Link>
                    <Link to='/order' className="btn-main sm:text-xl text-lg sm:mb-2 w-fit">Go to Checkout</Link>

                </div>
                {!isLogined && <p style={{ color: "red", margin: "0 auto" }}>Please log in to check out</p>}
            </div>
        </section>
    );
};

export default CartItems;
