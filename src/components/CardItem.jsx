import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cartHandleSlice from '../redux/cartHandleSlice';
import { selectItemWithId, accountInfoSelector } from '../redux/selectors';

const CardItem = ({ id, image, name, price, type }) => {

    const dispatch = useDispatch();

    const items = useSelector((state) => selectItemWithId(state, id));
    const accountInfo = useSelector(accountInfoSelector);

    const navigate = useNavigate();

    const changeAdded = () => {
        dispatch(cartHandleSlice.actions.addItem({ id, image, name, price, type }))
    }

    const handleMinusButton = () => {
        dispatch(cartHandleSlice.actions.deleteItem({ id }))
    }

    const handlePlusButton = () => {
        dispatch(cartHandleSlice.actions.addItem({ id, image, name, price, type }))
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3 h-fit px-7 py-5 bg-transparent border-2 border-solid border-primary rounded-lg">
            <div className="flex justify-center items-center">
                <img src={image} alt={name} className="w-[270px] h-[270px] rounded-lg cursor-pointer"
                    onClick={() => { accountInfo.role === "user" ? navigate(`/menu/${type}/${id}`) : null }}
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl">{name}</h2>
                <span className="text-xl">$ {price}</span>
            </div>
            {
                accountInfo.role === "user" ?
                    items.length ?
                        <div className="btn-sub flex justify-center items-center">
                            <button onClick={() => handleMinusButton(price)}><AiOutlineMinus className="text-white text-xl" /></button>
                            <div className='bg-transparent text-center w-[80px]'>{items.length}</div>
                            <button onClick={() => handlePlusButton(price)} ><AiOutlinePlus className="text-white text-xl" /></button>
                        </div>
                        : <button className="btn-sub" onClick={changeAdded} >Add to Cart</button>
                    :

                    <button className="btn-sub" onClick={() => { navigate(`/admin-menu/${id}`); }}>Update Info</button>
            }

        </div>
    );
};

export default CardItem;
