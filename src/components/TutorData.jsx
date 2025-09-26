import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";


const TutorData = () => {
    const { tutorData } = useContext(AuthContext);

    return (
        <div>
            {tutorData && tutorData.map(tutor =>
                <div key={tutor?._id} className="bg-base-100 shadow-md grid grid-cols-5 rounded-md mx-2 cursor-pointer hover:scale-105">
                    <div className="h-36 sm:h-40 max-h-52 flex justify-center items-center p-2 col-span-2">
                        <img className="rounded-md w-full h-full object-cover"
                            src={tutor?.image}
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
    );
};

export default TutorData;