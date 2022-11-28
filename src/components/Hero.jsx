import bg1 from '../assets/image/bg1.jpg'

const Hero = () => {
    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-15 flex flex-col items-center justify-center mt-24">
            <div className='font-script text-gradient leading-10 flex flex-col items-center justify-center md:my-14 my-5 md:gap-5 gap-2'>
                <h1 className='md:text-7xl ss:text-5xl text-2xl font-bold'>
                    After 11 - Vietnamese Night Restaurant
                </h1>
                <h4 className='inline-block md:text-3xl ss:text-xl text-lg font-semibold'>
                    est. 1998
                </h4>
            </div>
            <div className='sm:h-[550px] h-auto sm:w-full w-[80%] border-4 border-primary border-solid rounded-3xl overflow-hidden opacity-90 hover:scale-105 ease-in-out duration-500'>
                <img src={bg1} alt="background" />
            </div>
        </section >
    );
};

export default Hero;
