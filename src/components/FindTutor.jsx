import { AuthContext } from "../AuthProvider/AuthProvider";
import Tutor from "./Tutor";
import { useContext, useRef } from "react";

const FindTutor = () => {

    const langValueRef = useRef();
    const { tutorsData, search, setSearch } = useContext(AuthContext);  

    let filterData = tutorsData && tutorsData.filter(d => {
        return d.name.toLowerCase().includes(search.toLowerCase()) || d.language.toLowerCase().includes(search.toLowerCase());
    })

    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-4">
                    <form onChange={(e) => setSearch(e.target.value)} className="w-full flex gap-2 justify-center items-center">
                        <label className="input input-bordered flex items-center gap-2">
                            <input ref={langValueRef} type="text" className="grow w-full" placeholder="Search by name or language" />
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
                    <div className="w-[120px]">
                        <button onClick={() => setSearch('')} className="btn">All Tutors</button>
                    </div>
                </div>
                {/* <h1 className="text-sm py-2 text-center text-slate-600">Search Tutors Based on Language</h1> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                <>
                    {filterData.map(tutor => <Tutor tutor={tutor} key={tutor._id}></Tutor>)}
                </>
            </div>
        </div>

    )
}

export default FindTutor;