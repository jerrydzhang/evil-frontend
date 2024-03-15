import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Dispatch, SetStateAction, useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Vector3 } from "three";

const OrbitRig = ({ focused, setFocused, focus, setFocus, radius, setRadius }: { focused: boolean; setFocused: Dispatch<SetStateAction<boolean>>; focus: Vector3; setFocus: Dispatch<SetStateAction<Vector3>>; radius: number; setRadius: Dispatch<SetStateAction<number>>;}) => {
  
    const location = useLocation();
  
    const [init, setInit] = useState(true);
  
    useEffect(() => {
        setTimeout(() => {
            setTimeout(() => {
                setFocus(new Vector3(10,15,-3));
                setTimeout(() => {
                    setFocused(false);
                }, 200);
            }, 100);
        }, 10);
    }, [location]);
  
    useEffect(() => {
        setTimeout(() => {
            setInit(false);
        }, 5);
    }, []);
  
  
    useFrame((state, delta) => {
      if (focused) {
        state.camera.position.set(-8,3,10);
        return;
      }
      
      const scaler = 0.3;
      const theta = (Math.PI * 0.65) - ( 1 * ( state.pointer.y/100 * Math.PI ) * scaler );
      const phi = (Math.PI * 0.8) - ( 1 * ( state.pointer.x/100 * Math.PI * 2 ) * scaler );
  
      const xoffset = radius * Math.sin(theta) * Math.cos(phi);
      const yoffset = radius * Math.sin(theta) * Math.sin(phi);
      const zoffset = radius * Math.cos(theta);
  
      // console.log(focus.x + xoffset, focus.y + zoffset, focus.z + yoffset);
  
      easing.damp3(state.camera.position, [focus.x + xoffset, focus.y + zoffset, focus.z + yoffset], 0.5, delta)
    })
  
    useFrame((state, delta) => {
      if (init) {
        state.camera.lookAt(focus);
      } else {
        easing.dampLookAt(state.camera, focus, 0.5, delta);
      }
    });
  
    return null;
  }

export default OrbitRig;