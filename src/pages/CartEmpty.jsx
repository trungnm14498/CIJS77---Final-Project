import React from "react";
import empty from '../assets/image/empty.jpg';
import { Link } from "react-router-dom";

const CartEmpty = () => {
    return (
        <>
            <section className="xl:max-w-[1280px] w-full mx-auto px-10 flex flex-col sm:mt-40 mt-28 h-[70vh]">
                <div className="flex flex-col justify-center items-center gap-10 mt-32">
                    <img src={empty} alt="empty-card" className="xs:h-[300px] xs:w-[300px] h-[200px] w-[200px]" />
                    <p className="sm:text-2xl text-lg text-center text-dimWhite mt-10">Oops? Looks like nothing here ...</p>
                    <p className="sm:text-2xl text-lg text-center text-dimWhite">Please back to Menu and add some food into your cart.</p>
                    <Link to='/menu/starter' className="btn-sub sm:text-2xl text-lg sm:mb-2">Back To Menu</Link>
                </div>
            </section>
        </>

    );
};

export default CartEmpty;
