import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import BookedTutor from "./BookedTutor";

const MyBookedTutor = () => {
    const { myBookedTutor } = useContext(AuthContext);
    console.log(myBookedTutor);



    return (
        <div className="md:w-2/3 px-6 py-4 my-4 mx-auto grid grid-cols-1 gap-2 bg-gray-800">
            <h1 className="text-4xl py-4 font-bold text-center text-white">My Booked Tutor</h1>
            <div className="flex flex-col gap-2">
                {myBookedTutor && myBookedTutor.map(tutor => <BookedTutor key={tutor._id} tutor={tutor}></BookedTutor>)}
            </div>
        </div>
    );
};

export default MyBookedTutor;