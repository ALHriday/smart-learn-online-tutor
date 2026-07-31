import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
    const { user, privateUser, loading } = useAppStore();

    if (loading) {
        return <div className="text-center my-6">Loading Dashboard...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!privateUser?.role) {
        return <div className="text-center my-6">Preparing your dashboard...</div>;
    }

    if (!allowedRoles.includes(privateUser.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

RoleBasedRoute.propTypes = {
    children: PropTypes.node,
    allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

export default RoleBasedRoute;
