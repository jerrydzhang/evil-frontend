import React from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { user, loginWithRedirect, isLoading } = useAuth0();

    const loginHandler = async () => {
        loginWithRedirect();
    }

  return <button onClick={loginHandler}>Log In</button>;
};

export default LoginButton;