import { useContext } from "react";
import AdminHome from "./AdminHome";
import { AuthContext } from "../AuthProvider/AuthProvider";
import TutorHome from "./TutorHome";

const DashboardHome = () => {
    const { privateUser } = useContext(AuthContext);
    
    return (
        <div>
            {privateUser?.role === 'admin' ? 
            <AdminHome/> : ''}
            {privateUser?.role === 'tutor' ? 
            <TutorHome/> : ''}
        </div>
    );
};

export default DashboardHome;