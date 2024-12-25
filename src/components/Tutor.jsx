import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Tutor = ({ tutor }) => {

    const { _id, name, image, language, review, price } = tutor;

    return (
        <div className="bg-base-100 shadow-xl grid grid-cols-5">
            <div className="flex justify-center items-center p-2 col-span-2">
                <img className="rounded-md w-full h-full"
                    src={image}
                />
            </div>
            <div className="col-span-3 p-2 flex flex-col gap-2">
                <div className="font-bold text-xl">{name}<div className="badge badge-secondary ml-1">{review}</div></div>

                <div className="flex flex-col gap-1">
                    <div className=" flex gap-1">
                        <div className="w-6 h-6">
                            <img src="https://img.icons8.com/?size=100&id=9m2yplxz2fr3&format=png&color=000000" alt="" />
                        </div>
                        <div>{language}</div>
                    </div>

                    <div className="text-md">
                        <div className="font-bold">${price}</div>
                        <div className="card-actions">
                            <Link to={`/tutor_details/${_id}`} className="btn btn-accent btn-sm mt-2">Details</Link>
                        </div>
                    </div>
                </div>
                {/* <h3><span className="font-bold">{price }$</span> Per Hour</h3> */}
                {/* <p>{ details}</p> */}

            </div>
        </div>
    );
};

Tutor.propTypes = {
    tutor: PropTypes.object
}

export default Tutor;