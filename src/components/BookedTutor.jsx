import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const BookedTutor = ({ tutor }) => {

    const { myBookedTutor, setMyBookedTutor } = useContext(AuthContext);
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
                fetch(`https://online-tutor-server-web.vercel.app/bookedTutor/${id}`, {
                    method: 'DELETE',
                }).then(res => res.json()).then(result => {

                    if (result.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        const remaining = myBookedTutor.filter(bookedTutor => bookedTutor._id !== id);
                        setMyBookedTutor(remaining);
                    }
                })
            }
        });
    }


    return (

        <div className="md:w-9/12 mx-auto grid grid-cols-7 gap-4  justify-center items-center bg-base-100 shadow-md relative p-4 rounded-lg">
            <div className="max-h-[260px] overflow-hidden rounded-md sm:col-span-2 col-span-7">
                <div className="sm:w-[160px] sm:h-[160px]">
                    <img className="rounded-md w-full h-full object-cover"
                        src={image}
                        alt={details}
                        // eslint-disable-next-line react/no-unknown-property
                        fetchpriority="high"
                    />
                </div>
                <div>
                    <div onClick={() => handleDeleteBookedTutor(_id)} className="w-10 h-10 bg-red-600 absolute -top-2 -right-2 flex justify-center items-center font-bold text-xl rounded-full text-white cursor-pointer">X</div>
                </div>
            </div>

            <div className="col-span-7 sm:col-span-5 flex flex-col justify-between items-start">
                <div className="flex flex-wrap gap-1">
                    <h2 className="font-bold">{name}</h2>
                    <p className="badge badge-secondary ml-1">{review}</p>
                </div>

                <p className="font-bold">{language}</p>
                <p><span className="font-bold">${price}</span> per hour</p>
                <p className="flex flex-wrap">
                    {details}
                </p>
            </div>

        </div>
    );
};

BookedTutor.propTypes = {
    tutor: PropTypes.object
}

export default BookedTutor;