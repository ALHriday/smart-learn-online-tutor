import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext, useRef } from "react";


const FindTutor = () => {
    const { setSearch, setSkip, stats, tutorData, skip, slide, setSlide } = useContext(AuthContext);
    const langValueRef = useRef();

    const pages = Math.ceil(stats?.tutorLen / 10) || 0;
    const perPage = 10;
    const pageNum = skip / perPage;

    const handlePagination = (page) => {
        const skipPage = page * perPage;
        setSkip(skipPage);
    }

    const handlePrev = () => {
        slide === 0 ? setSlide(pages - 1) : setSlide(slide - 1);
        setSkip(slide * perPage);
    }
    const handleNext = () => {
        slide === pages - 1 ? setSlide(0) : setSlide(slide + 1);
        setSkip(slide * perPage);
    }


    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-4">
                    <form onChange={(e) => setSearch(e.target.value)} className="w-full flex gap-2 justify-center items-center">
                        <label className="input input-bordered flex items-center gap-2">
                            <input ref={langValueRef} type="text" className="grow w-full" placeholder="Search by language" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </form>
                    <div className="w-[120px]">
                        <button onClick={() => setSkip(0)} className="btn">All Tutors</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 h-auto sm:h-[900px] lg:h-[800px] place-content-start overflow-auto">

                {tutorData && tutorData.map(tutor =>
                    <div key={tutor?._id} className="bg-base-100 shadow-md grid grid-cols-5 rounded-md mx-2 cursor-pointer hover:scale-105 transition ease-in h-36 sm:h-40 max-h-52">
                        <div className="h-36 sm:h-40 max-h-52 flex justify-center items-center p-2 col-span-2">
                            <img className="rounded-md w-full h-full object-cover"
                                src={tutor?.image}
                                alt={tutor?.details}
                                // eslint-disable-next-line react/no-unknown-property
                                fetchpriority="high"
                            />
                        </div>
                        <div className="col-span-3 p-2 flex flex-col justify-between">
                            <div className="font-bold text-sm sm:text-xl">   {tutor?.name}
                                <div className="badge badge-secondary ml-1">{tutor?.review}
                                </div>
                            </div>
                            <div className=" flex gap-1">
                                <div className="w-6 h-6">
                                    <img src="https://img.icons8.com/?size=100&id=9m2yplxz2fr3&format=png&color=000000" alt="" />
                                </div>
                                <div>{tutor?.language}</div>
                            </div>

                            <div className="flex flex-col gap-1 justify-between">
                                <div className="text-md flex justify-between items-center">
                                    <div className="font-bold">${tutor?.price}</div>
                                    <div className="card-actions">
                                        <Link to={`/tutor_details/${tutor?._id}`} className="btn btn-secondary btn-sm mt-2">Details</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </div>
            {pages &&
                <div className="p-4 flex justify-center items-center gap-2">
                    <button onClick={handlePrev} className="btn">Prev</button>
                    {Array.from({ length: pages }, (_, i) => <button onClick={() => handlePagination(i)} className={` ${pageNum === i ? 'btn-accent' : ''} btn btn-md`} key={i}>{i + 1}</button>)}
                    <button onClick={handleNext} className="btn">Next</button>
                </div>
            }
        </div>

    )
}

export default FindTutor;