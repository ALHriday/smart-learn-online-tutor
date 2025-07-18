import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, signOutUser, setUser, toggle, handleToggle, privateUser } = useContext(AuthContext);

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                setUser(null);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "LogOut Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            ).catch(error => error)
    }

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50">
            <div className="flex-1">
                <Link className="text-2xl font-bold" to='/'>Smart Learn</Link>
            </div>
            <div className="flex-none">
                <div className="dropdown hidden lg:flex gap-2 dropdown-end">
                    <Link className="btn btn-sm" to='/'>Home</Link>
                    <Link className="btn btn-sm" to='/find_tutors'>Find Tutors</Link>
                    <Link className="btn btn-sm" to='/become_tutor'>Become a Tutor</Link>
                    {user &&
                        <div className="flex gap-2">
                            <Link className="btn btn-sm" to='/my_booked_tutor'>My Booked Tutor</Link>
                        </div>}
                    {privateUser?.role &&
                        <Link className="btn btn-sm" to='/dashboard'>Dashboard</Link>}
                </div>
                <div className="dropdown mx-3 mt-1 dropdown-end">
                    <div onClick={handleToggle}>
                        <label className="swap swap-rotate">
                            <input type="checkbox"
                                className="theme-controller" value={toggle} />
                            <svg
                                className="swap-off h-8 w-8 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-8 w-8  fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </div>
                </div>

                <div className="dropdown dropdown-end flex lg:justify-center lg:items-center gap-2">
                    <div className="hidden lg:block">
                        {user ?
                            <div>
                                <button onClick={handleLogOut} className="btn btn-sm">LogOut</button>
                            </div>
                            :
                            <div>
                                {/* <Link to='/register' className="btn btn-sm mr-2">Register</Link> */}
                                <Link to='/login' className="btn btn-sm">LogIn</Link>
                            </div>

                        }
                    </div>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

                        <div className="w-10 rounded-full">
                            {user ? <img
                                src={user?.photoURL}
                                alt={user?.displayName}
                                title={user?.displayName}
                            />
                                :
                                <div>
                                    <img className={toggle === 'dark' ? 'bg-slate-300' : 'bg-white'} src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000" alt="" />
                                </div>
                            }

                        </div>

                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow lg:hidden">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/find_tutors'>Find Tutors</Link></li>
                        <li><Link to='/become_tutor'>Become a Tutor</Link></li>
                        {user &&
                            <li><Link to='/my_booked_tutor'>My Booked Tutor</Link></li>
                        }
                        {privateUser?.role &&
                            <li><Link to='/dashboard'>Dashboard</Link></li>}

                        <li><div>
                            {user ?
                                <div>
                                    <button onClick={handleLogOut} className="btn btn-sm">LogOut</button>
                                </div>
                                :
                                <div>
                                    <Link to='/register' className="btn btn-sm mr-2">Register</Link>
                                    <Link to='/login' className="btn btn-sm">LogIn</Link>
                                </div>

                            }
                        </div></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;