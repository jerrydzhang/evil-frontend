import React from "react";
import Axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props: any) => {
    const { isLoading, user } = useAuth0();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [roles, setRoles] = React.useState<string[]>([]);

    React.useEffect(() => {

        if (isLoading) {
            return;
        }

        if (!user) {
            return;
        }

        Axios.get(`${backendUrl}/api/user/get_user?id=${user!.sub}`, { withCredentials: true })
        .then((res) => {
            console.log(res);
            setRoles(res.data.roles);
        })

    }, [isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if ((roles.some((role) => props.roles.includes(role)) || props.roles.length === 0)) {
        return <Outlet />;
    } else {
        return <div>Unauthorized</div>;
    }
};

export default ProtectedRoute;