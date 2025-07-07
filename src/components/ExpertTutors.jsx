import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Marquee from "react-fast-marquee";

const ExpertTutors = () => {
    const { expertTutor } = useContext(AuthContext);

    const tutors = expertTutor && expertTutor.slice(15, expertTutor.length);

    return (
        <Marquee pauseOnHover={true} direction="left">
            <div className="p-4 flex justify-center items-center gap-8 overflow-hidden cursor-pointer">
                {tutors.map(tutor =>
                    <div key={tutor._id} className="w-[180px]  flex flex-col justify-center items-center gap-2 overflow-hidden">
                        <div className="w-[160px] h-[160px] rounded-full flex justify-center items-center">
                            <img className="w-full h-full rounded-full object-cover" src={tutor?.image} alt="" />
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