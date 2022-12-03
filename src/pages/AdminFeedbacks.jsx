import axios from "axios";
// import 'swiper/css';
// import 'swiper/css/pagination';
import { useGetData } from "../hooks/feedbacks/useGetData";
import { feedbackAPI } from "../hooks/";
import { useDeleteItem } from "../hooks/feedbacks/useDeleteData";

const AdminFeedbacks = () => {

    const { data, isLoading } = useGetData(true, feedbackAPI);

    return (
        <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28" >
            <div className='w-fit xs:mb-10'>
                <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>C U S T O M E R ' S &nbsp; F E E D B A C K S.</h2>
                <div className='h-[3px] bg-cf-gradient' />
            </div>

            <div className="flex flex-wrap gap-5 justify-center">
                {
                    !isLoading ?
                        data.map(feedback => {
                            return (
                                <div key={feedback.id} className="flex flex-col justify-between items-center w-[350px] min-h-[400px] border-solid border-2 border-primary text-lg text-dimWhite rounded-md">
                                    <div className="flex flex-col justify-between items-center gap-2 p-3">
                                        <div className="flex flex-col gap-3 justify-center">
                                            <div>Feedback ID: <span className="font-semibold">{feedback.id}</span> </div>
                                            <div>Username: <span className="font-semibold">{feedback.username}</span></div>
                                            <div>Rating: <span className="font-semibold">{feedback.rating}</span></div>
                                            <div>Feedback:
                                                <p className="italic border-l-4 border-solid pl-5 p-2 mt-3 font-semibold">"{feedback.feedback}"</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button name={feedback.id} className="btn-sub w-fit mb-3" onClick={(e) => { useDeleteItem(e, feedbackAPI, e.target.name, window.location.reload(false)) }}>
                                        Delete
                                    </button>
                                </div>
                            )
                        }) : null
                }
            </div>
        </section >
    )
};

export default AdminFeedbacks;
