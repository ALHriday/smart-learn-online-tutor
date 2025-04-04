import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const FAQ = () => {
    const { toggle } = useContext(AuthContext);

    return (
        <div className="join join-vertical w-full">
            <div className="text-4xl font-bold my-4 flex gap-4">FAQ <div className="w-12 h-12 animate-bounce">
                {toggle === "dark" ? <img className="w-full h-full" src="https://img.icons8.com/?size=100&id=6651&format=png&color=ffffff" alt="" />
                :
                <img className="w-full h-full" src="https://img.icons8.com/?size=100&id=6651&format=png&color=000000" alt="" />}
            </div></div>
            
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title text-xl font-medium">1. What is SmartLearn?</div>
                <div className="collapse-content">
                    <p>SmartLearn is an online platform that connects learners with expert language tutors. We offer personalized lessons in various languages, using interactive tools to make language learning engaging and effective.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">2. What languages can I learn on SmartLearn?</div>
                <div className="collapse-content">
                    <p>We currently offer courses in popular languages such as English, Spanish, French, German, Mandarin, Japanese, and many more. Check our course catalog for the full list.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">3. How do I choose a tutor?</div>
                <div className="collapse-content">
                    <p>You can browse tutor profiles, which include their qualifications, experience, teaching style, and reviews from other students. Once you find a tutor you like, you can book a trial lesson.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">4. Is SmartLearn suitable for beginners?</div>
                <div className="collapse-content">
                    <p>Absolutely! We offer courses for all levels, from complete beginners to advanced learners. Tutors tailor lessons to suit your current skill level and learning goals.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">5. How much does it cost?</div>
                <div className="collapse-content">
                    <p>Pricing varies depending on the tutor’s experience and the language being taught. You can view the hourly rates on each tutor&apos;s profile before booking.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;