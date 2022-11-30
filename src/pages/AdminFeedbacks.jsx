import axios from "axios";
import { useState, useEffect } from "react";
import 'swiper/css';
import 'swiper/css/pagination';

const AdminFeedbacks = () => {

    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFeedbacksFetch = () => {
        axios.get('http://localhost:3000/api/feedbacks')
            .then(function (response) {
                setFeedbacks(response.data);
            })
            .then(function () {
                setIsLoading(true);
            })
    }

    const handleDeleteFeedback = (e) => {
        const feedbackId = e.target.name;
        axios.delete(`http://localhost:3000/api/feedbacks/${feedbackId}`)
        setFeedbacks(feedbacks.filter((feedback) => feedback.id !== parseInt(e.target.name)));
    }

    useEffect(() => {
        handleFeedbacksFetch();
    }, []);

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28" >
            <div className='w-fit xs:mb-10'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>C U S T O M E R ' S &nbsp; F E E D B A C K S.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <div className="flex flex-col gap-5">
                {
                    isLoading ?
                        feedbacks.map(feedback => {
                            return (
                                <div key={feedback.id} className="w-80% border-solid border-2 border-primary text-lg text-dimWhite rounded-md">
                                    <div className="flex justify-between items-center gap-2 p-3">
                                        <div className="flex flex-col gap-3 justify-center">
                                            <div>Feedback ID: <span className="font-semibold">{feedback.id}</span> </div>
                                            <div>Username: <span className="font-semibold">{feedback.username}</span></div>
                                            <div>Rating: <span className="font-semibold">{feedback.rating}</span></div>
                                            <div>Feedback:
                                                <p className="italic text-xl border-l-4 border-solid pl-5 p-2 mt-3 font-semibold">"{feedback.feedback}"</p>
                                            </div>
                                        </div>

                                        <button name={feedback.id} className="btn-sub" onClick={handleDeleteFeedback}>
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            )
                        }) : null
                }
            </div>
        </section >
    )
};

export default AdminFeedbacks;
