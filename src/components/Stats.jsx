import useAppStore from "../store/useAppStore";

const Stats = () => {
    const { stats } = useAppStore();

    const statCards = [
        { title: "Tutors", value: `${stats?.tutorLen || 0}+`, description: "Trusted experts ready to guide you" },
        { title: "Languages", value: `${stats?.languages?.length || 0}+`, description: "Wide range of learning paths" },
        { title: "Reviews", value: "150+", description: "Learners who loved their lessons" },
        { title: "Students", value: "200+", description: "Growing community of motivated learners" },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => (
                <div key={card.title} className="rounded-[1.5rem] border border-base-300 bg-base-100 p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.25em] text-base-content/60">{card.title}</p>
                    <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                    <p className="mt-2 text-sm text-base-content/70">{card.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Stats;