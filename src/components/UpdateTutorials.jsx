import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTutorials = () => {

    const data = useLoaderData();

    const { _id, name, language, image, price, details } = data;

    const handleUpdateTutorials = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const language = form.language.value;
        const image = form.image.value;
        const price = form.price.value;
        const details = form.details.value;

        const tutorialsInfo = { name, language, image, price, details };

        fetch(`https://online-tutor-server-web.vercel.app/tutors/${_id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(tutorialsInfo)
        }).then(res => res.json()
        ).then(result => {
            if (result.modifiedCount > 0) {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Updated",
                    showConfirmButton: false,
                    timer: 2000
                });

                form.name.value = '';
                form.language.value = '';
                form.image.value = '';
                form.price.value = '';
                form.details.value = '';
            }
        }
        )
    }
    return (
        <div>
            <div className="md:w-1/2 p-4 md:p-0 mx-auto">
                <form onSubmit={handleUpdateTutorials} className="card-body">
                    <h1 className="py-2 text-4xl text-center text-slate-400 font-bold">Update Tutorials</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" defaultValue={name} name="name" placeholder="" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Language</span>
                        </label>
                        <input type="text" defaultValue={language} name="language" placeholder="" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">PhotoURL</span>
                        </label>
                        <input type="text" defaultValue={image} name="image" placeholder="" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" defaultValue={price} name="price" placeholder="" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <input type="text" defaultValue={details} name="details" placeholder="" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Update Tutorials</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTutorials;