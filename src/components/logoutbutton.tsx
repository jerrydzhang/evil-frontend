import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const logoutHandler = async () => {
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