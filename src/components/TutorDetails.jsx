import { useLoaderData } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Rating, ThinStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FiBookOpen, FiClock, FiMessageCircle, FiStar, FiX } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#FF00D3',
    inactiveFillColor: '#808090',
};

const TutorDetails = () => {
    const { user, myBookedTutor, setMyBookedTutor } = useAppStore();
    const tutor = useLoaderData();
    const [savedRating, setSavedRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [isRating, setIsRating] = useState(false);
    const axiosPublic = useAxiosPublic();

    const { _id, likes, name, image, language, review, price, details } = tutor;
    const email = user?.email;
    const tutorId = _id;
    const userId = user?.uid;
    const normalizedLikes = Array.isArray(likes) ? likes : [];
    const alreadyLiked = normalizedLikes.includes(userId);
    const existing = (myBookedTutor || []).find((d) => d.name === name && d.email === email);

    useEffect(() => {
        const getRating = async () => {
            if (!user) return;

            try {
                const { data } = await axiosPublic.get(`/tutor/rating?tutorId=${tutorId}&userId=${user.uid}`);

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
            return toast('Please log in to book a tutor.');
        }

        if (existing) {
            return toast('Tutor already booked!');
        }

        axiosPublic.post('/bookedTutor', data).then((res) => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tutor booked successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setMyBookedTutor([...(myBookedTutor || []), data]);
            }
        });
    };

    const handleLikeTutor = (id) => {
        if (!user) {
            return toast('Please log in to like this tutor.');
        }

        const nextLikes = alreadyLiked
            ? normalizedLikes.filter((like) => like !== userId)
            : [...normalizedLikes, userId];

        axiosPublic.put(`/tutors/likes/${id}`, { likes: nextLikes }).then(() => { });
    };

    const handleRatingChange = (value) => {
        setSelectedRating(value);
        setIsRating(true);
    };

    const handleTutorRating = async () => {
        if (!user) {
            toast.error('Please log in');
            return;
        }

        try {
            const { data: existingRating } = await axiosPublic.get(`/tutor/rating?tutorId=${tutorId}&userId=${user.uid}`);

            if (existingRating && existingRating.rating === selectedRating) {
                toast.error('You already gave this rating!');
                setIsRating(false);
                return;
            }

            if (existingRating) {
                await axiosPublic.patch('/tutor/rating', {
                    tutorId,
                    userId: user.uid,
                    rating: selectedRating,
                });
                toast.success('Rating updated!');
            } else {
                await axiosPublic.post('/tutor/rating', {
                    tutorId,
                    userId: user.uid,
                    rating: selectedRating,
                });
                toast.success('Thanks for your rating!');
            }

            setSavedRating(selectedRating);
            setIsRating(false);
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
        }
    };

    const handleCancel = () => {
        setSelectedRating(savedRating);
        setIsRating(false);
    };

    return (
        <div className="mx-auto my-8 w-11/12 max-w-6xl rounded-[2rem] border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-200/70 p-2">
                    <img
                        className="h-[320px] w-full rounded-[1.1rem] object-cover sm:h-[420px]"
                        src={image}
                        alt={details}
                        loading="eager"
                        decoding="async"
                        // eslint-disable-next-line react/no-unknown-property
                        fetchpriority="high"
                    />
                </div>

                <div className="flex flex-col justify-between gap-5">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{review}</span>
                            <span className="inline-flex items-center rounded-full border border-base-300 px-3 py-1 text-sm text-base-content/70">{language}</span>
                        </div>

                        <div>
                            <h1 className="text-3xl font-semibold sm:text-4xl">{name}</h1>
                            <p className="mt-3 text-base leading-8 text-base-content/70">{details}</p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-[1.2rem] border border-base-300 bg-base-200/70 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                    <FiClock />
                                    <span>Session rate</span>
                                </div>
                                <p className="mt-2 text-xl font-semibold">${price}</p>
                                <p className="text-sm text-base-content/70">per hour</p>
                            </div>
                            <div className="rounded-[1.2rem] border border-base-300 bg-base-200/70 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                                    <FiStar />
                                    <span>Rating</span>
                                </div>
                                <p className="mt-2 text-xl font-semibold">{savedRating ? savedRating.toFixed(1) : 'New'}</p>
                                <p className="text-sm text-base-content/70">Your feedback matters</p>
                            </div>
                            <div className="rounded-[1.2rem] border border-base-300 bg-base-200/70 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-accent">
                                    <FiMessageCircle />
                                    <span>Students</span>
                                </div>
                                <p className="mt-2 text-xl font-semibold">{normalizedLikes.length}</p>
                                <p className="text-sm text-base-content/70">people liked this tutor</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-[1.4rem] border border-base-300 bg-base-200/70 p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/60">Rate this tutor</p>
                                <span className="text-sm text-base-content/70">Tap to open</span>
                            </div>
                            <Rating
                                className="h-7"
                                style={{ maxWidth: 260 }}
                                value={selectedRating}
                                onChange={handleRatingChange}
                                itemStyles={myStyles}
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleBookedTutor}
                                className={`btn rounded-full px-6 ${existing ? 'btn-success text-white' : 'btn-secondary'}`}
                            >
                                <FiBookOpen className="mr-2" />
                                {existing ? 'Tutor booked' : 'Book tutor'}
                            </button>

                            <button
                                onClick={() => handleLikeTutor(_id)}
                                className={`btn rounded-full ${alreadyLiked ? 'btn-error text-white' : 'btn-outline'}`}
                            >
                                {alreadyLiked ? <FaHeart className="mr-2" /> : <FaRegHeart className="mr-2" />}
                                {normalizedLikes.length} likes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isRating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[1.75rem] border border-base-300 bg-base-100 p-6 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold">Share your feedback</h3>
                                <p className="text-sm text-base-content/70">Let others know how this tutor helped you.</p>
                            </div>
                            <button onClick={handleCancel} className="btn btn-ghost btn-circle btn-sm" aria-label="Close rating dialog">
                                <FiX />
                            </button>
                        </div>

                        <div className="rounded-[1.25rem] bg-base-200/70 p-4 text-center">
                            <p className="mb-3 text-base font-medium">Rate this tutor</p>
                            <Rating
                                className="mx-auto h-8"
                                style={{ maxWidth: 260 }}
                                value={selectedRating}
                                onChange={handleRatingChange}
                                itemStyles={myStyles}
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={handleCancel} className="btn btn-outline rounded-full">Cancel</button>
                            <button onClick={handleTutorRating} className="btn btn-secondary rounded-full">Submit</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" />

            <Helmet>
                <title>SmartLearn | Tutor Details</title>
                <meta name={name} content={details} />
                <link rel="canonical" href={`https://smart-learn-online-tutor.netlify.app/tutor_details/${_id}`} />
            </Helmet>
        </div>
    );
};

export default TutorDetails;