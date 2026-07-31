import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
    { image: "Banner-photo-1.jpeg", title: "Speak with confidence", subtitle: "Learn from tutors who adapt to your pace and goals." },
    { image: "Banner-photo-2.webp", title: "Practice every day", subtitle: "Build real conversation skills with guided lessons and feedback." },
    { image: "Banner-photo-3.jpeg", title: "Learn from anywhere", subtitle: "Join flexible sessions designed around your schedule." },
    { image: "Banner-photo-4.jpeg", title: "Grow with support", subtitle: "Stay motivated with a friendly community and personalized coaching." },
];

const Banner = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => window.clearInterval(timer);
    }, []);

    const goToSlide = (index) => setActiveSlide(index);
    const handleSlideNext = () => setActiveSlide((prev) => (prev + 1) % slides.length);
    const handleSlidePrev = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const currentSlide = slides[activeSlide];

    return (
        <section className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="relative mx-auto h-[320px] max-w-7xl overflow-hidden rounded-[2rem] shadow-lg sm:h-[420px] lg:h-[560px]">
                <img
                    className="h-full w-full object-cover"
                    src={`./images/${currentSlide.image}`}
                    alt={currentSlide.title}
                    loading="eager"
                    decoding="async"
                    // eslint-disable-next-line react/no-unknown-property
                    fetchpriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-slate-950/20" />

                <div className="absolute inset-0 flex items-center">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
                        <div className="max-w-2xl text-white">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-200">SmartLearn</p>
                            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">{currentSlide.title}</h1>
                            <p className="mt-4 max-w-xl text-base leading-8 text-slate-100/90 sm:text-lg">{currentSlide.subtitle}</p>
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <Link to="/find_tutors" className="btn btn-secondary rounded-full px-6">Find a tutor</Link>
                                <Link to="/about" className="btn btn-outline rounded-full border-white/80 px-6 text-white hover:bg-white hover:text-slate-900">Learn more</Link>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm sm:self-auto">
                            <button onClick={handleSlidePrev} className="btn btn-circle btn-sm border-0 bg-white/15 text-white hover:bg-white/25" aria-label="Previous slide">
                                <FiChevronLeft />
                            </button>
                            <button onClick={handleSlideNext} className="btn btn-circle btn-sm border-0 bg-white/15 text-white hover:bg-white/25" aria-label="Next slide">
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.title}
                            onClick={() => goToSlide(index)}
                            className={`h-2.5 w-2.5 rounded-full transition ${index === activeSlide ? 'bg-white' : 'bg-white/40'}`}
                            aria-label={`View slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;