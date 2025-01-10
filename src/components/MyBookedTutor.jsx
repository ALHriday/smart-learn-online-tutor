import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import BookedTutor from "./BookedTutor";

const MyBookedTutor = () => {
    const { myBookedTutor, user ,setMyBookedTutor} = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://online-tutor-server-web.vercel.app/addedTutor/${user.email}`)
            .then(res => res.json())
            .then(data => setMyBookedTutor(data))
    }, [user.email, setMyBookedTutor]);
    
    
    return (
        <div className="px-6 py-4 my-4 mx-auto grid grid-cols-1 gap-2">
            <h1 className="text-3xl md:text-4xl py-4 font-bold text-center ">{`My Booked Tutor ( ${myBookedTutor.length} )`}</h1>
            <div className="flex flex-col gap-4">
                {myBookedTutor && myBookedTutor.map(tutor => <BookedTutor key={tutor._id} tutor={tutor}></BookedTutor>)}
            </div>
        </div>
    );
};

export default MyBookedTutor;