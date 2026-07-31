import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const ExpertTutors = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        let isMounted = true;

        axiosPublic.get(`/tutors?limit=10&page=1`)
            .then((res) => {
                if (isMounted) {
                    setData(res.data);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [axiosPublic]);

    return (
        <div className="rounded-[2rem] border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
            <Helmet>
                <meta name="description" content="Meet some of the expert tutors available on SmartLearn." />
            </Helmet>

            {loading ? (
                <div className="flex gap-4 overflow-hidden">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="w-[180px] animate-pulse rounded-[1.5rem] border border-base-300 bg-base-200/80 p-4">
                            <div className="mx-auto h-[140px] w-[140px] rounded-full bg-base-300" />
                            <div className="mt-4 h-4 rounded bg-base-300" />
                            <div className="mt-2 h-3 rounded bg-base-300" />
                        </div>
                    ))}
                </div>
            ) : (
                <Marquee pauseOnHover direction="left">
                    <div className="flex items-start gap-4 overflow-hidden p-2">
                        {data?.map((tutor) => (
                            <article key={tutor?._id} className="w-[180px] rounded-[1.5rem] border border-base-300 bg-base-200/60 p-4 text-center">
                                <img
                                    className="mx-auto h-[140px] w-[140px] rounded-full object-cover"
                                    src={tutor?.image}
                                    alt={`${tutor?.name} profile`}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <h3 className="mt-4 font-semibold">{tutor?.name}</h3>
                                <p className="mt-2 text-sm leading-6 text-base-content/70">
                                    {tutor?.details?.length > 70 ? `${tutor.details.slice(0, 67)}...` : tutor?.details}
                                </p>
                            </article>
                        ))}
                    </div>
                </Marquee>
            )}
        </div>
    );
};

export default ExpertTutors;