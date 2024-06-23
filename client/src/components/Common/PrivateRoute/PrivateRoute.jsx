import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '~/context/AuthContext';

const PrivateRoute = ({ children, roles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default PrivateRoute;
