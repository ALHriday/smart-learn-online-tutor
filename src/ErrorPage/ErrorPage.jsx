import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="relative min-h-screen">
            <div className="w-full h-[600px]">
                <img className="w-full h-full" src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?t=st=1735230874~exp=1735234474~hmac=0b4c4c080f992d1faa594104555c30225ebae5a79e8bf7456fef2ac761e4749b&w=740" alt="" />
            </div>
            <div className="absolute bottom-[5%] right-[45%]">
                <div>
                    <Link className="btn btn-neutral" to='/'>Go to Home Page</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;