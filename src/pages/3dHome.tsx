import "./3dHome.css";

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ThreeDComponent } from "../3dcomponents/3dComponent";
import { useIsPresent, motion } from "framer-motion";
import { Header } from "../Header";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PrivacyScreen } from "../components/PrivacyScreen";
import { Vector3 } from "three";
import { pageTransition } from "../common/pagetransition";

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
    const isPresent = useIsPresent();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const pos1 = new Vector3(10,100,-3);
    const pos2 = new Vector3(100,15,-3);
    const pos3 = new Vector3(10,-1000,-3);
    const pos4 = new Vector3(10,15,-3);

    console.log(searchParams);

    return (
        <>
        {/* <Header/> */}
        <div className="flex flex-auto">
            <motion.div className="flex w-96 p-24 mt-auto flex-col"
                initial="closed"
                animate={props.focused ? "closed" : "open"}
                variants={variants}
            >
                <button onClick={() => pageTransition(location.pathname, pos3, false, navigate, props.setFocused, props.setFocus, props.cameraPosition, props.setCameraPosition, "/product")} className="text-left text-5xl py-2"><p className="home-btn-text">Shop</p></button>
                <button onClick={() => pageTransition(location.pathname, pos1, true, navigate, props.setFocused, props.setFocus, props.cameraPosition, props.setCameraPosition, "/about", props.home, props.setHome )} className="text-left text-5xl py-2"><p className="home-btn-text">About</p></button>
                <button onClick={() => pageTransition(location.pathname, pos3, false, navigate, props.setFocused, props.setFocus, props.cameraPosition, props.setCameraPosition, "/contact")} className="text-left text-5xl py-2"><p className="home-btn-text">Contact</p></button>
            </motion.div>
            <PrivacyScreen/>
        </div>
        </>
    );
}