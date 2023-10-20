import React from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// After auth0 authentication, it will redirect to this page
// This page will send the user's id and email to the backend to create a session
// The backend will then return a session cookie to the frontend
// If the user is unable to be authenticated in the backend, they will be logged out
export function Authenticate() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
    const navigate = useNavigate();

    React.useEffect(() => {

        if (!isAuthenticated) {
            return;
        }

        getAccessTokenSilently().then((accessToken) => {
            Axios.post(`${backendUrl}/api/user/login`, {
                id: user!.sub,
                email: user!.email,
            },
            { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate("/", { replace: true });
            })
            .catch((err) => {
                console.log(err);
                logout({ logoutParams: { returnTo: "/" } });
            });
        });

    }, [isAuthenticated]);  

    return (
        <div>
        </div>
    );
}