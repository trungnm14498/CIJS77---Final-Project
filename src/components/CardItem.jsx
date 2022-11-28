import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cartHandleSlice from '../redux/cartHandleSlice';
import { selectItemWithId } from '../redux/selectors';

const CardItem = ({ id, image, name, price, type, amount }) => {

    const dispatch = useDispatch();

    const [isAdded, setIsAdded] = useState(false);
    const [itemAmount, setItemAmount] = useState(1);
    const items = useSelector((state) => selectItemWithId(state, id));
    const navigate = useNavigate();

    const changeAdded = () => {
        // setItemAmount(1);
        // setIsAdded(!isAdded);
        // dispatch(
        //     cartHandleSlice.actions.incrPrice(price)
        // )
        // dispatch(
        //     cartHandleSlice.actions.incrAmount()
        // )
        // dispatch(
        //     cartHandleSlice.actions.addItem({
        //         id: id,
        //         amount: itemAmount
        //     })
        // )
        dispatch(cartHandleSlice.actions.addItem({ id, image, name, price, type }))
    }

    const handleMinusButton = () => {
        // if (items.length > 1) {
        //     setItemAmount(itemAmount - 1);
        //     dispatch(
        //         cartHandleSlice.actions.decrPrice(price)
        //     );
        //     dispatch(
        //         cartHandleSlice.actions.decrAmount()
        //     );
        //     dispatch(cartHandleSlice.actions.decrAmountItem(id));
        // } else {
        //     setIsAdded(!isAdded);
        //     setItemAmount(0);
        //     dispatch(
        //         cartHandleSlice.actions.decrPrice(price)
        //     );
        //     dispatch(
        //         cartHandleSlice.actions.decrAmount()
        //     );
        //     dispatch(cartHandleSlice.actions.decrAmountItem(id));
        // }

        dispatch(cartHandleSlice.actions.deleteItem({ id }))
    }

    const handlePlusButton = () => {
        // setItemAmount(itemAmount + 1);
        // dispatch(
        //     cartHandleSlice.actions.incrPrice(price)
        // );
        // dispatch(
        //     cartHandleSlice.actions.incrAmount()
        // );
        // dispatch(cartHandleSlice.actions.incrAmountItem(id));
        dispatch(cartHandleSlice.actions.addItem({ id, image, name, price, type }))
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3 h-fit px-7 py-5 bg-transparent border-2 border-solid border-primary rounded-lg">
            <div className="flex justify-center items-center">
                <img src={image} alt={name} className="w-[270px] h-[270px] rounded-lg cursor-pointer"
                    onClick={() => { navigate(`/menu/${type}/${id}`) }}
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl">{name}</h2>
                <span className="text-xl">$ {price}</span>
            </div>
            {
                items.length ?
                    <div className="btn-sub flex justify-center items-center">
                        <button onClick={() => handleMinusButton(price)}><AiOutlineMinus className="text-white text-xl" /></button>
                        <div className='bg-transparent text-center w-[80px]'>{items.length}</div>
                        <button onClick={() => handlePlusButton(price)} ><AiOutlinePlus className="text-white text-xl" /></button>
                    </div>
                    : <button className="btn-sub" onClick={changeAdded} >Add to Cart</button>
            }
        </div>
    );
};

export default CardItem;
