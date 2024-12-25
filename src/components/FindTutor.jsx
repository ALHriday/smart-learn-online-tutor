// import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Tutor from "./Tutor";
import { useContext } from "react";

const FindTutor = () => {
    // const data = useLoaderData();
    const { tutorsData } = useContext(AuthContext);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 justify-center">
            {tutorsData && tutorsData.map(tutor => <Tutor tutor={tutor} key={tutor._id}></Tutor>)}
        </div>
    )
}

export default FindTutor;