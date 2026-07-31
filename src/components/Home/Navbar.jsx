import { Link } from "react-router-dom";
import useAppStore from "../../store/useAppStore";
import Swal from "sweetalert2";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";

const Navbar = () => {
    const { user, signOutUser, setUser, toggle, handleToggle, privateUser } = useAppStore();
    const profileName = user?.displayName || privateUser?.userName || 'Guest User';
    const profileImage = user?.photoURL || 'https://img.icons8.com/?size=100&id=7819&format=png&color=000000';

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
            })
            .catch(error => error);
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/find_tutors', label: 'Find Tutors' },
        { to: '/become_tutor', label: 'Become a Tutor' }
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/90 backdrop-blur">
            <div className="navbar mx-auto max-w-7xl px-3 py-2 sm:px-4 lg:px-6">
                <div className="flex-1">
                    <Link to='/' className="flex items-center gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-sm font-bold text-white shadow-md ring-1 ring-white/20">
                            SL
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="text-base font-semibold text-base-content sm:text-lg">SmartLearn</span>
                            <span className="text-xs font-medium uppercase tracking-[0.3em] text-base-content/60">Online tutoring</span>
                        </span>
                    </Link>
                </div>

                <nav className="hidden items-center gap-2 lg:flex">
                    {navLinks.map((link) => (
                        <Link key={link.to} className="btn btn-ghost btn-sm rounded-full" to={link.to}>
                            {link.label}
                        </Link>
                    ))}
                    {user && <Link className="btn btn-ghost btn-sm rounded-full" to='/my_booked_tutor'>My Bookings</Link>}
                    {privateUser?.role && <Link className="btn btn-ghost btn-sm rounded-full" to='/dashboard'>Dashboard</Link>}
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <button onClick={handleToggle} className="btn btn-ghost btn-circle btn-sm" aria-label="Toggle theme">
                        {toggle === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                    </button>
                    <div className="hidden lg:flex">
                        {user ? (
                            <button onClick={handleLogOut} className="btn btn-sm rounded-full">LogOut</button>
                        ) : (
                            <Link to='/login' className="btn btn-sm rounded-full">LogIn</Link>
                        )}
                    </div>

                    <div className="hidden items-center gap-2 rounded-full border border-base-300 bg-base-200/70 px-2 py-1 lg:flex">
                        <div className="avatar">
                            <div className="w-8 rounded-full">
                                <img src={profileImage} alt={profileName} className="object-cover" />
                            </div>
                        </div>
                        <div className="pr-1 text-sm">
                            <p className="font-semibold leading-none">{profileName}</p>
                            <p className="text-xs text-base-content/70">{user ? 'Signed in' : 'Guest'}</p>
                        </div>
                    </div>

                    <div className="dropdown dropdown-end lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
                            <FiMenu className="h-5 w-5" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
                            {navLinks.map((link) => (
                                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
                            ))}
                            {user && <li><Link to='/my_booked_tutor'>My Bookings</Link></li>}
                            {privateUser?.role && <li><Link to='/dashboard'>Dashboard</Link></li>}
                            <li className="mt-2 border-t border-base-300 pt-2">
                                <div className="mb-2 flex items-center gap-2 rounded-2xl bg-base-200/60 p-2">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full">
                                            <img src={profileImage} alt={profileName} className="object-cover" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{profileName}</p>
                                        <p className="text-xs text-base-content/70">{user ? 'Signed in' : 'Guest'}</p>
                                    </div>
                                </div>
                                {user ? (
                                    <button onClick={handleLogOut} className="btn btn-sm w-full">LogOut</button>
                                ) : (
                                    <Link to='/login' className="btn btn-sm w-full">LogIn</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;