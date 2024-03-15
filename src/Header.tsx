import "./Header.css";

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";  
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, useForceUpdate } from "framer-motion";
import { Authenticate } from "./pages/Authenticate";
import { Vector3 } from "three";
import { pageTransition } from "./common/pagetransition";

const variants = {
    open: { opacity: 1, y: 0, PointerEvent: "auto" },
    closed: { opacity: 0, y: -10, PointerEvent: "none" },
}

type HeaderProps = {
    cart: {[key: string]: number};
    reduced: boolean;
    home: boolean;
    setHome: Dispatch<SetStateAction<boolean>>;
    focused: boolean;
    setFocused: Dispatch<SetStateAction<boolean>>;
    focus: Vector3;
    setFocus: Dispatch<SetStateAction<Vector3>>;
    cameraPosition: Vector3;
    setCameraPosition: Dispatch<SetStateAction<Vector3>>;
}

export function Header({cart, reduced, home, setHome, focused, setFocused, focus, setFocus, cameraPosition, setCameraPosition}: HeaderProps) {
    const { isAuthenticated, user } = useAuth0();
    const location = useLocation();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        let total = 0;
        for (const key in cart) {
            total += cart[key];
        }
        setQuantity(total);
    }, [cart]);


    const pos3 = new Vector3(10,-100,-3);

    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    useEffect(() => {
        setShowAccountDropdown(false);
    }, [location.pathname]);

    return (
    <div className={`header ${reduced && "reduced"} sticky top-0 z-10 px-4`}>
    <div className={`absolute bg-[var(--eerie-black)] h-full left-0 transition-all duration-500 ${reduced ? "w-0" : "w-full"}`}/>
    <div className="flex items-center px-4 py-3">
        <div className="flex">
            <button className={`header-nav ${location.pathname === "/" && "active"} z-10`} onClick={() => pageTransition(location.pathname, pos3, false, navigate, setFocused, setFocus, cameraPosition, setCameraPosition, "/")}>Home</button>
            <motion.nav className="ml-8 flex space-x-4"
                initial="full"
                animate={reduced ? "closed" : "open"}
                variants={variants}
            >
                <button className={`header-nav ${location.pathname === "/product" && "active"} z-10`}
                onClick={() => pageTransition(location.pathname, pos3, false, navigate, setFocused, setFocus, cameraPosition, setCameraPosition, "/product")}
                >Shop</button>
                <button className={`header-nav ${location.pathname === "/contact" && "active"} z-10`}
                onClick={() => pageTransition(location.pathname, pos3, false, navigate, setFocused, setFocus, cameraPosition, setCameraPosition, "/contact")}
                >Contact</button>
            </motion.nav>
        </div>
        <div className="flex items-center ml-auto space-x-4">
            <motion.button className="cart-icon-div z-10 flex items-center" 
                    onClick={() => pageTransition(location.pathname, pos3, false, navigate, setFocused, setFocus, cameraPosition, setCameraPosition, "/cart")}
            >
                <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke={location.pathname === "/cart" ? "var(--powder-blue)": "#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {quantity !== 0 && <div className="ml-2 pr-2 z-10 text-[14px]">{quantity}</div>}
            </motion.button>
            {/* <input type="text" placeholder="Search"></input> */}
            <div className="acct-btn flex relative float-right pointer-events-auto border-2 p-1 rounded-full h-8 w-fit z-10">
            {(isAuthenticated) ? (
                <>
                <div className="flex items-center cursor-pointer z-10"
                    onClick={() => setShowAccountDropdown(showAccountDropdown => !showAccountDropdown)}
                >
                <img className="size-6 rounded-full text-sm mr-2" 
                    src={user?.picture} alt={user?.name} referrerPolicy="no-referrer"
                />
                <input type="checkbox" id="checkbox"
                    checked={showAccountDropdown}
                    onChange={() => setShowAccountDropdown(showAccountDropdown => !showAccountDropdown)}
                    className="hidden"
                />
                <label htmlFor="checkbox" className={`toggle mr-1 ${location.pathname === "/profile" && "active"}`}>
                        <div className="bars" id="bar1"></div>
                        <div className="bars" id="bar2"></div>
                        <div className="bars" id="bar3"></div>
                </label>
                </div>
                <motion.nav className={`absolute ${showAccountDropdown ? "" : "pointer-events-none"} p-4 right-0 mt-12 flex flex-col items-start bg-[var(--eerie-black)] rounded-md drop-shadow-sm z-10`}
                    initial="closed"
                    animate={showAccountDropdown ? "open" : "closed"}
                    variants={variants}
                >
                    <NavLink to="/profile" className={`${showAccountDropdown ? "" : "pointer-events-none"} text-center decoration-transparent`}>Profile</NavLink>
                    <LogoutButton className={`${showAccountDropdown ? "" : "pointer-events-none"} whitespace-nowrap`}/>
                </motion.nav>
                </>
            ):(
                <LoginButton className="m-auto" />
            )}
            </div>
        </div>
    </div>
    </div>
    );
}