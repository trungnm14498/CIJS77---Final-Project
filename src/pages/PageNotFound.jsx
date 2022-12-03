import React from "react";

const PageNotFound = () => {
    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28 h-[70vh]">
            <div className='w-fit mx-auto mt-40'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>4 0 4 - page &nbsp;not&nbsp; found</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>
            <p className='mt-4 text-3xl text-dimWhite text-center'>
                We couldn't find the page you were looking for...
            </p>
        </section>
    )
};

export default PageNotFound;
