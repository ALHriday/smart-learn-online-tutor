import { useState } from "react";

const Banner = () => {

    const [slide, setSlide] = useState(0);
    const image = [
        "Banner-photo-1.jpeg",
        "Banner-photo-2.webp",
        "Banner-photo-3.jpeg",
        "Banner-photo-4.jpeg"];

    const handleSlideNext = () => { slide === 3 ? setSlide(0) : setSlide(slide + 1) };
    const handleSlidePrev = () => { slide === 0 ? setSlide(3) : setSlide(slide - 1) };


    return (
        <div className="carousel w-full h-[220px] sm:h-[320px] md:h-[440px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img className="w-full object-cover"
                    // eslint-disable-next-line react/no-unknown-property
                    src={`./images/${image[slide]}`} fetchpriority='high' />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button onClick={handleSlidePrev} className="btn btn-circle">❮</button>
                    <button onClick={handleSlideNext} className="btn btn-circle">❯</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;