import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
// import { toast } from "react-toastify";

const TutorDetails = () => {
    const { user, heartCount, setHeartCount, notify} = useContext(AuthContext);
    const tutor = useLoaderData();

    const { name, image, language, review, price, details } = tutor;

    const email = user?.email;

    const data = { name, image, language, review, price, details, email }


    const handleBookedTutor = () => {

        if (!user) {         
            return notify('Please LogIn');
        }

        fetch('https://online-tutor-server-web.vercel.app/bookedTutor',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(result => {
                if (result.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Tutor Booked Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="md:w-1/2 p-4 my-4 md:p-0 mx-auto bg-base-100 shadow-xl grid grid-cols-1">
            <div className="flex justify-center items-center p-2">
                <img className="rounded-md w-full h-full"
                    src={image}
                />
            </div>
            <div className="p-2 flex flex-col justify-center items-center gap-2">
                <div className="font-bold text-center text-xl">{name}
                    <div className="badge badge-secondary ml-1">{review}</div>
                </div>

                <div className="flex flex-col justify-center items-center gap-1">
                    <div className=" flex gap-1">
                        <div className="w-6 h-6">
                            <img src="https://img.icons8.com/?size=100&id=9m2yplxz2fr3&format=png&color=000000" alt="" />
                        </div>
                        <div>{language}</div>
                    </div>

                    <div className="text-md text-center">
                        <div className="font-bold">${price} per hour</div>
                        <p>{details}</p>
                    </div>
                    <div className="py-4 flex gap-4">
                        <button onClick={handleBookedTutor} className="btn btn-accent">Book Tutor</button>
                        <ToastContainer></ToastContainer>
                        <div onClick={() => setHeartCount(heartCount + 1)} className="w-14 h-10 btn btn-neutral flex justify-center items-center rounded-md hover:btn-error">
                            <FaRegHeart />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default TutorDetails;