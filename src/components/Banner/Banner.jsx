
const Banner = () => {
    return (
        <div className="carousel w-full max-h-[440px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src="https://images.pexels.com/photos/5905704/pexels-photo-5905704.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="w-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="w-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src="https://images.pexels.com/photos/10494253/pexels-photo-10494253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="w-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src="https://images.pexels.com/photos/6671991/pexels-photo-6671991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="w-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;