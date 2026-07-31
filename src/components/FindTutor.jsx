import { Link } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { FiSearch, FiUsers } from "react-icons/fi";

const FindTutor = () => {
    const { setSearch, stats, tutorData, page, setPage, setLimit, limit } = useAppStore();
    const langValueRef = useRef(null);

    const totalPage = Math.max(1, Math.ceil((stats?.tutorLen || tutorData?.length || 0) / limit)) || 1;

    useEffect(() => {
        if (page > totalPage) {
            setPage(totalPage);
        }
    }, [page, totalPage, setPage]);

    const handlePagination = (nextPage) => {
        setPage(nextPage);
    };

    const handlePrev = () => {
        page > 1 && setPage(page - 1);
    };

    const handleNext = () => {
        page < totalPage && setPage(page + 1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
        setLimit(12);
    };

    const handleAllTutors = () => {
        setSearch('');
        setPage(1);
        setLimit(12);
        if (langValueRef.current) {
            langValueRef.current.value = '';
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Helmet>
                <title>SmartLearn | Tutors</title>
                <meta name="description" content="Browse and discover expert tutors on SmartLearn." />
            </Helmet>

            <div className="rounded-[2rem] border border-base-300 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-primary">Find your match</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Browse expert tutors</h1>
                        <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                            Search by language and explore tutors that are ready to guide your next lesson.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium shadow-sm">
                        <FiUsers className="text-secondary" />
                        <span>{stats?.tutorLen || tutorData?.length || 0} tutors available</span>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 md:flex-row">
                    <form onSubmit={(e) => e.preventDefault()} className="flex-1">
                        <label className="input input-bordered flex items-center gap-2 rounded-full bg-base-100">
                            <FiSearch className="h-4 w-4 opacity-70" />
                            <input
                                name="search"
                                ref={langValueRef}
                                type="text"
                                className="grow"
                                placeholder="Search by language"
                                autoComplete="on"
                                autoCorrect="on"
                                onChange={handleSearch}
                            />
                        </label>
                    </form>
                    <button onClick={handleAllTutors} className="btn btn-outline rounded-full">
                        All Tutors
                    </button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tutorData?.map((tutor) => (
                    <div
                        key={tutor?._id}
                        className="group overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="h-48 overflow-hidden">
                            <img
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                src={tutor?.image}
                                alt={tutor?.details}
                                // eslint-disable-next-line react/no-unknown-property
                                fetchpriority="high"
                            />
                        </div>
                        <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold">{tutor?.name}</h2>
                                    <p className="mt-1 text-sm text-base-content/70">{tutor?.language}</p>
                                </div>
                                <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                                    {tutor?.review || 'Top rated'}
                                </span>
                            </div>

                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-base-content/70">
                                {tutor?.details || 'A dedicated tutor ready to help you build confidence and skill.'}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-base-content/50">Starting from</p>
                                    <p className="text-xl font-semibold">${tutor?.price}</p>
                                </div>
                                <Link to={`/tutor_details/${tutor?._id}`} className="btn btn-secondary btn-sm rounded-full">
                                    View profile
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPage > 1 && (
                <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
                    <button onClick={handlePrev} className="btn btn-sm rounded-full">Prev</button>
                    {Array.from({ length: totalPage }, (_, i) => (
                        <button
                            onClick={() => handlePagination(i + 1)}
                            className={`btn btn-sm rounded-full ${page === (i + 1) ? 'btn-accent' : 'btn-outline'}`}
                            key={i}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={handleNext} className="btn btn-sm rounded-full">Next</button>
                </div>
            )}
        </div>
    );
};

export default FindTutor;