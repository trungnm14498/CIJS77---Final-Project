import { BiUser, BiPhone, BiHome, BiIdCard } from 'react-icons/bi';
import { FaBirthdayCake } from 'react-icons/fa';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const UserInfo = () => {
    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-20 h-[67vh]">
            <div className='w-fit'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>U S E R &nbsp; I N F O.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <div className="sm:w-[75%] w-full xs:p-10 px-5 py-10 mt-20 mx-auto border-2 border-solid border-primary rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary p-3 rounded-bl-xl text-black text-lg">
                    User Information
                </div>

                <div className='flex xs:flex-row flex-col xs:items-center mt-10'>
                    <div className='flex flex-col gap-5 xs:w-[70%] xs:mb-0 mb-5'>
                        <div className='flex xs:gap-5 gap-2 items-center'>
                            <BiUser className='h-[30px] w-[30px] text-primary' />
                            <div className='sm:text-xl xs:text-lg text-sm'>Nguyen Manh Trung</div>
                        </div>
                        <div className='flex xs:gap-5 gap-2 items-center'>
                            <FaBirthdayCake className='h-[30px] w-[30px] text-primary' />
                            <div className='sm:text-xl xs:text-lg text-sm'>14/04/1998</div>
                        </div>
                        <div className='flex xs:gap-5 gap-2 items-center'>
                            <BiPhone className='h-[30px] w-[30px] text-primary' />
                            <div className='sm:text-xl xs:text-lg text-sm'>+84347890198</div>
                        </div>
                        <div className='flex xs:gap-5 gap-2 items-center'>
                            <BiHome className='h-[30px] w-[30px] text-primary' />
                            <div className='sm:text-xl xs:text-lg text-sm'>An Khanh, Hoai Duc, Ha Noi</div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className='flex xs:gap-5 gap-2 items-center'>
                            <BiIdCard className='h-[30px] w-[30px] text-primary' />
                            <span className='sm:text-xl xs:text-lg text-sm'>trungnm14498</span>
                        </div>
                        <div className='flex xs:gap-5 gap-2 items-center'>
                            <BsGenderAmbiguous className='h-[30px] w-[30px] text-primary' />
                            <span className='sm:text-xl xs:text-lg text-sm'>Male</span>
                        </div>

                        <Link to='/userInfo/update'>
                            <button className='btn-sub'>Update Info</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInfo;
