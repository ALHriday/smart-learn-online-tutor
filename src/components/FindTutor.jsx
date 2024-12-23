import { useLoaderData } from "react-router-dom";
import Tutor from "./Tutor";

const FindTutor = () => {
    const data = useLoaderData();
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 justify-center">
            {data && data.map(tutor => <Tutor tutor={tutor} key={tutor._id}></Tutor>)}
        </div>
    )
}

export default FindTutor;