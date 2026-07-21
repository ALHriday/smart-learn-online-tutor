import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useEffect } from "react";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#FF00D3',
    inactiveFillColor: '#808090'
}

const TutorDetails = () => {
    const { user, myBookedTutor, setMyBookedTutor } = useContext(AuthContext);
    const tutor = useLoaderData();
    const [savedRating, setSavedRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [isRating, setIsRating] = useState(false);
    const axiosPublic = useAxiosPublic();


    const { _id, likes, name, image, language, review, price, details } = tutor;

    const email = user?.email;

    const tutorId = _id;

    const userId = user?.uid;

    const alreadyLiked = likes?.find(like => like === userId);

    const existing = (myBookedTutor || []).find(d => d.name === name && d.email === email);

    useEffect(() => {
        const getRating = async () => {
            if (!user) return;

            try {
                const { data } = await axiosPublic.get(
                    `/tutor/rating?tutorId=${tutorId}&userId=${user.uid}`
                );

                if (data?.rating != null) {
                    setSavedRating(Number(data.rating));
                    setSelectedRating(Number(data.rating));
                }
            } catch (err) {
                console.error(err);
            }
        };

        getRating();
    }, [axiosPublic, tutorId, user]);


    const handleBookedTutor = () => {
        const data = { name, image, language, review, price, details, email };
        if (!user) {
            return toast('Please LogIn');
        }

        if (existing) {
            return toast('Tutor Already Booked!');
        } else {
            axiosPublic.post('/bookedTutor', data).then(res => {
                if (res.data.insertedId) {
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

            axiosPublic.put(`/tutors/likes/${id}`, updateLikes).then(res => res.data);
        } else {
            likes.push(userId);
            const updateLikes = { likes };

            axiosPublic.put(`/tutors/likes/${id}`, updateLikes).then(res => res.data);
        }
    }

    const handleRatingChange = (value) => {
        setSelectedRating(value);
        setIsRating(true);
    };

    const handleTutorRating = async () => {
        if (!user) {
            toast.error("Please Log In");
            return;
        }

        try {
            const { data: existing } = await axiosPublic.get(
                `/tutor/rating?tutorId=${tutorId}&userId=${user.uid}`
            );

            if (existing && existing.rating === selectedRating) {
                toast.error("You already gave this rating!");
                setIsRating(false);
                return;
            }

            if (existing) {
                await axiosPublic.patch("/tutor/rating", {
                    tutorId,
                    userId: user.uid,
                    rating: selectedRating,
                });

                toast.success("Rating Updated!");
            } else {
                await axiosPublic.post("/tutor/rating", {
                    tutorId,
                    userId: user.uid,
                    rating: selectedRating,
                });

                toast.success("Thanks for your rating!");
            }

            setSavedRating(selectedRating);
            setIsRating(false);

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    const handleCancel = () => {
        setSelectedRating(savedRating);
        setIsRating(false);
    };

    return (
        <div className="lg:w-2/3 w-11/12 sm:h-[320px] p-4 my-4 sm:p-0 mx-auto bg-base-100 shadow-md rounded-xl grid grid-cols-1 sm:grid-cols-2 justify-center gap-2 overflow-hidden ease-in-out relative">
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
                            <img src="https://img.icons8.com/?size=100&id=9m2yplxz2fr3&format=png&color=000000" alt="icon" />
                        </div>
                        <div>{language}</div>
                    </div>
                    <div className="text-sm lg:text-md text-center sm:text-start">
                        <div className="font-bold">${price} per hour</div>
                        <p>{details}</p>
                    </div>
                </div>
                <div>
                    <Rating
                        className="h-6"
                        style={{ maxWidth: 250 }}
                        value={selectedRating}
                        onChange={handleRatingChange}
                        itemStyles={myStyles}
                    />
                    {isRating && <div className="modal modal-open inset-0 flex flex-col justify-center items-center gap-4 p-4 rounded-md bg-black/90 ease-in-out transition duration-75">
                        <div className="bg-slate-50 p-4 w-8/12 md:w-4/12 h-56 flex flex-col gap-6 justify-center items-center rounded-md">
                            <h1>Share your feedback</h1>
                            <div className="flex justify-center items-center gap-4">
                                <button onClick={handleCancel} className="btn btn-error">Cancel</button>
                                <button onClick={handleTutorRating} className="btn btn-secondary">Submit</button>
                            </div>
                        </div>
                    </div>
                    }
                </div>

                <div className="py-2 flex justify-center items-center sm:items-start gap-1">
                    <div>
                        <button onClick={handleBookedTutor} className={`${existing ? 'bg-teal-500 text-white' : ''} btn btn-accent text-base-content bg-base-100`}>{existing ? "Tutor Booked" : "Book Tutor"} </button>
                    </div>
                    <ToastContainer></ToastContainer>

                    {likes &&
                        <div onClick={() => handleLikeTutor(_id)} className={`${alreadyLiked ? 'bg-red-500 text-white' : 'bg-base-100 btn-error'} text-base-content min-w-16 max-w-20 h-10 btn flex justify-center items-center rounded-md`}>
                            {likes && likes.length}  {alreadyLiked ? <FaHeart /> : <FaRegHeart />}
                        </div>
                    }

                </div>
            </div>
            <Helmet>
                <title>SmartLearn | Tutor Details</title>
                <meta name={name} content={details} />
                <link rel="canonical" href={`https://smart-learn-online-tutor.netlify.app/tutor_details/${_id}`} />
            </Helmet>

        </div>
    );
};

export default TutorDetails;