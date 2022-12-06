import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import accountSlice from "../redux/accountSlice";
import { Link } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [usernamePassword, setUsernamePassword] = useState({ username: "", password: "" })
    const handleChange = (e) => {
        const { value, name } = e.target;
        if (name === "username") {
            setUsernamePassword((prev) => { return { ...prev, [name]: value } })
        }
        else if (name === "password") {
            setUsernamePassword((prev) => { return { ...prev, [name]: value } })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            username: usernamePassword.username,
            password: usernamePassword.password,

        }

        axios({
            method: "POST",
            url: "http://localhost:3000/api/login",
            data: body
        }).then(function (response) {

            dispatch(accountSlice.actions.setUserIn(response.data.userData));
            dispatch(accountSlice.actions.setLogin(true));
            setError("");
            setUsernamePassword({ username: "", password: "" });
            navigate("/");

        })
            .catch(function (error) {
                //handle error
                console.log(error);
                setError(error.response.data.message);
            });
    }
    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28 h-[70vh]">
            <div className='w-fit'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>L O G I N.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto my-auto">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-dimWhite font-semibold text-lg md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
                            User Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input value={usernamePassword.username} onChange={handleChange} name="username" className="bg-transparent appearance-none border border-solid border-primary rounded w-full py-2 px-4 text-white leading-tight focus:outline-none" id="username" type="text" placeholder="Jane Doe" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-dimWhite font-semibold text-lg md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input value={usernamePassword.password} onChange={handleChange} name="password" className="bg-transparent appearance-none border border-solid border-primary rounded w-full py-2 px-4 text-white leading-tight focus:outline-none" id="password" type="password" placeholder="******************" />
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2 text-semibold text-base text-dimWhite m-5 underline underline-offset-1'><Link to="/register">Don't have an account yet? Sign up here</Link></div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="shadow btn-sub focus:shadow-outline focus:outline-none font-semibold text-lg" type="submit">
                            Log In
                        </button>
                    </div>
                </div>
                {error && <div className='flex justify-center items-center gap-2 text-semibold text-lg text-red-500 m-5'>{error}</div>}
            </form>
        </section >
    );
};

export default Login;
