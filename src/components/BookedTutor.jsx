import PropTypes from "prop-types";


const BookedTutor = ({ tutor }) => {

    const { name, image, language, review, price, details } = tutor;
    console.log(image);
    return (
        <div className="border rounded-md flex flex-col text-center justify-center items-center gap-2 p-2 bg-slate-900 text-white">
            <h1>{ name}</h1>
            <h1>{ language}</h1>
            <h1>{ review}</h1>
            <h1>{ price}</h1>
            <h1>{ details}</h1>
        </div>
    );
};

BookedTutor.propTypes = {
    tutor: PropTypes.object
}

export default BookedTutor;