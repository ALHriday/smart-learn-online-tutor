import { Link } from 'react-router-dom';
import { FiCalendar, FiCompass, FiPlayCircle } from 'react-icons/fi';
import useAppStore from '../store/useAppStore';

const UserHome = () => {
    const { user, myBookedTutor } = useAppStore();
    const bookedCount = myBookedTutor?.length || 0;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-base-300 bg-gradient-to-br from-accent/10 via-base-100 to-secondary/10 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">Learner workspace</p>
                <h2 className="mt-2 text-2xl font-semibold">{user?.displayName || 'Guest Learner'}</h2>
                <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                    Continue your learning journey, review your bookings, and find the next tutor that fits your goals.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Link to="/find_tutors" className="btn btn-sm btn-secondary">Find Tutors</Link>
                    <Link to="/my_booked_tutor" className="btn btn-sm btn-outline">My Bookings</Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-base-content/70">Booked tutors</p>
                        <FiCalendar className="text-primary" />
                    </div>
                    <p className="mt-3 text-3xl font-semibold">{bookedCount}</p>
                    <p className="mt-2 text-sm text-base-content/70">Active sessions ready to follow through.</p>
                </div>
                <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-base-content/70">Next step</p>
                        <FiCompass className="text-secondary" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold">Discover a new tutor</p>
                    <p className="mt-2 text-sm text-base-content/70">Explore lessons by topic, price, and language to match your goals.</p>
                </div>
            </div>

            <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="flex items-center gap-2">
                    <FiPlayCircle className="text-accent" />
                    <h3 className="text-xl font-semibold">Start here</h3>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <Link to="/find_tutors" className="rounded-2xl border border-base-300 bg-base-200/70 p-4 transition hover:bg-base-200">
                        <p className="font-semibold">Explore tutors</p>
                        <p className="mt-1 text-sm text-base-content/70">Browse mentors by language and price with a faster search flow.</p>
                    </Link>
                    <Link to="/become_tutor" className="rounded-2xl border border-base-300 bg-base-200/70 p-4 transition hover:bg-base-200">
                        <p className="font-semibold">Become a tutor</p>
                        <p className="mt-1 text-sm text-base-content/70">Share your expertise and build a teaching profile in minutes.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
