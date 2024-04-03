import { motion, useIsPresent } from "framer-motion";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { PrivacyScreen } from "../components/PrivacyScreen";
import { Vector3 } from "three";
import { useLocation } from "react-router-dom";

export function About(
    props: {home: boolean, setHome: Dispatch<SetStateAction<boolean>>, focused: boolean, setFocused: Dispatch<SetStateAction<boolean>>, focus: Vector3; setFocus: Dispatch<SetStateAction<Vector3>>;}
) {
    const isPresent = useIsPresent();
	const location = useLocation();
    
    useMemo(() => {
        setTimeout(() => {
          setTimeout(() => {
            props.setFocus(new Vector3(10,15,-3));
            setTimeout(() => {
                props.setFocused(false);
            }, 200);
          }, 0);
        }, 10);
    }, []);

    return (
        <div className="self-center my-auto" key={location.key}>  
            <PrivacyScreen/>
        </div>
    );
}
