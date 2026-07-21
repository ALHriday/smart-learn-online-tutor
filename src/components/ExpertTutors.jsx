import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const ExpertTutors = () => {
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/tutors?limit=10&page=1`).then(res => setData(res.data))
    }, [axiosPublic])

    return (
        <Marquee pauseOnHover={true} direction="left">
            <div className="p-4 flex justify-center items-center gap-8 overflow-hidden cursor-pointer">
                {data?.map((tutor, idx) =>
                    <div key={idx} className="w-[180px]  flex flex-col justify-center items-center gap-2 overflow-hidden">
                        <div className="w-[160px] h-[160px] rounded-full flex justify-center items-center">
                            <img className="w-full h-full rounded-full object-cover" src={tutor?.image} alt={tutor?.details}
                                // eslint-disable-next-line react/no-unknown-property
                                fetchpriority="high"
                            />
                        </div>
                        <div className="text-center overflow-hidden h-[160px]">
                            <h1 className="font-bold">{tutor?.name}</h1>
                            <p>{tutor?.details.length < 55 ? tutor?.details.slice(0, 55).concat('...') : tutor?.details}</p>
                        </div>

                        <Helmet>
                            <meta name={tutor?.name} content={tutor?.details} />
                            <link rel="canonical" href={`https://smart-learn-online-tutor.netlify.app`} />
                        </Helmet>
                    </div>
                )}
            </div>
        </Marquee>
    );
};

export default ExpertTutors;