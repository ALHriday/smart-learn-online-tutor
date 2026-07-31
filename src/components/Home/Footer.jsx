import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiGlobe, FiMail } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="mt-12 border-t border-base-300 bg-base-100">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-primary">SmartLearn</p>
                    <h2 className="mt-3 text-2xl font-semibold">Learn with expert tutors</h2>
                    <p className="mt-3 text-sm leading-7 text-base-content/70">Flexible language lessons, personalized support, and a calm learning experience from anywhere.</p>
                </div>

                <nav aria-label="Footer links" className="space-y-2">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">Explore</h3>
                    <Link to='/find_tutors' className="flex items-center gap-2 text-sm text-base-content/70 transition hover:text-primary"><FiArrowRight /> Find Tutors</Link>
                    <Link to='/my_booked_tutor' className="flex items-center gap-2 text-sm text-base-content/70 transition hover:text-primary"><FiBookOpen /> My Booked Tutor</Link>
                    <Link to='/about' className="flex items-center gap-2 text-sm text-base-content/70 transition hover:text-primary"><FiGlobe /> About us</Link>
                </nav>

                <div className="space-y-2">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">Contact</h3>
                    <a href="mailto:hello@smartlearn.com" className="flex items-center gap-2 text-sm text-base-content/70 transition hover:text-primary"><FiMail /> hello@smartlearn.com</a>
                    <p className="text-sm text-base-content/70">© {new Date().getFullYear()} SmartLearn. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;