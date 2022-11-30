import React from "react";
import { Link } from 'react-router-dom'
import logo from '../assets/logo/logo.jpg';
import { AiOutlineClose, AiOutlineMenuFold } from 'react-icons/ai';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import accountSlice from "../redux/accountSlice";
import { isLoginedSelector, accountInfoSelector } from "../redux/selectors";

const Header = () => {
    const dispatch = useDispatch();

    const [toggle, setToggle] = useState(false);
    const isLogined = useSelector(isLoginedSelector);
    const accountInfo = useSelector(accountInfoSelector);

    const handleIsLogined = () => {
        isLogined ? dispatch(accountSlice.actions.setLogout()) : null
    }

    return (
        <header className=" bg-black fixed top-0 w-full shadow-2xl shadow-primary z-[5]">
            <div className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-5">
                <div className="sm:grid grid-cols-12 items-center justify-items-center text-primary flex justify-between">
                    <Link to='/'>
                        <img src={logo} alt="logo" className="h-[100px] w-[100px]" />
                    </Link>
                    {
                        accountInfo.role === 'user' ? <ul className="hidden sm:flex justify-center list-none sm:text-2xl text-xl col-span-10 gap-14">
                            <li><a href="/#menu" >Menu</a></li>
                            <li><a href="/#story">Our Story</a></li>
                            <li><a href="/#feedbacks">Feedbacks</a></li>
                            <li><a href="/#contact">Contact</a></li>
                        </ul> :
                            <ul className="hidden sm:flex justify-center list-none sm:text-2xl text-xl col-span-10 gap-14">
                                <li><a href="/admin-menu" >Menu</a></li>
                                <li><a href="/admin-feedback">Feedbacks</a></li>
                                <li><a href="/admin-order-history">Order History</a></li>
                            </ul>
                    }


                    <div className="flex sm:justify-center items-center sm:gap-10 gap-5">
                        {isLogined ?
                            <div className="text-lg">Welcome, <Link to='/information' className="hover:font-semibold transition-all">{accountInfo.username}</Link> </div> : null}
                        <div className="flex flex-col items-center gap-1 sm:text-lg text[12px]">
                            <button>VI</button>
                            <div className="w-5 h-[1px] bg-primary" />
                            <button>EN</button>
                        </div>
                        {
                            isLogined ? <Link to='/' className="sm:text-lg text[12px]" onClick={handleIsLogined}>Logout</Link>
                                :
                                <Link to='/login' className="sm:text-lg text[12px]" onClick={handleIsLogined}>Login</Link>
                        }

                        <div className="sm:hidden flex justify-center items-center" onClick={() => setToggle((prev) => !prev)}>
                            {toggle ? <AiOutlineClose className="w-8 h-8" /> : <AiOutlineMenuFold className="w-8 h-8" />}
                        </div>
                    </div>

                    <nav className={`${toggle ? 'sm:flex' : 'hidden'} p-6 bg-black-gradient absolute top-40 right-0 min-w-[140px] rounded-xl sidebar`} >
                        <ul className="list-none flex flex-col justify-end items-center flex-1 gap-5">
                            <li><a href="./#menu" >Menu</a></li>
                            <li><a href="./#story" >Our Story</a></li>
                            <li><a href="./#feedbacks" >Feedbacks</a></li>
                            <li><a href="./#contact" >Contact</a></li>
                            <li><Link to='/cart' onClick={() => setToggle((prev) => !prev)}>Cart 0</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
