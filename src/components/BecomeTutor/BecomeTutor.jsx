import { useForm } from "react-hook-form";
import useAppStore from "../../store/useAppStore";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FiBookOpen, FiCheckCircle, FiMail, FiMapPin, FiUser } from "react-icons/fi";

const BecomeTutor = () => {
    const { appliedUser } = useAppStore();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { userName, userEmail, country, experience, teaching_level, short_bio, language, qualification } = data;
        const findAppliedUser = appliedUser.find(user => user.userEmail === userEmail);

        if (findAppliedUser) {
            toast('Already Applied');
            return;
        }

        const application = { userName, userEmail, country, experience, teaching_level, short_bio, language, qualification, status: 'pending', role: '' };

        axiosPublic.post('/tutorApplication', application).then((res) => {
            if (res.data.insertedId) {
                toast('Application Successful.');
                reset();
            }
        });
    };

    return (
        <section className="mx-auto my-6 max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-gradient-to-br from-secondary/10 via-base-100 to-accent/10 shadow-sm">
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.3em] text-secondary">Join the platform</p>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Become a tutor</h2>
                        <p className="max-w-xl text-sm leading-7 text-base-content/70">
                            Share your experience, help learners grow, and build a teaching profile that stands out.
                        </p>
                        <div className="space-y-3 rounded-[1.25rem] border border-base-300 bg-base-100/80 p-4">
                            <div className="flex items-center gap-3">
                                <FiCheckCircle className="text-primary" />
                                <span className="text-sm">Fast application review</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiBookOpen className="text-primary" />
                                <span className="text-sm">Showcase your teaching expertise</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiUser className="text-primary" />
                                <span className="text-sm">Build trust with learners</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-base-300 bg-base-100 p-5 shadow-sm">
                        <ToastContainer />
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="flex flex-col gap-2 text-sm font-medium">
                                    <span className="flex items-center gap-2"><FiUser className="text-primary" /> User name</span>
                                    <input type="text" {...register("userName", { required: true })} className="input input-bordered w-full" required />
                                </label>
                                <label className="flex flex-col gap-2 text-sm font-medium">
                                    <span className="flex items-center gap-2"><FiMail className="text-primary" /> Email address</span>
                                    <input id="emailAddress" type="email" {...register("userEmail", { required: true })} className="input input-bordered w-full" required />
                                </label>
                                <label className="flex flex-col gap-2 text-sm font-medium">
                                    <span className="flex items-center gap-2"><FiBookOpen className="text-primary" /> Language</span>
                                    <input type="text" {...register("language", { required: true })} className="input input-bordered w-full" required />
                                </label>
                                <label className="flex flex-col gap-2 text-sm font-medium">
                                    <span className="flex items-center gap-2"><FiMapPin className="text-primary" /> Country</span>
                                    <input type="text" {...register("country", { required: true })} className="input input-bordered w-full" required />
                                </label>
                                <label className="flex flex-col gap-2 text-sm font-medium">
                                    <span>Experience</span>
                                    <input type="text" {...register("experience", { required: true })} className="input input-bordered w-full" required />
                                </label>
                                <label className="flex flex-col gap-2 text-sm font-medium">
                                    <span>Qualification</span>
                                    <input type="text" {...register("qualification", { required: true })} className="input input-bordered w-full" required />
                                </label>
                            </div>

                            <label className="flex flex-col gap-2 text-sm font-medium">
                                <span>Teaching level</span>
                                <select className="select select-bordered w-full" {...register("teaching_level", { required: true })}>
                                    <option value="">Select</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </label>

                            <label className="flex flex-col gap-2 text-sm font-medium">
                                <span>Short bio</span>
                                <textarea {...register("short_bio", { required: true })} className="textarea textarea-bordered min-h-[110px] w-full" required />
                            </label>

                            {errors.exampleRequired && <p className="text-sm text-error">This field is required</p>}

                            <div className="flex justify-end">
                                <button className="btn btn-secondary rounded-full px-6">Apply now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BecomeTutor;