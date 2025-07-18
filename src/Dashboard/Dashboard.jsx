import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Dashboard = () => {
    const { privateUser } = useContext(AuthContext);
    
    return (
        <div className="flex">
            <div className="w-[300px] flex flex-col min-h-screen gap-1 shadow-md">
                <div className="flex flex-col justify-between min-h-screen">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold p-4 shadow-sm rounded-md">SmartLearn</h1>
                        <div className="flex flex-col gap-1 mt-2 p-4">
                            {privateUser?.role  && <>
                                <Link className="btn btn-sm bg-base-100" to='/dashboard'>Application</Link>
                                <Link className="btn btn-sm bg-base-100" to='/dashboard/my_tutorials'>My Tutorials</Link>
                                <Link className="btn btn-sm bg-base-100" to='/dashboard/add_tutorials'>Add Tutorials</Link>
                            </>}
                        </div>
                    </div>
                    <div>
                        <Link className="btn bg-base-100 w-full" to='/'>Go to Home</Link>
                    </div>
                </div>
            </div>
            
            <div className="w-[calc(100%-260px)] min-h-screen p-4">
                <h1 className="text-2xl font-bold my-4 border-b-2">Hi, {privateUser?.userName ? privateUser?.userName.toUpperCase() : ''}. <br /> Welcome to Dashboad. </h1>
                {privateUser?.role && <Outlet></Outlet>}
                
            </div>
        </div>
    );
};

export default Dashboard;