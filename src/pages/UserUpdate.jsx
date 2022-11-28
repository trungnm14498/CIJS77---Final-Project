import { BiUser, BiPhone, BiHome, BiIdCard } from 'react-icons/bi';
import { FaBirthdayCake } from 'react-icons/fa';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const UserInfo = () => {
    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-20">
            <div className='w-fit'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>I N F O &nbsp; U P D A T E.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <div className="sm:w-[75%] w-full xs:p-10 px-5 py-10 mt-20 mx-auto border-2 border-solid border-primary rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary xs:p-3 p-1 rounded-bl-xl text-black text-lg">
                    Update Information
                </div>

                <div className='flex sm:flex-row flex-col sm:items-center mt-10'>
                    <div className='flex flex-col gap-5 xs:w-[70%] xs:mb-0 mb-5'>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newName"><BiUser className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newName" name="newName" type='text' placeholder='New name...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newDOB"><FaBirthdayCake className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newDOB" name="newDOB" type='date' placeholder='' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newPhone"><BiPhone className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newPhone" name="newPhone" type='tel' placeholder='New phone...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newAddress"><BiHome className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newAddress" name="newAddress" type='text' placeholder='New address...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 sm:mt-0 mt-5'>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newUserName"><BiIdCard className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newUserName" name="newUserName" type='text' placeholder='New username...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newGender"><BsGenderAmbiguous className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <select id="newGender" name="newGender" className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 px-4 rounded-lg'>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col xs:flex-row mt-10 gap-5 items-center'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center justify-between'>
                            <label htmlFor="newPassword" className='text-dimWhite'>New Password</label>
                            <input type='password' id="newPassword" name="newPassword" className='bg-transparent border border-solid border-primary py-2 xs:px-4 px-1 rounded-lg' />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center justify-between'>
                            <label htmlFor="passwordCf" className='text-dimWhite'>Confirm Password</label>
                            <input type='password' id="passwordCf" name="passwordCf" className='bg-transparent border border-solid border-primary py-2 xs:px-4 px-1 rounded-lg' />
                        </div>
                    </div>

                    <div>
                        <button type='submit' className='btn-sub'>Update</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInfo;
