import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { MdDeleteForever } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyTutorials = () => {
    const { tutorials, setTutorials, user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://online-tutor-server-web.vercel.app/tutorials/${user.email}`).then(res => res.json()).then(data => {
            setTutorials(data);
        })
    }, [user, setTutorials])


    return (
        <div>
            <h1 className="text-4xl text-center py-4">My Tutorials</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title & Image</th>
                            <th>Language</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Review</th>
                            <th>Update / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutorials && tutorials.map(data =>
                            <tr key={data._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={data.image}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{data.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {data.language}
                                </td>
                                <td>{data.details}</td>
                                <td>${data.price}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">{data.review}</button>
                                </td>
                                <th>
                                    <div className="flex gap-2">
                                        <Link to={`/update_tutorials/${data._id}`} className="btn btn-sm btn-accent"><FaPlusSquare /></Link>
                                        <button className="btn btn-sm btn-error"><MdDeleteForever /></button>
                                    </div>
                                </th>
                            </tr>)}

                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default MyTutorials;