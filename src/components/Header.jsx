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

    // const handleIsLogin = () => {
    //     isLogined ? dispatch(accountSlice.actions.setLogout()) : null
    // }
    const handleIsLogout = () => {
        dispatch(accountSlice.actions.setLogout(false))
        dispatch(accountSlice.actions.setUserIn(""))
    }

    return (
        <header className=" bg-black fixed top-0 w-full shadow-2xl shadow-primary z-[5]">
            <div className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-5">
                <div className="flex items-center justify-items-center text-primary flex justify-between">
                    <Link to='/'>
                        <img src={logo} alt="logo" className="h-[100px] w-[100px]" />
                    </Link>
                    {
                        (!isLogined || accountInfo.role === 'user') ? <ul className="hidden sm:flex justify-center list-none sm:text-2xl text-xl col-span-10 gap-14">
                            {/* <li><a href="/menu/all" >Menu</a></li> <Link /> */}
                            <li><Link to="/menu/all" >Menu</Link></li>
                            <li><a href="/#story">Our Story</a></li>
                            <li><a href="/#feedbacks">Feedbacks</a></li>
                            <li><a href="/#contact">Contact</a></li>
                        </ul> :
                            <ul className="hidden sm:flex justify-center list-none sm:text-2xl text-xl col-span-10 gap-14">
                                {/* <li><a href="/admin-menu" >Menu</a></li> */}
                                <li><Link to="/admin-menu" >Menu</Link></li>

                                <li><Link href="/admin-feedback">Feedbacks</Link></li>
                                <li><Link href="/admin-order-history">Order History</Link></li>
                            </ul>
                    }


                    <div className="flex md:justify-start items-center gap-5">
                        {isLogined ?
                            <div className="text-lg">Welcome, <Link to='/information' className="hover:font-semibold transition-all">{accountInfo.username}</Link> </div> : null}
                        {
                            isLogined ? <Link to='/' className="sm:text-lg text[12px]" onClick={handleIsLogout}>Logout</Link>
                                :
                                <Link to='/login' className="sm:text-lg text[12px]" >Login</Link>
                        }

                        <div className="sm:hidden flex justify-center items-center" onClick={() => setToggle((prev) => !prev)}>
                            {toggle ? <AiOutlineClose className="w-8 h-8" /> : <AiOutlineMenuFold className="w-8 h-8" />}
                        </div>
                    </div>

                    <nav className={`${toggle ? 'sm:flex' : 'hidden'} p-6 bg-black-gradient absolute top-40 right-0 min-w-[140px] rounded-xl sidebar`} >
                        {
                            (!isLogined || accountInfo.role === 'user') ? <ul className="list-none flex flex-col justify-end items-center flex-1 gap-5">
                                <li><Link to="/menu/all" >Menu</Link></li>
                                <li><a href="/#story">Our Story</a></li>
                                <li><a href="/#feedbacks">Feedbacks</a></li>
                                <li><a href="/#contact">Contact</a></li>
                            </ul> :
                                <ul className="list-none flex flex-col justify-end items-center flex-1 gap-5">
                                    <li><Link to="/admin-menu" >Menu</Link></li>

                                    <li><Link href="/admin-feedback">Feedbacks</Link></li>
                                    <li><Link href="/admin-order-history">Order History</Link></li>
                                </ul>
                        }
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
