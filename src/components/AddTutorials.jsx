
const AddTutorials = () => {
    const handleAddTutors = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const language = form.language.value;
        const image = form.image.value;
        const price = form.price.value;
        const review = form.review.value;
        const details = form.details.value;
        const data = { name, language, image, price, review, details };

        // name, image, language, review, details, price

        fetch('http://localhost:2100/tutors',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(result => {

                console.log(result);
                
                if (result.insertedId) {
                    form.name.value = '';
                    form.language.value = '';
                    form.image.value = '';
                    form.review.value = '';
                    form.details.value = '';
                    form.price.value = '';
                }

            })

    }
    return (
        <div className="w-1/2 mx-auto">
            <form onSubmit={handleAddTutors} className="card-body">
                <h1 className="py-2 text-4xl text-center text-slate-400 font-bold">Add Tutorials</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" name="name" placeholder="" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Language</span>
                    </label>
                    <input type="text" name="language" placeholder="" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">PhotoURL</span>
                    </label>
                    <input type="text" name="image" placeholder="" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="number" name="price" placeholder="" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Review</span>
                    </label>
                    <input type="text" name="review" placeholder="" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <input type="text" name="details" placeholder="" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Add Tutorials</button>
                </div>
            </form>
        </div>
    );

};

export default AddTutorials;