import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="mt-8">
            <footer className="footer bg-neutral text-neutral-content p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <Link to='/find_tutors' className="link link-hover">Find Tutors</Link>
                    <Link to='/my_booked_tutor' className="link link-hover">My Booked Tutor</Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Smart Learn</h6>
                    <Link to='/about' className="link link-hover">About us</Link>
                    <p className="link link-hover">Contact</p>
                    <p className="link link-hover">Jobs</p>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <p className="link link-hover">Terms of use</p>
                    <p className="link link-hover">Privacy policy</p>
                    <p className="link link-hover">Cookie policy</p>
                </nav>
            </footer>
            <footer className="footer footer-center bg-base-300 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by SmartLearn Platform.</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;