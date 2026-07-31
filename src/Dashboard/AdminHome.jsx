import Statistics from './Statistics';

const AdminHome = () => {
    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-base-300 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Admin overview</p>
                <h2 className="mt-2 text-2xl font-semibold">Stay on top of the platform</h2>
                <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                    Review tutor activity, applications, and learner demand from one central dashboard.
                </p>
            </div>
            <Statistics />
        </div>
    );
};

export default AdminHome;