import PropTypes from "prop-types";
import useAppStore from "../store/useAppStore";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FiClock, FiTrash2, FiUser } from "react-icons/fi";

const BookedTutor = ({ tutor }) => {
    const axiosPublic = useAxiosPublic();
    const { myBookedTutor, setMyBookedTutor } = useAppStore();
    const { _id, name, language, image, price, details, review } = tutor;

    const handleDeleteBookedTutor = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/bookedTutor/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your booking has been removed.",
                            icon: "success"
                        });
                        const remaining = myBookedTutor.filter(bookedTutor => bookedTutor._id !== id);
                        setMyBookedTutor(remaining);
                    }
                });
            }
        });
    };

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-100 shadow-sm transition hover:shadow-md lg:flex-row">
            <div className="relative lg:w-56">
                <img
                    className="h-48 w-full object-cover lg:h-full"
                    src={image}
                    alt={details}
                    // eslint-disable-next-line react/no-unknown-property
                    fetchpriority="high"
                />
                <button
                    onClick={() => handleDeleteBookedTutor(_id)}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-error/90 text-white shadow-lg transition hover:scale-105"
                    aria-label="Remove booking"
                >
                    <FiTrash2 className="h-4 w-4" />
                </button>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-semibold">{name}</h2>
                        <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                            {review || 'Top rated'}
                        </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-base-content/70">
                        <span className="rounded-full bg-base-200 px-3 py-1">{language}</span>
                        <span className="rounded-full bg-base-200 px-3 py-1">${price} / hour</span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-base-content/70">{details}</p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-base-300 pt-4 text-sm text-base-content/70">
                    <span className="flex items-center gap-2">
                        <FiClock className="text-primary" /> Scheduled session
                    </span>
                    <span className="flex items-center gap-2">
                        <FiUser className="text-accent" /> Personalized lesson
                    </span>
                </div>
            </div>
        </div>
    );
};

BookedTutor.propTypes = {
    tutor: PropTypes.object
};

export default BookedTutor;