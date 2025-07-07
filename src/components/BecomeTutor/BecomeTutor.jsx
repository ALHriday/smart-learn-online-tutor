import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const BecomeTutor = () => {
    const {appliedUser} = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();
    
    const onSubmit = (data) => {
        const { userName, userEmail, country, experience, teaching_level, short_bio, language, qualification } = data;

        const findAppliedUser = appliedUser.find(user => user.userEmail === userEmail);    

        if (findAppliedUser) {
            return toast('Already Applied');
        }
        
        const application = { userName, userEmail, country, experience, teaching_level, short_bio, language, qualification, status: 'pending', role: '' };

        axios.post('https://online-tutor-server-web.vercel.app/tutorApplication', application).then(res => {
            if (res.data.insertedId) {
                toast('Application Successful.');
            }
        }
        )
    };


    return (
        <section className="w-11/12 mx-auto my-4 shadow-sm p-4 rounded-md bg-base-200 font-bold">
            <h2 className="text-2xl font-semibold capitalize px-4">Become A Tutor</h2>
            <ToastContainer/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 p-4">
                    <div className="flex flex-col gap-1">
                        <label>User Name</label>
                        <input type="text" {...register("userName", { required: true })} className="p-2 rounded-md"  required/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>Email Address</label>
                        <input id="emailAddress" type="email" {...register("userEmail", { required: true })} className="p-2 rounded-md" required/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Language</label>
                        <input type="text" {...register("language", { required: true })} className="p-2 rounded-md"  required/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Country</label>
                        <input type="text" {...register("country", { required: true })} className="p-2 rounded-md"  required/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Experience</label>
                        <input type="text" {...register("experience", { required: true })} className="p-2 rounded-md"  required/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Qualification</label>
                        <input type="text" {...register("qualification", { required: true })} className="p-2 rounded-md"  required/>
                    </div>
                    <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-3">
                        <label>Teaching Level</label>
                        <select className="p-2 rounded-md" {...register("teaching_level", { required: true })}>
                            <option value="">Select</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-3">
                        <label>Short Bio</label>
                        <textarea type="text" {...register("short_bio", { required: true })} className="p-2 rounded-md min-h-[100px] max-h-[120px]"  required/>
                    </div>
                    {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <div className="flex justify-end p-4">
                    <button className="btn btn-accent">Apply</button>
                </div>
            </form>
        </section>
    );
};

export default BecomeTutor;