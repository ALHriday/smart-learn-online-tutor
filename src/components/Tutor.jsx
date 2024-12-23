import PropTypes from "prop-types";

const Tutor = ({ tutor }) => {
    const { name, age } = tutor;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    Name: {name}
                    {/* <div className="badge badge-secondary">NEW</div> */}
                </h2>
                <p>Age: { age}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
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