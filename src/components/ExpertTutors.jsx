import Marquee from "react-fast-marquee";
import AxiosPublic from "../Hooks/AxiosPublic";

const ExpertTutors = () => {
    const { data } = AxiosPublic(`/tutors?limit=10&skip=10`);

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
                    </div>
                )}
            </div>
        </Marquee>
    );
};

export default ExpertTutors;