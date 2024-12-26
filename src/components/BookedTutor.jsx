import PropTypes from "prop-types";


const BookedTutor = ({ tutor }) => {

    const { name, language, image, price, details, review } = tutor;

    return (

        <div className="card flex flex-col md:grid md:grid-cols-3 justify-center items-center bg-base-100 shadow-xl relative">
            <div className="p-4 md:pl-4 rounded-md md:col-span-1">
                <img className="rounded-md"
                    src={image}
                    alt="Tutor" />
                <div>
                    <div className="w-10 h-10 bg-red-600 absolute -top-2 -right-2 flex justify-center items-center font-bold text-xl rounded-full text-white">X</div>
                </div>
            </div>

            <div className="card-body col-span-1 md:col-span-2">
                <h2 className="card-title">Title: {name}
                    <div className="badge badge-secondary ml-1 ">{review}</div></h2>
                <p>Language: {language}</p>
                <p>${price} per hour</p>
                <div>Description:
                    <p>{details}</p>
                </div>
            </div>

        </div>
    );
};

BookedTutor.propTypes = {
    tutor: PropTypes.object
}

export default BookedTutor;