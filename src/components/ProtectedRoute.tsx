import React from "react";
import Axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

// Protect Route by roles
// Usage: <Route element={<ProtectedRoute roles={["admin"]}/>}>
// This will only allow users with the admin role to access the route
// If no roles are specified, a user only needs to be logged in to access the route
const ProtectedRoute = (props: any) => {
    const { isLoading, user } = useAuth0();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [roles, setRoles] = React.useState<string[]>([]);

    // Get roles of a user from the backend
    // need to both check if the user is logged in and if the roles have been fetched
    React.useEffect(() => {

        if (isLoading) {
            return;
        }

        if (!user) {
            return;
        }

        Axios.get(`${backendUrl}/api/user?id=${user!.sub}`, { withCredentials: true })
        .then((res) => {
            console.log(res);
            setRoles(res.data.roles);
        })
        .catch((err) => {
            console.log(err);
        });

    }, [isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    // if the user is logged in and has the correct role, render the route
    if ((roles.some((role) => props.roles.includes(role)) || props.roles.length === 0)) {
        return <Outlet />;
    } else {
        return <div>Unauthorized</div>;
    }
};

export default ProtectedRoute;