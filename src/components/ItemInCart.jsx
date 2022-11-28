import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartHandleSlice from '../redux/cartHandleSlice';
import { addedItemSelector } from '../redux/selectors';

const ItemInCart = ({ id, name, price, image, amount, type, items }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addedItem = useSelector(addedItemSelector);

    const totalPriceSingleItem = price * amount;
    // const addedItem = useSelector(cartedItemsSelector);

    // const [number, setNumber] = useState(amount);
    // const [subPrice, setSubPrice] = useState(number * price);

    const handleMinusBtn = () => {
        // if (number > 0) {
        //     setNumber(number - 1);
        //     setSubPrice(number * price);
        // } else setSubPrice(0)
        dispatch(cartHandleSlice.actions.deleteItem(id));
    }

    const handlePlusBtn = () => {
        // dispatch(cartHandleSlice.actions.incrAmountItem(id));
        // setNumber(addedItem.find(item => item.id === id).amount);

        // setNumber(addedItem.find(item => item.id === id));
        // setSubPrice(number * price);
        dispatch(cartHandleSlice.actions.addItem({ id, image, name, price, type }))
    }
    const handleDeleteBtn = () => {
        dispatch(cartHandleSlice.actions.deleteAllItems(id));
        console.log(addedItem);
        // itemDisplay.splice(itemDisplay.findIndex(item => item.id === id), 1);
    };

    useEffect(() => {
        items.length === 0 ? navigate('/cartEmpty') : null;
    }, [items])

    return (
        <div className="flex xs:flex-row flex-col card w-[600px] xs:gap-0 gap-3">
            <div className='border-[4px] border-solid border-[#82674f] w-fit rounded-full xs:mr-5 xs:my-2 xs:ml-3 mr-2'>
                <img src={image} alt="item-1" className='rounded-full w-[200px] h-[200px] p-2' />
            </div>
            <div className='flex flex-col justify-evenly mr-3 xs:gap-0 gap-3'>
                <h3 className='font-semibold text-2xl'>{name}</h3>
                <div className='flex justify-start items-center text-secondary text-lg'>
                    <span className='xs:mr-8 mr-1'>$ {price}</span>
                    <span>Total: $ {totalPriceSingleItem}</span>
                </div>
                <div className='flex items-center justify-between gap-24'>
                    <div className='flex items-center gap-6'>
                        <button className='bg-[#82674f] p-1 rounded-full' onClick={handleMinusBtn}>
                            <AiOutlineMinus className='h-[20px] w-[20px] text-white' />
                        </button>
                        <span className='font-semibold text-xl'>{amount}</span>
                        <button className='bg-[#82674f] p-1 rounded-full' onClick={handlePlusBtn}>
                            <AiOutlinePlus className='h-[20px] w-[20px] text-white' />
                        </button>
                    </div>
                    <button onClick={handleDeleteBtn}><BsTrash className='h-[25px] w-[25px]' /></button>
                </div>
            </div>
        </div>
    );
};

export default ItemInCart;
