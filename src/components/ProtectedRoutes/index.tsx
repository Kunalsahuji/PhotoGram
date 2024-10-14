import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

interface IProtectedRoutesProps {
}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (props) => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
    const location = useLocation();

    if (loading) {
        return (
            <div className="text-5xl text-black flex items-center justify-center h-full w-full min-h-screen">
                Loading...
            </div>
        );
    }
    return user ? (<Outlet />) : (
        <Navigate to="/login" state={{ from: location }
        } />
    );
};

export default ProtectedRoutes;
