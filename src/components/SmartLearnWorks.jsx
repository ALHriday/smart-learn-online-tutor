import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SmartLearnWorks = () => {

    const { tutorsData } = useContext(AuthContext);
    const [data, setData] = useState();

    useEffect(() => {
        const tutor = [...tutorsData].slice(0, 3);
        setData(tutor);
    }, [tutorsData])

    return (
        <div className="p-4 ">
            <h1 className="text-4xl font-bold py-4">How Smart Learn Works : </h1>
            <div className="py-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-4 overflow-auto">
                <div className="flex flex-col gap-3 p-4 border-2 rounded-md">
                    <h1 className="text-3xl font-bold btn text-white btn-warning">Step 1</h1>
                    <h1 className="text-3xl font-bold">Find your Tutor : </h1>

                    {data && data.map(tutor =>

                        <div key={tutor._id}>
                            <div className="grid grid-cols-2 justify-between items-center shadow-sm rounded-md border-2 gap-2">
                                <div className="rounded-md col-span-1">
                                    <img className="w-full h-full rounded-md object-cover" src={tutor.image} alt="" />
                                </div>
                                <div className="col-span-1 flex justify-center items-center">
                                    <h1 className="font-bold">{tutor.language}</h1>
                                </div>
                            </div>
                        </div>

                    )}

                </div>

                <div className="flex flex-col gap-3 p-4 border-2 rounded-md">
                    <h1 className="text-3xl font-bold btn text-white btn-secondary">Step 2</h1>
                    <h1 className="text-3xl font-bold">Booked Tutor : </h1>
                    <p className="text-lg max-h-96 overflow-auto text-wrap">
                       To book a tutor on my website, you will need to follow these steps:
                        <br />
                        1. Visit the tutors section of my website.
                        <br />
                        2. Browse through the list of available tutors and their profiles.
                        <br />
                        3. Once you find a tutor that meets your needs, click on their profile to view their details.
                        <br />
                        4. Click on the {"Booked Tutor"} button.
                        <br />
                        5. Fill out the booking form with your information.
                        <br />
                        6. Select your preferred date and time for the tutoring session.
                        <br />
                        7. Review your booking details and click on the {"Confirm Booking"} button.
                        <br />
                        8. You will receive a confirmation email with the details of your booking.
                    </p>
                </div>

                <div className="flex flex-col gap-3 p-4 border-2 rounded-md">
                    <h1 className="text-3xl font-bold btn text-white btn-accent">Step 3</h1>
                    <h1 className="text-3xl font-bold">Join with Tutor : </h1>

                    <p className="text-4xl font-bold">
                        <span className="text-secondary">Focus</span>, <span className="text-accent">Speak</span>, <span className="text-info">Read</span> and <span className="text-primary">Write</span>.
                    </p>
                    <div className="rounded-md">
                        <img className="w-full h-full rounded-md" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SmartLearnWorks;