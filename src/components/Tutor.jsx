import PropTypes from "prop-types";

const Tutor = ({ tutor }) => {
    console.log(tutor);
    
    const { name, image, language, review, details, price } = tutor;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={image}
                     />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-secondary">{ review}</div>
                </h2>
                <h3 className="font-bold">{language}</h3>
                <h3><span className="font-bold">{price }$</span> Per Hour</h3>
                <p>{ details}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary mt-1">Add Tutor</button>
                </div>
            </div>
        </div>
    );
};

Tutor.propTypes = {
    tutor: PropTypes.object
}

export default Tutor;