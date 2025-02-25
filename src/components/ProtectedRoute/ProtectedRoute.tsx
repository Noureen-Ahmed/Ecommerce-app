import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
    if (localStorage.getItem('userToken') !== null) {
        return <>{props.children}</>;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
