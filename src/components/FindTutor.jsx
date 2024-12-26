import { AuthContext } from "../AuthProvider/AuthProvider";
import Tutor from "./Tutor";
import { useContext, useRef } from "react";

const FindTutor = () => {

    const langValueRef = useRef();
    const { tutorsData, setTutorData } = useContext(AuthContext);

    const handleSearch = () => {
        const value = langValueRef.current.value;
        if (value) {
            fetch(`https://online-tutor-server-web.vercel.app/tutors/category/${value}`)
                .then(res => res.json())
                .then(data => {
                    setTutorData(data);
                }
                )

        } else {
            fetch(`https://online-tutor-server-web.vercel.app/tutors`)
                .then(res => res.json())
                .then(data => {
                    setTutorData(data);
                }
                )
        }
    }

    return (
        <div>
            <div>
                <form onChange={() => handleSearch()} className="w-full flex gap-2 justify-center items-center mt-2">
                    <label className="input input-bordered flex items-center gap-2">
                        <input ref={langValueRef} type="text" className="grow w-full" placeholder="Search" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </form>
                <h1 className="text-sm py-2 text-center text-slate-600">Search Tutors Based on Language</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 justify-center">
                {tutorsData && tutorsData.map(tutor => <Tutor tutor={tutor} key={tutor._id}></Tutor>)}
            </div>
        </div>

    )
}

export default FindTutor;