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
                    <div key={tutor._id} className="w-[220px] flex flex-col justify-center items-center gap-2">
                        <div className="w-[200px] h-[200px] rounded-full">
                            <img className="w-full h-full rounded-full object-cover" src={tutor?.image} alt="" />
                        </div>
                        <div className="text-center">
                            <h1 className="font-bold">{tutor?.name}</h1>
                            <p>{tutor?.details}</p>
                        </div>
                    </div>
                )}
            </div>
        </Marquee>
    );
};

export default ExpertTutors;