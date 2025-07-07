import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";

const AdminHome = () => {
    const { appliedUser } = useContext(AuthContext);
    const tutorApplication = 'https://online-tutor-server-web.vercel.app/tutorApplication';


    const changeAppliedUserStatus = (id, applicationStatus) => {

        
        if (applicationStatus === 'approved') {
            const status = 'approved';
            const role = 'tutor';
            const updateApplication = { status, role };

            axios.put(`${tutorApplication}/${id}`, updateApplication)
            .then(result => console.log(result.data))
        }

        if (applicationStatus === 'rejected') {
            const status = 'rejected';
            const role = '';
            const updateApplication = { status, role };

            axios.put(`${tutorApplication}/${id}`, updateApplication)
            .then(result => console.log(result.data)
            )
        }

        if (applicationStatus === 'delete') {
            const status = 'pending';
            const role = '';
            const updateApplication = { status, role };

            axios.put(`${tutorApplication}/${id}`, updateApplication)
            .then(result => console.log(result.data)
            )
        }
        if (applicationStatus === 'reChance') {
            const status = 'pending';
            const role = '';
            const updateApplication = { status, role };

            axios.put(`${tutorApplication}/${id}`, updateApplication)
            .then(result => console.log(result.data)
            )
        }
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Qualification</th>
                            <th>Country</th>
                            <th>Teaching Level</th>
                            <th>Status</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appliedUser.map((user, idx) => <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{user.userName}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.qualification}</td>
                            <td>{user.country}</td>
                            <td>{user.teaching_level}</td>
                            <td>{user?.status}</td>
                            <td>{user?.role}</td>
                            <td className="flex gap-1">{user?.status === 'pending' && <>
                                <button onClick={() => changeAppliedUserStatus(user._id, 'approved')} className="btn btn-sm btn-accent mr-1">Accept</button>
                                <button onClick={() => changeAppliedUserStatus(user._id,'rejected')} className="btn btn-sm btn-error">Reject</button>
                            </>}
                                {user?.status === 'approved' && 
                                <button onClick={() => changeAppliedUserStatus(user._id,'delete')} className="btn btn-sm btn-error">Delete</button>
                                }
                                {user?.status === 'rejected' && 
                                <button onClick={() => changeAppliedUserStatus(user._id,'reChance')} className="btn btn-sm btn-error">Re-Chance</button>
                                }
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHome;