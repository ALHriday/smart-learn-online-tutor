import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const { privateUser, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="text-center my-6">Loading Dashboard...</div>
    }

    return (
        <div className="flex flex-col lg:flex-row">
            <Helmet>
                <title>SmartLearn | Dashboard</title>
            </Helmet>
            <div className="lg:w-[300px] flex flex-col lg:min-h-screen gap-1 shadow-md">
                <div className="flex flex-col lg:justify-between lg:min-h-screen">
                    <div className="flex flex-col gap-2 lg:gap-0">
                        <div className="text-5xl lg:text-4xl font-bold p-4 shadow-sm rounded-md">
                            <Link to='/'> <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">Smart</span> <span className="bg-clip-text text-transparent bg-gradient-to-l from-secondary to-accent">Learn</span></Link>
                        </div>
                        <div className="flex lg:flex-col gap-1 mt-2 px-4 py-2 overflow-auto no-scrollbar snap-x">

                            {privateUser?.role === 'admin' && <>
                                <Link className="lg:w-full btn btn-sm bg-base-100 lg:text-start lg:pl-4" to='/dashboard'>Statistics</Link>
                                <Link className="lg:w-full btn btn-sm bg-base-100 lg:text-start lg:pl-4" to='/dashboard/application'>Application</Link>
                            </>
                            }
                            {privateUser?.role === 'tutor' && <>                                <Link className="lg:w-full btn btn-sm bg-base-100 lg:text-start lg:pl-4" to='/dashboard'>Tutor Home</Link>
                                <Link className="lg:w-full btn btn-sm bg-base-100" to='/dashboard/myTutorials lg:text-start lg:pl-4'>My Tutorials</Link>
                                <Link className="lg:w-full btn btn-sm bg-base-100" to='/dashboard/addTutorials lg:text-start lg:pl-4'>Add Tutorials</Link>
                            </>

                            }
                        </div>
                    </div>
                    <div className="hidden lg:flex">
                        <Link className="btn bg-base-100 w-full" to='/'>Go to Home</Link>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[calc(100%-260px)] min-h-screen p-4">
                <h1 className="text-2xl font-bold my-4 border-b-2">Hi, {privateUser?.userName ? privateUser?.userName.toUpperCase() : ''}. <br /> Welcome to Dashboard. </h1>
                {privateUser?.role && <Outlet></Outlet>}
            </div>
        </div>
    );
};

export default Dashboard;