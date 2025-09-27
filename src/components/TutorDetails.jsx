import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const TutorDetails = () => {
    const { user, myBookedTutor, setMyBookedTutor } = useContext(AuthContext);
    const tutor = useLoaderData();

    const { _id, likes, name, image, language, review, price, details } = tutor;

    const email = user?.email;


    const userId = user?.uid;
    const alreadyLiked = likes?.find(like => like === userId);


    const handleBookedTutor = () => {
        const data = { name, image, language, review, price, details, email };
        if (!user) {
            return toast('Please LogIn');
        }
        const existing = myBookedTutor.find(d => d.name === name && d.email === email);

        if (existing) {
            return toast('Tutor Already Booked!');
        } else {
            fetch('http://localhost:2100/bookedTutor',
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
                        setMyBookedTutor([...myBookedTutor, data]);
                    }
                })
        }
    }

    const handleLikeTutor = (id) => {
        if (!user) {
            return toast('Please LogIn');
        }

        if (likes.includes(userId)) {

            const removeLike = likes.filter(like => like !== userId);
            const updateLikes = { likes: removeLike };

            axios.put(`http://localhost:2100/tutors/likes/${id}`, updateLikes)
                .then(res => res.data);
        } else {
            likes.push(userId);
            const updateLikes = { likes };

            axios.put(`http://localhost:2100/tutors/likes/${id}`, updateLikes)
                .then(res => res.data);
        }
    }

    return (
        <div className="sm:w-10/12 lg:w-2/3 w-11/12 sm:h-[280px] p-4 my-4 sm:p-0 mx-auto bg-base-100 shadow-md rounded-xl grid grid-cols-1 sm:grid-cols-2 justify-center gap-2 lg:gap-4 overflow-hidden">
            <div className="p-2 w-full h-[260px] sm:h-full overflow-hidden">
                <img className="rounded-md object-cover w-full h-full"
                    src={image}
                    alt={details}
                    // eslint-disable-next-line react/no-unknown-property
                    fetchpriority="high"
                />
            </div>
            <div className="p-2 flex flex-col justify-center items-center sm:items-start gap-2">
                <div className="font-bold text-xl">{name}
                    <div className="badge badge-secondary ml-1">{review}</div>
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start gap-1">
                    <div className="flex gap-1 justify-between">
                        <div className="w-6 h-6">
                            <img src="https://img.icons8.com/?size=100&id=9m2yplxz2fr3&format=png&color=000000" alt="" />
                        </div>
                        <div>{language}</div>
                    </div>
                    <div className="text-md text-center sm:text-start">
                        <div className="font-bold">${price} per hour</div>
                        <p>{details}</p>
                    </div>
                </div>
                <div className="py-4 flex justify-center items-center sm:items-start gap-1">
                    <div>
                        <button onClick={handleBookedTutor} className="btn btn-accent">Book Tutor</button>
                    </div>
                    <ToastContainer></ToastContainer>
                    {likes &&
                        <div onClick={() => handleLikeTutor(_id)} className={alreadyLiked ? "btn-error w-16 h-10 btn btn-neutral flex justify-center items-center rounded-md hover:btn-error" : "w-16 h-10 btn btn-neutral flex justify-center items-center rounded-md"}>
                            {likes && likes.length}  {alreadyLiked ? <FaHeart /> : <FaRegHeart />}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default TutorDetails;