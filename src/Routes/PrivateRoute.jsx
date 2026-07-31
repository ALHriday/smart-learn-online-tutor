import { Navigate } from "react-router-dom";
import useAppStore from "../store/useAppStore";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAppStore();

    if (loading) {
        return <div className="text-center my-6">Loading...</div>
    }

    if (user) {
        return children;
    }

    return (
        <Navigate to='/login'></Navigate>
    );


};

export default PrivateRoute;