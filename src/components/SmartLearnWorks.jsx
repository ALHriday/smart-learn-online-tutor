import { motion } from "motion/react";
import useAppStore from "../store/useAppStore";
import { FiBookOpen, FiCheckCircle, FiMessageCircle, FiUsers } from "react-icons/fi";

const SmartLearnWorks = () => {
    const { showData } = useAppStore();

    const steps = [
        {
            title: "Find your tutor",
            badge: "Step 1",
            badgeClass: "bg-warning text-white",
            icon: FiUsers,
            description: "Browse tutor profiles and choose the one that fits your learning style.",
            children: showData?.slice(0, 3).map((tutor) => (
                <div key={tutor?._id} className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200/70 p-3">
                    <img className="h-12 w-12 rounded-full object-cover" src={tutor?.image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                    <div>
                        <p className="font-semibold">{tutor?.language || 'Language'}</p>
                        <p className="text-sm text-base-content/70">Expert guidance and flexible support</p>
                    </div>
                </div>
            )),
        },
        {
            title: "Book a session",
            badge: "Step 2",
            badgeClass: "bg-secondary text-white",
            icon: FiBookOpen,
            description: "Reserve the lesson that works best for your schedule and start learning with confidence.",
            children: (
                <div className="space-y-2 rounded-2xl border border-base-300 bg-base-200/70 p-4 text-sm text-base-content/70">
                    <p className="flex items-center gap-2"><FiCheckCircle className="text-primary" /> Pick your tutor</p>
                    <p className="flex items-center gap-2"><FiCheckCircle className="text-primary" /> Confirm your session</p>
                    <p className="flex items-center gap-2"><FiCheckCircle className="text-primary" /> Begin learning right away</p>
                </div>
            ),
        },
        {
            title: "Join your lesson",
            badge: "Step 3",
            badgeClass: "bg-accent text-white",
            icon: FiMessageCircle,
            description: "Connect with your tutor, speak naturally, and track your progress in every class.",
            children: (
                <div className="overflow-hidden rounded-[1.25rem] border border-base-300">
                    <img
                        className="h-48 w-full object-cover"
                        src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Tutors and learners collaborating online"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
            <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Simple journey</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">How SmartLearn works</h2>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <motion.article
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.3, delay: index * 0.08 }}
                            className="flex h-full flex-col rounded-[1.5rem] border border-base-300 bg-base-200/60 p-5"
                        >
                            <div className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${step.badgeClass}`}>
                                {step.badge}
                            </div>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-base-100">
                                    <Icon className="text-xl text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">{step.title}</h3>
                            </div>
                            <p className="mt-4 text-sm leading-7 text-base-content/70">{step.description}</p>
                            <div className="mt-5 space-y-3">{step.children}</div>
                        </motion.article>
                    );
                })}
            </div>
        </div>
    );
};

export default SmartLearnWorks;