import React from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const logoutHandler = async () => {
    await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/logout`, {}, { withCredentials: true })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
    logout({ logoutParams: { returnTo: window.location.origin } })
    localStorage.setItem("cart", JSON.stringify({}));
  }

  return (
    <button onClick={logoutHandler}>
      Log Out
    </button>
  );
};

export default LogoutButton;