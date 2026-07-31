import AdminHome from "./AdminHome";
import useAppStore from "../store/useAppStore";
import TutorHome from "./TutorHome";
import UserHome from "./UserHome";

const DashboardHome = () => {
    const { privateUser } = useAppStore();

    return (
        <div>
            {privateUser?.role === 'admin' && <AdminHome />}
            {privateUser?.role === 'tutor' && <TutorHome />}
            {!privateUser?.role && <UserHome />}
        </div>
    );
};

export default DashboardHome;