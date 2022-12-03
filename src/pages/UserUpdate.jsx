import { BiUser, BiPhone, BiHome, BiIdCard } from 'react-icons/bi';
import { FaBirthdayCake } from 'react-icons/fa';
import { BsGenderAmbiguous, BsCheckCircle } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import axios from 'axios';
import validator from 'validator';
import { useState } from 'react';
import { accountInfoSelector } from '../redux/selectors';
import { useSelector } from 'react-redux';
import { accountsAPI } from '../hooks';

const UserInfo = () => {

    const accountInfo = useSelector(accountInfoSelector);
    const [errorMessage, setErrorMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [status, setStatus] = useState({
        isFilled: false,
        isFilled2: false,
        isMatched: false,
        currPass: false,
        infoSuccess: false,
        passwordSuccess: false,
        showMess: false
    });

    const [newInfo, setNewInfo] = useState({
        name: '',
        birthday: '',
        phone: '',
        address: '',
        email: '',
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

    const validateCurrentPassword = (e) => {
        if (e.target.value === accountInfo.password) {
            setStatus((prev) => { return { ...prev, currPass: true } });
        } else {
            setStatus((prev) => { return { ...prev, currPass: false } });
        }
    }

    const handleSubmitPasswordChange = (e) => {
        e.preventDefault();
        if (status.isMatched && status.currPass) {
            axios.patch(`${accountsAPI}/2`, { "password": newPassword })
                .then(function () {
                    setStatus((prev) => { return { ...prev, passwordSuccess: true } });
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const messNewDob = 'Do you remember your birthday?';
    const messNewPhone = 'Please enter a valid phone number!';
    const messNewEmail = 'Please enter a valid email!';

    function handleNewData(e, message, data) {
        let checked;
        const newValue = e.target.value;
        switch (data) {
            case 'birthday':
                checked = validator.isDate(newValue);
                break;
            case 'phone':
                checked = validator.isMobilePhone(newValue);
                break;
            case 'email':
                checked = validator.isEmail(newValue);
                break;
            default:
                break;
        }
        if (checked) {
            setNewInfo((prev) => { return { ...prev, [data]: newValue } });
            setStatus((prev) => { return { ...prev, showMess: false } });
        } else {
            setErrorMessage(message);
            setStatus((prev) => { return { ...prev, showMess: true } });
        }
        if (newValue === '') {
            setStatus((prev) => { return { ...prev, showMess: false } });
        }
    }

    const handleOnChange = (e) => {
        const key = e.target.name;
        setNewInfo((prev) => { return { ...prev, [key]: e.target.value } });
    }

    const handleSubmitInfoChange = (e) => {
        e.preventDefault();
        Object.keys(newInfo).map((key) => {
            if (newInfo[key] !== '') {
                axios.patch(`${accountsAPI}/${accountInfo.id}`, {
                    [key]: newInfo[key]
                }).then(function () {
                    setStatus((prev) => { return { ...prev, infoSuccess: true } });
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

                <form onSubmit={handleSubmitInfoChange} className='flex flex-col'>
                    <div className='flex sm:flex-row flex-col mt-10 gap-10 xs:justify-start justify-center xs:items-start items-center'>
                        <div className='flex flex-col gap-5 lg:w-[45%] w-[80%]'>
                            <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                                <label htmlFor="name"><BiUser className='h-[30px] w-[30px] text-dimWhite' /></label>
                                <input id="name" name="name" type='text' placeholder='New name...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg w-full' onChange={handleOnChange} />
                            </div>
                            <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                                <label htmlFor="newBirthday"><FaBirthdayCake className='h-[30px] w-[30px] text-dimWhite' /></label>
                                <input id="newBirthday" name="newBirthday" type='text' placeholder='YY-MM-DD' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg w-full' onChange={(e) => handleNewData(e, messNewDob, 'birthday')} />
                            </div>
                            <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                                <label htmlFor="newPhone"><BiPhone className='h-[30px] w-[30px] text-dimWhite' /></label>
                                <input id="newPhone" name="newPhone" type='tel' placeholder='New phone...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg w-full' onChange={(e) => handleNewData(e, messNewPhone, 'phone')} />
                            </div>
                            <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                                <label htmlFor="address"><BiHome className='h-[30px] w-[30px] text-dimWhite' /></label>
                                <input id="address" name="address" type='text' placeholder='New address...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg w-full' onChange={handleOnChange} />
                            </div>
                        </div>

                        <div className='flex flex-col gap-5 lg:mt-0 mt-[-18px]'>
                            <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                                <label htmlFor="email"><BiIdCard className='h-[30px] w-[30px] text-dimWhite' /></label>
                                <input id="email" name="email" type='email' placeholder='New email...' className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 md:px-4 p-2 rounded-lg lg:w-full xs:w-[370px]' onChange={(e) => handleNewData(e, messNewEmail, 'email')} />
                            </div>
                            <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center'>
                                <label htmlFor="gender"><BsGenderAmbiguous className='h-[30px] w-[30px] text-dimWhite' /></label>
                                <select id="gender" name="gender" className='sm:text-xl xs:text-lg text-sm bg-transparent border border-solid border-primary py-2 px-4 rounded-lg' onChange={handleOnChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {
                        status.infoSuccess && <div className='flex justify-center items-center gap-2 text-semibold text-lg text-green-500 mx-auto mt-10'><BsCheckCircle />Successful Update</div>
                    }
                    {
                        status.showMess && <div className='flex justify-center items-center gap-2 text-semibold text-lg text-red-500 mx-auto mt-10'><AiOutlineCloseCircle />{errorMessage}</div>
                    }
                    <button type='submit' className='border-2 border-solid border-dimWhite px-5 py-3 rounded-md bg-yellow-800 text-gray-200 w-fit mt-5 mx-auto'>Update Info</button>
                </form>
            </div>

            <div className="sm:w-[75%] w-full xs:p-10 px-5 py-10 mt-20 mx-auto border-2 border-solid border-primary rounded-lg relative overflow-hidden">
                <form className='flex flex-col mt-10 gap-5 items-start' onSubmit={handleSubmitPasswordChange}>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center justify-between'>
                            <label htmlFor="currentPassword" className='text-dimWhite'>Current Password</label>
                            <input type='password' id="currentPassword" name="currentPassword" className='bg-transparent border border-solid border-primary py-2 xs:px-4 px-1 rounded-lg' onChange={validateCurrentPassword} />
                        </div>
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center justify-between'>
                            <label htmlFor="newPassword" className='text-dimWhite'>New Password</label>
                            <input type='password' id="newPassword" name="newPassword" className='bg-transparent border border-solid border-primary py-2 xs:px-4 px-1 rounded-lg' onChange={validatePassword} />
                        </div>
                        {status.isFilled === false ? null : errorMessage === 'OK' ?
                            <span className='font-semibold text-green-500 text-lg'>OK</span>
                            : <span className='font-semibold text-red-500 text-lg'>Password Not Matched</span>
                        }
                        <div className='flex flex-col xs:flex-row xs:gap-5 gap-2 items-center justify-between'>
                            <label htmlFor="passwordCf" className='text-dimWhite'>Confirm Password</label>
                            <input type='password' id="passwordCf" name="passwordCf" className='bg-transparent border border-solid border-primary py-2 xs:px-4 px-1 rounded-lg' onChange={validateConfirmPassword} />
                        </div>

                        {
                            status.isFilled2 === false ? null : status.isFilled2 && status.isFilled && status.isMatched ? <span className='font-semibold text-green-500 text-lg'>OK</span> : <span className='font-semibold text-red-500 text-lg'>Password Not Matched</span>
                        }
                    </div>
                    {
                        status.passwordSuccess && <div className='flex justify-center items-center gap-2 text-semibold text-lg text-green-500 mx-auto'><BsCheckCircle />Successful Change Password</div>
                    }
                    <button type='submit' className='border-2 border-solid border-dimWhite px-5 py-3 rounded-md bg-yellow-800 text-gray-200 w-fit mt-10 mx-auto'>Change Password</button>
                </form>
            </div>
        </section>
    );
};

export default UserInfo;
