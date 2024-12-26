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

        <div className="card flex flex-col md:grid md:grid-cols-3 justify-center items-center bg-base-100 shadow-xl relative">
            <div className="p-4 md:pl-4 rounded-md md:col-span-1">
                <img className="rounded-md"
                    src={image}
                    alt="Tutor" />
                <div>
                    <div onClick={() => handleDeleteBookedTutor(_id)} className="w-10 h-10 bg-red-600 absolute -top-2 -right-2 flex justify-center items-center font-bold text-xl rounded-full text-white cursor-pointer">X</div>
                </div>
            </div>

            <div className="card-body col-span-1 md:col-span-2">
                <h2 className="card-title">Title: {name}
                    <div className="badge badge-secondary ml-1 ">{review}</div></h2>
                <p>Language: {language}</p>
                <p>${price} per hour</p>
                <div>Description:
                    <p>{details}</p>
                </div>
            </div>

        </div>
    );
};

BookedTutor.propTypes = {
    tutor: PropTypes.object
}

export default BookedTutor;