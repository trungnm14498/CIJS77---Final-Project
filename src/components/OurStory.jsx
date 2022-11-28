import img1 from '../assets/image/story-1.png';
import img2 from '../assets/image/story-2.png';

const OurStory = () => {
    return (
        <>
            <span id='story'></span>
            <section className="xl:max-w-[1280px] w-full mx-auto sm:px-10 px-20 flex flex-col sm:mt-40 mt-28">
                <div className='w-fit xs:mb-5'>
                    <h2 className='font-play sm:text-7xl ss:text-5xl text-3xl text-gradient uppercase inline-block'>O U R &nbsp; S T O R Y.</h2>
                    <div className='h-[3px] bg-cf-gradient' />
                </div>

                <div className="relative mt-[100px] pt-[300px] flex justify-end sm:flex-row flex-col">
                    <div className="picture absolute top-[-20px] rotate-[10deg]">
                        <img src={img1} alt="story-1" className='max-h-[300px]' />
                    </div>
                    <div className='bg-black-gradient max-w-[800px] sm:pl-80 sm:py-16 md:px-14 px-8 py-20 rounded-xl'>
                        <p className='sm:text-base md:text-xl text-lg'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo mollitia dolorum ex nesciunt fugit et tempore incidunt quisquam eligendi dolores, delectus explicabo! Magnam, aperiam quae maxime porro quaerat temporibus animi?
                        </p>
                    </div>
                    <div className="sm:absolute static picture sm:left-[75px] left-0 sm:top-[50px] top-0 rotate-[-10deg]">
                        <img src={img2} alt="story-2" className='sm:max-h-[450px] max-h-[500px]' />
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurStory;
