import { Link, NavLink, Outlet } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import { Helmet } from "react-helmet-async";
import { FiArrowLeft, FiBookOpen, FiHome, FiPlusCircle, FiUsers } from "react-icons/fi";

const Dashboard = () => {
    const { privateUser, loading, user } = useAppStore();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-base-200">
                <div className="rounded-3xl border border-base-300 bg-base-100 px-8 py-6 text-center shadow-sm">
                    <p className="text-sm uppercase tracking-[0.3em] text-primary">Loading dashboard</p>
                    <p className="mt-2 text-lg font-semibold">Preparing your workspace...</p>
                </div>
            </div>
        );
    }

    const role = privateUser?.role;
    const userName = privateUser?.userName || user?.displayName || 'Guest User';
    const navItems = role === 'admin'
        ? [
            { to: '/dashboard', label: 'Statistics', icon: FiHome },
            { to: '/dashboard/application', label: 'Applications', icon: FiUsers },
        ]
        : role === 'tutor'
            ? [
                { to: '/dashboard', label: 'Tutor Home', icon: FiHome },
                { to: '/dashboard/myTutorials', label: 'My Tutorials', icon: FiBookOpen },
                { to: '/dashboard/addTutorials', label: 'Add Tutorials', icon: FiPlusCircle },
            ]
            : [
                { to: '/dashboard', label: 'Overview', icon: FiHome },
                { to: '/my_booked_tutor', label: 'My Bookings', icon: FiBookOpen },
                { to: '/become_tutor', label: 'Become a Tutor', icon: FiPlusCircle },
            ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
            <Helmet>
                <title>SmartLearn | Dashboard</title>
            </Helmet>

            <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
                <aside className="w-full border-b border-base-300 bg-base-100/90 p-4 shadow-sm backdrop-blur lg:sticky lg:top-0 lg:min-h-screen lg:w-80 lg:border-b-0 lg:border-r">
                    <div className="flex items-center justify-between gap-3 lg:items-start lg:justify-between">
                        <Link to='/' className="text-2xl font-bold sm:text-3xl">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">Smart</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-l from-secondary to-accent">Learn</span>
                        </Link>
                        <Link to='/' className="btn btn-ghost btn-sm rounded-full px-3 lg:mt-2">
                            <FiArrowLeft title="Go to Home" className="mr-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-6 rounded-3xl border border-base-300 bg-base-200/70 p-4">
                        <p className="text-sm uppercase tracking-[0.3em] text-primary">{role ? role : 'learner'} access</p>
                        <p className="mt-2 text-lg font-semibold">{userName}</p>
                        <p className="mt-1 text-sm text-base-content/70">Your studio for lessons, applications, and growth.</p>
                    </div>

                    <nav className="mt-6 space-y-2">
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => `flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'bg-base-100 text-base-content/80 hover:bg-base-200'}`}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* <div className="mt-8 hidden lg:block">
                        <Link className="btn btn-outline w-full" to='/'>Go to Home</Link>
                    </div> */}
                </aside>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mb-6 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-primary">Role-based dashboard</p>
                                <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
                                    Hi, {userName}. Welcome back.
                                </h1>
                                <p className="mt-2 text-sm text-base-content/70">
                                    Manage your learning path, teaching portfolio, or platform oversight from one polished workspace.
                                </p>
                            </div>
                            <div className="rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm font-medium capitalize">
                                {role ? `${role} workspace` : 'learner workspace'}
                            </div>
                        </div>
                    </div>

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;