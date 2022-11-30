import userAvatar1 from '../assets/avatar/u001.png';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

import { useState, useEffect } from 'react';

// import Swiper core and required modules
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Feedback = () => {

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [reviews, setReview] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const testData = new FormData();
        // testData.append('username', 'trungnm14498');
        // testData.append('rating', rating);
        // testData.append('feedback', feedback);
        // testData.append('avatar', '');

        const body = {
            username: 'phamvietanh',
            rating: rating,
            'feedback': feedback,
            'avatar': ''
        }

        axios({
            method: "POST",
            url: "http://localhost:3000/api/feedbacks",
            data: body
        })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    const handleFetchReview = () => {
        axios
            .get("http://localhost:3000/api/feedbacks")
            .then(function (response) {
                setReview(response.data.sort(() => 0.5 - Math.random()).slice(0, 3));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        handleFetchReview();
    }, [])

    return (
        <>
            <span id='feedbacks'></span>
            <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28 h-[70vh]">
                <div className='w-fit xs:mb-5'>
                    <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>F E E D B A C K S.</h2>
                    <div className='h-[3px] bg-cf-gradient' />
                </div>

                <div className="sm:grid sm:grid-cols-5 grid-cols-4 gap-20 mt-14 items-center">
                    <form onSubmit={handleSubmit} className="col-span-2 flex flex-col">
                        <span className="text-dimWhite text-2xl">Rate our services</span>
                        <div className="rating my-5">
                            <input type="radio" name="rating" value="1" id="1"></input>
                            <label htmlFor="1" onClick={() => setRating(5)}>☆</label>
                            <input type="radio" name="rating" value="2" id="2"></input>
                            <label htmlFor="2" onClick={() => setRating(4)}>☆</label>
                            <input type="radio" name="rating" value="3" id="3"></input>
                            <label htmlFor="3" onClick={() => setRating(3)}>☆</label>
                            <input type="radio" name="rating" value="4" id="4"></input>
                            <label htmlFor="4" onClick={() => setRating(2)}>☆</label>
                            <input type="radio" name="rating" value="5" id="5"></input>
                            <label htmlFor="5" onClick={() => setRating(1)}>☆</label>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <textarea name="commend" rows="10" placeholder="Leave your commend here..." className="input-default sm:text-xl text-base resize-none" onChange={(e) => setFeedback(e.target.value)}></textarea>
                            <button type="submit" className="btn-sub mt-10 max-w-[300px]">Send your feedback</button>
                        </div>
                    </form>

                    <div className="flex flex-col items-center sm:col-span-3 col-span-2 text-dimWhite sm:mt-0 mt-10">
                        <span className='ss:text-2xl text-base text-center mb-2'>Let our customers talk about us</span>
                        <Swiper className="p-5 w-full h-[430px] bg-transparent border-2 border-primary border-solid rounded-xl leading-[30px]"
                            modules={[Pagination]}
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                        >
                            {reviews.map((review) => {
                                return (
                                    <SwiperSlide key={review.id} className='flex flex-col justify-between'>

                                        <div className='flex flex-col sm:gap-5 gap-1 justify-center items-center'>
                                            <div className='rounded-full'>
                                                <img src={userAvatar1} alt="userAvatar1" className='sm:w-[100px] w-[70px]' />
                                            </div>
                                            <span className='sm:text-xl text-base'>{review.username}</span>
                                        </div>
                                        <p className='xs:text-[18px] md:text-xl text-[10px] text-center xs:leading-6 leading-5 text-primary'>
                                            {review.feedback}                                        </p>
                                        <div className='flex justify-center items-center sm:gap-2 mb-8'>
                                            {[...Array(review.rating).keys()].map((star) => <FaStar key={star} className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                            )}

                                            {/* <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                            <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                            <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                            <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' /> */}
                                        </div>
                                    </SwiperSlide>
                                )
                            })}


                            {/* <SwiperSlide className='flex flex-col justify-between'>
                                <div className='flex flex-col sm:gap-5 gap-1 justify-center items-center'>
                                    <div className='rounded-full'>
                                        <img src={userAvatar1} alt="userAvatar1" className='sm:w-[100px] w-[70px]' />
                                    </div>
                                    <span className='sm:text-xl text-base'>User 1</span>
                                </div>
                                <p className='xs:text-[18px] md:text-xl text-[10px] xs:leading-6 leading-5 text-primary'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, eveniet velit. Odio deserunt, quos sequi sint itaque perferendis. Illo veniam est natus libero maiores eaque? Soluta cupiditate dicta quis minima.
                                </p>
                                <div className='flex justify-center items-center sm:gap-2 mb-8'>
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide SwiperSlide className='flex flex-col justify-between'>


                                <div className='flex flex-col sm:gap-5 gap-1 justify-center items-center'>
                                    <div className='rounded-full'>
                                        <img src={userAvatar1} alt="userAvatar1" className='sm:w-[100px] w-[70px]' />
                                    </div>
                                    <span className='sm:text-xl text-base'>{review.username}</span>
                                </div>
                                <p className='xs:text-[18px] md:text-xl text-[10px] xs:leading-6 leading-5 text-primary'>
                                    {review.feedback}                                    </p>
                                <div className='flex justify-center items-center sm:gap-2 mb-8'>
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                    <FaStar className='sm:text-3xl text-xl text-center text-[#ffd600]' />
                                </div>
                            </SwiperSlide> */}

                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
}


export default Feedback;
