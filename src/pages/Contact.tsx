import { motion, useIsPresent } from "framer-motion";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { PrivacyScreen } from "../components/PrivacyScreen";
import { Vector3 } from "three";

export function Contact(
    props: {home: boolean, setHome: Dispatch<SetStateAction<boolean>>, focused: boolean, setFocused: Dispatch<SetStateAction<boolean>>, focus: Vector3; setFocus: Dispatch<SetStateAction<Vector3>>;}
) {
    const isPresent = useIsPresent();
    
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
        
        <div>
            <h1>Contacts</h1>
            <p>PLACEHOLDER</p>
            <PrivacyScreen/>
        </div>
    );
}