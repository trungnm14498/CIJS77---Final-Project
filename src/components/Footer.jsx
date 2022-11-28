import logo2 from '../assets/logo/test.png';
import { BsInstagram, BsYoutube } from 'react-icons/bs'
import { FaFacebookSquare } from 'react-icons/fa'

import { weekdays, openingHours } from '.';

const Footer = () => {
    return (
        <footer className="border-t-2 border-dimWhite border-solid mt-40 rounded-tr-xl rounded-tl-xl bg-[url('./src/assets/image/footer.jpg')] bg-contain relative sm:h-[350px] w-full">
            <div className='bg-black/75 absolute w-full h-full'>
                <div className="xl:max-w-[1280px] w-full mx-auto sm:px-15 px-5">
                    <div className="xs:grid grid-cols-10 xs:gap-12 gap-7 items-center justify-center mt-8 flex flex-col">
                        <div className='sm:col-span-2 col-span-5 flex flex-col justify-center items-center lg:mb-0 mb-5'>
                            <img src={logo2} alt="logo" className='h-[200px] w-[200px]' />
                            <p className='text-lg text-dimWhite text-center'>Lorem ipsum dolor sit, amet consectetur elit. Tempore, velit.</p>
                        </div>

                        <div className='sm:col-span-3 col-span-5 flex flex-col justify-center gap-5'>
                            <div className='flex flex-col xs:items-start items-center'>
                                <h4 className='font-semibold text-xl'>Follow Us</h4>
                                <div className='flex gap-5 text-dimWhite mt-2'>
                                    <a href="!#" className='p-3 rounded-full border-dimWhite border border-solid hover:opacity-70'><FaFacebookSquare className='w-[30px] h-[30px]' /></a>
                                    <a href="!#" className='p-3 rounded-full border-dimWhite border border-solid hover:opacity-70'><BsInstagram className=' w-[30px] h-[30px]' /></a>
                                    <a href="!#" className='p-3 rounded-full border-dimWhite border border-solid hover:opacity-70'><BsYoutube className=' w-[30px] h-[30px]' /></a>
                                </div>
                            </div>

                            <div className='flex flex-col xs:items-start items-center'>
                                <h4 className='font-semibold text-xl'>Address</h4>
                                <div className='text-dimWhite mt-2'>5/7, Vyazemsky district, Saint Petersburg</div>
                            </div>

                            <div className='flex flex-col xs:items-start items-center'>
                                <h4 className='font-semibold text-xl'>Contact Us</h4>
                                <div className='flex flex-col mt-2'>
                                    <span className='text-dimWhite'>Tel: +7(996)-797-88-68</span>
                                    <span className='text-dimWhite'>Email: after11@restaurant.com</span>
                                </div>
                            </div>

                        </div>

                        <div className='sm:col-span-2 col-span-5'>
                            <h4 className='font-semibold text-xl'>Our Restaurant</h4>
                            <div className='flex flex-col justify-center xs:items-start items-center gap-2 mt-1 text-dimWhite'>
                                <a href="#">Home</a>
                                <a href="#menu">Menu</a>
                                <a href="#story">Our Story</a>
                                <a href="#feedbacks">Feedbacks</a>
                                <a href="#contact">Contact</a>
                            </div>
                        </div>

                        <div className='sm:col-span-3 col-span-5 sm:mb-0 mb-5'>
                            <h4 className='font-semibold text-xl'>Opening Hours</h4>
                            <div className='flex justify-between items-center mt-5 text-dimWhite'>
                                <div className='flex flex-col md:mr-16 mr-10'>
                                    {
                                        weekdays.map((weekday) => (
                                            <span key={weekday}>{weekday}</span>
                                        )
                                        )
                                    }
                                </div>

                                <div className='flex flex-col'>
                                    {
                                        openingHours.map((hour, i) => (
                                            <span key={i}>{hour}</span>
                                        )
                                        )
                                    }
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
