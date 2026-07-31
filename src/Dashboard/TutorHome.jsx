import { useEffect } from 'react';
import { FiBookOpen, FiDollarSign, FiLayers, FiTrendingUp } from 'react-icons/fi';
import useAppStore from '../store/useAppStore';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const TutorHome = () => {
    const { user, tutorials, setTutorials, myBookedTutor } = useAppStore();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/tutorials/${user.email}`)
                .then((res) => setTutorials(res.data))
                .catch(() => setTutorials([]));
        }
    }, [axiosPublic, setTutorials, user?.email]);

    const totalTutorials = tutorials?.length || 0;
    const averagePrice = totalTutorials
        ? (tutorials.reduce((sum, tutorial) => sum + (Number(tutorial?.price) || 0), 0) / totalTutorials).toFixed(0)
        : 0;
    const bookingCount = myBookedTutor?.length || 0;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-base-300 bg-gradient-to-br from-secondary/10 via-base-100 to-accent/10 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-secondary">Tutor workspace</p>
                <h2 className="mt-2 text-2xl font-semibold">You are shaping the next lesson</h2>
                <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                    Keep your lessons visible, track your bookings, and refresh your teaching plans from one place.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-base-content/70">Published lessons</p>
                        <FiBookOpen className="text-secondary" />
                    </div>
                    <p className="mt-3 text-3xl font-semibold">{totalTutorials}</p>
                </div>
                <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-base-content/70">Average price</p>
                        <FiDollarSign className="text-accent" />
                    </div>
                    <p className="mt-3 text-3xl font-semibold">${averagePrice}</p>
                </div>
                <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-base-content/70">Bookings received</p>
                        <FiTrendingUp className="text-primary" />
                    </div>
                    <p className="mt-3 text-3xl font-semibold">{bookingCount}</p>
                </div>
            </div>

            <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold">Your latest lessons</h3>
                        <p className="mt-1 text-sm text-base-content/70">A quick snapshot of the tutorials you currently offer.</p>
                    </div>
                    <div className="rounded-full bg-base-200 px-3 py-2 text-sm font-medium">
                        <FiLayers className="mr-1 inline" /> {totalTutorials} total
                    </div>
                </div>

                {totalTutorials ? (
                    <div className="mt-4 grid gap-3">
                        {tutorials.slice(0, 3).map((tutorial) => (
                            <div key={tutorial?._id} className="flex items-center justify-between rounded-2xl border border-base-300 bg-base-200/70 p-4">
                                <div>
                                    <p className="font-semibold">{tutorial?.name || 'Tutorial'}</p>
                                    <p className="text-sm text-base-content/70">{tutorial?.language || 'Language'} • {tutorial?.details?.slice(0, 60) || 'A polished lesson ready for learners.'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-secondary">${tutorial?.price || 0}</p>
                                    <p className="text-xs text-base-content/70">per session</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 rounded-2xl border border-dashed border-base-300 bg-base-200/60 p-6 text-center text-sm text-base-content/70">
                        Add your first lesson to start attracting learners.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorHome;