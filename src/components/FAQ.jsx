import { FiHelpCircle } from "react-icons/fi";

const faqs = [
    {
        question: "What is SmartLearn?",
        answer: "SmartLearn is an online platform that connects learners with expert language tutors for one-on-one lessons, speaking practice, and flexible support.",
    },
    {
        question: "What languages can I learn?",
        answer: "We support a wide range of languages, including English, Spanish, French, German, Mandarin, Japanese, and many more.",
    },
    {
        question: "How do I choose a tutor?",
        answer: "You can browse tutor profiles, compare their experience and teaching style, and book a session that fits your goals.",
    },
    {
        question: "Is SmartLearn suitable for beginners?",
        answer: "Absolutely. We offer lessons for beginners through advanced learners, and tutors tailor their approach to your level.",
    },
    {
        question: "How much does it cost?",
        answer: "Pricing varies by tutor and lesson type, and each tutor profile includes their rate before you book.",
    },
];

const FAQ = () => {
    return (
        <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-200">
                    <FiHelpCircle className="text-2xl text-primary" />
                </div>
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-primary">Frequently asked questions</p>
                    <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">Everything you need to know</h2>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                {faqs.map((faq) => (
                    <details key={faq.question} className="group rounded-[1.25rem] border border-base-300 bg-base-100 p-4 shadow-sm">
                        <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                        <p className="mt-3 text-sm leading-7 text-base-content/70">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </div>
    );
};

export default FAQ;