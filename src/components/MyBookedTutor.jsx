import useAppStore from "../store/useAppStore";
import BookedTutor from "./BookedTutor";
import { FiBookOpen, FiCalendar } from "react-icons/fi";

const MyBookedTutor = () => {
    const { myBookedTutor } = useAppStore();
    const bookedCount = myBookedTutor?.length || 0;

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-base-300 bg-gradient-to-br from-secondary/10 via-base-100 to-accent/10 p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-secondary">Your learning plan</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">My Booked Tutors</h1>
                        <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                            Track your upcoming sessions and keep your lessons close at hand.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-base-300 bg-base-100 px-4 py-2 shadow-sm">
                        <FiCalendar className="text-primary" />
                        <span className="text-sm font-medium">{bookedCount} booked sessions</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                {bookedCount ? (
                    myBookedTutor.map((tutor, idx) => <BookedTutor key={idx} tutor={tutor} />)
                ) : (
                    <div className="rounded-[2rem] border border-dashed border-base-300 bg-base-100 p-10 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-base-200">
                            <FiBookOpen className="text-2xl text-secondary" />
                        </div>
                        <h2 className="mt-4 text-xl font-semibold">No bookings yet</h2>
                        <p className="mt-2 text-sm text-base-content/70">
                            Browse tutors and reserve your first session to see it here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookedTutor;