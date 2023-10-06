import React from "react";  
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./components/loginbutton";
import LogoutButton from "./components/logoutbutton";

export function Header() {
    const { isAuthenticated } = useAuth0();

    return (
      <div>
        <div>
            <a href="/">PLACEHOLDER</a>
        </div>
        <div>
            <a href="/shop">Shop</a>
            <a href="/about">About</a>
            <a href="/cart">Cart</a>
            <input type="text" placeholder="Search"></input>
            {(isAuthenticated) ? (
                <div>
                    <a href="/profile">profile</a>
                    <LogoutButton />
                </div>
            ):(
                <div>
                    <LoginButton />
                </div>
            )}
        </div>
      </div>
    );
  }