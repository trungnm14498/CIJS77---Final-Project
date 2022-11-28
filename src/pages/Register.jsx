import React from "react";

const Register = () => {
    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28">
            <div className='w-fit'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>R E G I S T E R.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <form className="w-full max-w-sm mx-auto mt-28">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-dimWhite font-semibold text-lg md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
                            User Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-transparent appearance-none border border-solid border-primary rounded w-full py-2 px-4 text-white leading-tight focus:outline-none" id="username" type="text" placeholder="Jane Doe" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-dimWhite font-semibold text-lg md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-transparent appearance-none border border-solid border-primary rounded w-full py-2 px-4 text-white leading-tight focus:outline-none" id="password" type="password" name='password' placeholder="******************" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-dimWhite font-semibold text-lg md:text-right mb-1 md:mb-0 pr-4" htmlFor="cfPassword">
                            Confirm Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-transparent appearance-none border border-solid border-primary rounded w-full py-2 px-4 text-white leading-tight focus:outline-none" id="cfPassword" type="password" name='cfPassword' placeholder="******************" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <label className="md:w-2/3 block text-dimWhite font-semibold text-lg">
                        <input className="mr-2 leading-tight" type="checkbox" />
                        <span className="text-sm">
                            Remember me!
                        </span>
                    </label>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="shadow btn-sub focus:shadow-outline focus:outline-none font-semibold text-lg" type="button">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default Register;
