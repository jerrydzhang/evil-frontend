import "./3dHome.css";

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ThreeDComponent } from "../3dcomponents/3dComponent";
import { useIsPresent, motion } from "framer-motion";
import { Header } from "../Header";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PrivacyScreen } from "../components/PrivacyScreen";
import { Vector3 } from "three";
import { pageTransition } from "../common/pagetransition";
import { useAuth0 } from "@auth0/auth0-react";

const variants = {
    open: { opacity: 1, y: 0},
    closed: { opacity: 0, y: -10},
}
  
export function ThreeDHome(
    props: {
        home: boolean, 
        setHome: Dispatch<SetStateAction<boolean>>, 
        focused: boolean, 
        setFocused: Dispatch<SetStateAction<boolean>>, 
        focus: Vector3; 
        setFocus: Dispatch<SetStateAction<Vector3>>;
        cameraPosition: Vector3;
        setCameraPosition: Dispatch<SetStateAction<Vector3>>;
    }
) {
	const [showInfo, setShowInfo] = useState(false);
    const isPresent = useIsPresent();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
	const { user, isAuthenticated } = useAuth0();

    const pos1 = new Vector3(10,100,-3);
    const pos2 = new Vector3(100,15,-3);
    const pos3 = new Vector3(10,-1000,-3);
    const pos4 = new Vector3(10,15,-3);

    return (
        <>
        <div className="flex flex-auto">
            <motion.div className="flex w-min-96 p-24 mt-auto flex-col"
                initial="closed"
                animate={props.focused ? "closed" : "open"}
                variants={variants}
            >
				<div className="py-1">
				<div className="flex">
				<h1 className="text-5xl text-left mr-4">Hello, </h1>
				<h1 className="text-5xl text-left">{isAuthenticated ? user!.name!.replace(/\b\w/g, (match) => match.toUpperCase()) : "Guest"}</h1>
				</div>
				</div>
                <button onClick={() => pageTransition(location.pathname, pos3, false, navigate, props.setFocused, props.setFocus, props.cameraPosition, props.setCameraPosition, "/product")} className="text-left text-5xl py-2"><p className="home-btn-text">Shop</p></button>
                <button onClick={() => pageTransition(location.pathname, pos1, true, navigate, props.setFocused, props.setFocus, props.cameraPosition, props.setCameraPosition, "/about", props.home, props.setHome )} className="text-left text-5xl py-2"><p className="home-btn-text">About</p></button>
                <button onClick={() => setShowInfo(() => !showInfo)} className="text-left text-5xl py-2"><p className="home-btn-text">Contact</p></button>
				<motion.div className="py-1 w-full overflow-hidden"
					initial={{ height: 0 }}
					animate={showInfo ? { height: "auto"} : { height: 0 }}
					transition={{ 
						duration: 0.2 
					}}
				>
					<p className="text-left text-2xl">Email: temp </p>
					<p className="text-left text-2xl">Phone: temp</p>
				</motion.div>
            </motion.div>
            <PrivacyScreen/>
        </div>
        </>
    );
}
