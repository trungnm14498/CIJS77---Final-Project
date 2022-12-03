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

    const handleMinusBtn = () => {
        dispatch(cartHandleSlice.actions.deleteItem(id));
    }

    const handlePlusBtn = () => {
        dispatch(cartHandleSlice.actions.addItem({ id, image, name, price, type }))
    }
    const handleDeleteBtn = () => {
        dispatch(cartHandleSlice.actions.deleteAllItems(id));
        console.log(addedItem);
    };

    useEffect(() => {
        items.length === 0 ? navigate('/cartEmpty') : null;
    }, [items])

    return (
        <div className="flex xs:flex-row flex-col card w-[600px] xs:gap-0 gap-3">
            <div className='border-[4px] border-solid border-[#82674f] w-fit rounded-full xs:mr-5 xs:my-2 xs:ml-5 mx-auto'>
                <img src={image} alt="item-1" className='rounded-full xs:w-[200px] xs:h-[200px] w-[120px] h-[120px] p-2' />
            </div>
            <div className='flex flex-col justify-evenly mr-3 xs:gap-0 gap-3'>
                <h3 className='font-semibold xs:text-2xl text-lg xs:mx-0 mx-auto'>{name}</h3>
                <div className='flex xs:justify-start justify-center items-center text-secondary text-lg gap-5'>
                    <span className='xs:mr-8 mr-1'>$ {price}</span>
                    <span>Total: $ {totalPriceSingleItem}</span>
                </div>
                <div className='flex items-center justify-between gap-24'>
                    <div className='flex items-center gap-6'>
                        <button className='bg-[#82674f] p-1 rounded-full' onClick={handleMinusBtn}>
                            <AiOutlineMinus className='xs:h-[20px] xs:w-[20px] h-[13px] w-[13px] text-white' />
                        </button>
                        <span className='font-semibold text-xl'>{amount}</span>
                        <button className='bg-[#82674f] p-1 rounded-full' onClick={handlePlusBtn}>
                            <AiOutlinePlus className='xs:h-[20px] xs:w-[20px] h-[13px] w-[13px] text-white' />
                        </button>
                    </div>
                    <button onClick={handleDeleteBtn}><BsTrash className='h-[25px] w-[25px]' /></button>
                </div>
            </div>
        </div>
    );
};

export default ItemInCart;
