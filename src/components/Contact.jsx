import img1 from '../assets/image/contact.png'
import avatarAdmin1 from '../assets/avatar/a001.png';
import avatarAdmin2 from '../assets/avatar/a002.png';
import { BsGithub, BsInstagram } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import emailjs from 'emailjs-com';
import { useRef } from 'react';

const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_o2p3vr8', 'template_byhludd', form.current, '-X130pjpLmTnZDT9H')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        e.target.reset();
    };

    return (
        <>
            <span id='contact'></span>
            <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28">
                <div className='w-fit xs:mb-10'>
                    <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>C O N T A C T.</h2>
                    <div className='h-[3px] bg-cf-gradient' />
                </div>

                <div className="sm:grid grid-cols-2 gap-10 mt-10 flex flex-col">
                    <form ref={form} onSubmit={sendEmail} className='flex flex-col justify-center items-center gap-5'>
                        <input type="text" name='name' placeholder="Your Name" required className='input-default text-lg'></input>
                        <input type="email" name='email' placeholder="yourEmail@gmail.com" required className='input-default text-lg'></input>
                        <textarea name="message" rows="10" placeholder="Say something with us..." className='input-default text-lg xs:resize-none'></textarea>
                        <button type="submit" className="btn-sub">Send Message</button>
                    </form>

                    <div className='flex flex-col items-center'>
                        <div className='picture'>
                            <img src={img1} alt="kitchen-contact" className='sm:h-[320px] xs:h-[300px] h-[150px]' />
                        </div>
                        <div className='flex flex-col xs:flex-row items-center justify-center gap-8 mt-5 w-full'>
                            <div className='card w-[230px] flex flex-col gap-3 justify-center items-center'>
                                <h4 className='font-semibold lg:text-lg text-base'>Pham Viet Anh</h4>
                                <img src={avatarAdmin1} alt="avatarAdmin1" className='h-[100px] w-[100px]' />
                                <div className='flex gap-2 justify-center items-center'>
                                    <a href="!#" target="_blank"><BsGithub className='text-lg' /></a>
                                    <a href="!#" target="_blank"><BsInstagram className='text-lg' /></a>
                                    <a href="!#" target="_blank"><MdOutlineMail className='text-[24px]' /></a>
                                </div>
                            </div>

                            <div className='card w-[230px] flex flex-col gap-3 justify-center items-center'>
                                <h4 className='font-semibold lg:text-lg text-base'>Nguyen Manh Trung</h4>
                                <img src={avatarAdmin2} alt="avatarAdmin2" className='h-[100px] w-[100px]' />
                                <div className='flex gap-2 justify-center items-center'>
                                    <a href="!#" target="_blank"><BsGithub className='text-lg' /></a>
                                    <a href="!#" target="_blank"><BsInstagram className='text-lg' /></a>
                                    <a href="!#" target="_blank"><MdOutlineMail className='text-[24px]' /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
