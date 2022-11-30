import { BiUser, BiPhone, BiHome, BiIdCard } from 'react-icons/bi';
import { FaBirthdayCake } from 'react-icons/fa';
import { BsGenderAmbiguous } from 'react-icons/bs';
import axios from 'axios';
import validator from 'validator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [status, setStatus] = useState({
        isFilled: false,
        isFilled2: false,
        isMatched: false
    });

    const [newInfo, setNewInfo] = useState({
        name: '',
        dob: '',
        phone: '',
        address: '',
        username: '',
        gender: 'male',
    });

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage('OK')
        } else {
            setErrorMessage('Is Not Strong Password')
        }
    }

    const validatePassword = (e) => {
        validate(e.target.value);
        setNewPassword(e.target.value);
        if (e.target.value !== '') {
            setStatus((prev) => { return { ...prev, isFilled: true } });
        } else {
            setStatus((prev) => { return { ...prev, isFilled: false } });
        }
    }

    const validateConfirmPassword = (e) => {
        if (e.target.value !== '') {
            setStatus((prev) => { return { ...prev, isFilled2: true } });
        } else {
            setStatus((prev) => { return { ...prev, isFilled2: false } });
        }

        if (validator.equals(e.target.value, newPassword)) {
            setStatus((prev) => { return { ...prev, isMatched: true } })
        } else {
            setStatus((prev) => { return { ...prev, isMatched: false } })
        }
    }

    const handleSubmitPasswordChange = (e) => {
        e.preventDefault();
        if (status.isMatched) {
            axios.patch('http://localhost:3000/api/accounts/2', { "password": newPassword })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const handleNewName = (e) => {
        setNewInfo((prev) => { return { ...prev, name: e.target.value } });
    }

    const handleNewDob = (e) => {
        if (validator.isDate(e.target.value)) {
            setNewInfo((prev) => { return { ...prev, dob: e.target.value } });
        }
    }

    const handleNewPhone = (e) => {
        if (validator.isMobilePhone(e.target.value, ['vi-VN', 'ru-RU'])) {
            setNewInfo((prev) => { return { ...prev, phone: e.target.value } });
        }
    }

    const handleNewAddress = (e) => {
        setNewInfo((prev) => { return { ...prev, address: e.target.value } });
    }

    const handleNewUsername = (e) => {
        setNewInfo((prev) => { return { ...prev, username: e.target.value } });
    }

    const handleNewGender = (e) => {
        setNewInfo((prev) => { return { ...prev, gender: e.target.value } });
    }
    // console.log(newInfo)
    const handleSubmitInfoChange = (e) => {
        e.preventDefault();

        Object.keys(newInfo).map((key) => {
            if (newInfo[key] !== '') {
                axios.patch('http://localhost:3000/api/accounts/2', {
                    [key]: newInfo[key]
                })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        });
    }


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

                <form className='flex sm:flex-row flex-col sm:items-center mt-10' onSubmit={handleSubmitInfoChange}>
                    <div className='flex flex-col gap-5 xs:w-[70%] xs:mb-0 mb-5'>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newName"><BiUser className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newName" name="newName" type='text' placeholder='New name...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' onChange={handleNewName} />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newDOB"><FaBirthdayCake className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newDOB" name="newDOB" type='date' placeholder='' min='1930-01-01' max='2022-07-31' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' onChange={handleNewDob} />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newPhone"><BiPhone className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newPhone" name="newPhone" type='tel' placeholder='New phone...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' onChange={handleNewPhone} />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newAddress"><BiHome className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newAddress" name="newAddress" type='text' placeholder='New address...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' onChange={handleNewAddress} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 sm:mt-0 mt-5'>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newUserName"><BiIdCard className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <input id="newUserName" name="newUserName" type='text' placeholder='New username...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg' onChange={handleNewUsername} />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                            <label htmlFor="newGender"><BsGenderAmbiguous className='h-[30px] w-[30px] text-dimWhite' /></label>
                            <select id="newGender" name="newGender" className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 px-4 rounded-lg' onChange={handleNewGender}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <button type='submit' className='btn-sub w-fit mt-5'>Update Info</button>
                    </div>
                </form>

                <form className='flex flex-col mt-10 gap-5 items-start' onSubmit={handleSubmitPasswordChange}>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center justify-between'>
                            <label htmlFor="newPassword" className='text-dimWhite'>New Password</label>
                            <input type='password' id="newPassword" name="newPassword" className='bg-transparent border border-solid border-primary py-2 xs:px-4 px-1 rounded-lg' onChange={validatePassword} />
                        </div>
                        {status.isFilled === false ? null : errorMessage === 'OK' ?
                            <span className='font-semibold text-green-500 text-lg'>{errorMessage}</span>
                            : <span className='font-semibold text-red-500 text-lg'>{errorMessage}</span>
                        }
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center justify-between'>
                            <label htmlFor="passwordCf" className='text-dimWhite'>Confirm Password</label>
                            <input type='password' id="passwordCf" name="passwordCf" className='bg-transparent border border-solid border-primary py-2 xs:px-4 px-1 rounded-lg' onChange={validateConfirmPassword} />
                        </div>

                        {
                            status.isFilled2 === false ? null : status.isFilled2 && status.isFilled && status.isMatched ? <span className='font-semibold text-green-500 text-lg'>OK</span> : <span className='font-semibold text-red-500 text-lg'>Password Not Matched</span>
                        }
                    </div>
                    <button type='submit' className='btn-sub'>Change Password</button>
                </form>
            </div>
        </section>
    );
};

export default UserInfo;
