import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Register = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');

    const [isSuccessful, setIsSuccessful] = useState();

    const [status, setStatus] = useState({
        isFilled: false,
        isFilled2: false,
        isMatched: false,
    });

    const validate = (value) => {
        if (
            validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
        ) {
            setErrorMessage('OK');
        } else {
            setErrorMessage('Is Not Strong Password');
        }
    };

    const validatePassword = (e) => {
        validate(e.target.value);
        setNewPassword(e.target.value);
        if (e.target.value !== '') {
            setStatus((prev) => {
                return { ...prev, isFilled: true };
            });
        } else {
            setStatus((prev) => {
                return { ...prev, isFilled: false };
            });
        }
    };

    const validateConfirmPassword = (e) => {
        setNewConfirmPassword(e.target.value);
        if (e.target.value !== '') {
            setStatus((prev) => {
                return { ...prev, isFilled2: true };
            });
        } else {
            setStatus((prev) => {
                return { ...prev, isFilled2: false };
            });
        }
        if (validator.equals(e.target.value, newPassword)) {
            setStatus((prev) => {
                return { ...prev, isMatched: true };
            });
        } else {
            setStatus((prev) => {
                return { ...prev, isMatched: false };
            });
        }
    };
    const handleChange = (e) => {
        setUsername(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            username: username,
            password: newPassword,
        };
        if (status.isMatched && newPassword === newConfirmPassword) {
            axios({
                method: 'POST',
                url: 'https://after-eleven-server.herokuapp.com/api/register',
                data: body,
            })
                .then(() => {
                    setIsSuccessful(true);
                    setTimeout(() => {
                        setIsSuccessful(false);
                    }, 3000);
                })
                .catch((error) => {
                    setError(true);
                    setTimeout(() => {
                        setError(false);
                    }, 3000);
                });
        } else {
            setStatus((prev) => {
                return { ...prev, isMatched: false };
            });
        }
    };
    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28">
            <div className="w-fit">
                <h2 className="font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block">
                    R E G I S T E R.
                </h2>
                <div className="h-[3px] bg-cf-gradient" />
            </div>

            <form className="w-full max-w-sm mx-auto mt-28" onSubmit={handleSubmit}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-dimWhite font-semibold text-lg md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="username"
                            name="username"
                        >
                            Username
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            value={username}
                            name="username"
                            onChange={handleChange}
                            className="bg-transparent appearance-none border border-solid border-primary rounded w-full py-2 px-4 text-white leading-tight focus:outline-none"
                            id="username"
                            type="text"
                            placeholder="Jane Doe"
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-dimWhite font-semibold text-lg md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="password"
                            name="password"
                        >
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            name="password"
                            onChange={validatePassword}
                            className="bg-transparent appearance-none border border-solid border-primary rounded w-full py-2 px-4 text-white leading-tight focus:outline-none"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                </div>
                {status.isFilled === false ? null : errorMessage === 'OK' ? null : (
                    <span className="flex justify-center font-semibold text-red-500 text-lg m-5">
                        Password isn't strong enough
                    </span>
                )}
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-dimWhite font-semibold text-lg md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="cfPassword"
                        >
                            Confirm Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            name="passwordCf"
                            onChange={validateConfirmPassword}
                            className="bg-transparent appearance-none border border-solid border-primary rounded w-full py-2 px-4 text-white leading-tight focus:outline-none"
                            id="cfPassword"
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                </div>

                {status.isFilled2 === false ? null : status.isFilled2 && status.isFilled && status.isMatched ? null : (
                    <span className="flex justify-center font-semibold text-red-500 text-lg m-5">Password Not Matched</span>
                )}
                <div className="flex justify-center items-center gap-2 text-semibold text-base text-dimWhite m-5 underline underline-offset-1">
                    <Link to="/login">Already have an account? Sign in</Link>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button
                            className="shadow btn-sub focus:shadow-outline focus:outline-none font-semibold text-lg"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="flex justify-center items-center gap-2 text-semibold text-lg text-red-500 mx-auto mt-10">
                        <AiOutlineCloseCircle />
                        Username already existed
                    </div>
                )}
                {isSuccessful && (
                    <div className="flex justify-center items-center gap-2 text-semibold text-lg text-green-500 mx-auto mt-10">
                        <AiOutlineCloseCircle />
                        Account successfully created
                    </div>
                )}
            </form>
        </section>
    );
};

export default Register;