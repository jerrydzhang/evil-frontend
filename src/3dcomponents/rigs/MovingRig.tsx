import { CameraControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Vector3 } from "three";

const MovingRig = ({ focused, setFocused, focus, setFocus, radius, setRadius, position, setPosition, cameraPosition, setCameraPosition, cameraControlsRef }: { focused: boolean; setFocused: Dispatch<SetStateAction<boolean>>; focus: Vector3; setFocus: Dispatch<SetStateAction<Vector3>>; radius: number; setRadius: Dispatch<SetStateAction<number>>; position: Vector3; setPosition: Dispatch<SetStateAction<Vector3>>; cameraPosition: Vector3; setCameraPosition: Dispatch<SetStateAction<Vector3>>; cameraControlsRef: React.MutableRefObject<CameraControls>;}) => {
    
    const location = useLocation();
    const focusObject = useRef<THREE.Mesh>(null!);
    const camera = useThree((state) => state.camera);

    const [init, setInit] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setTimeout(() => {
          setTimeout(() => {
            setFocused(false);
          }, 200);
        }, 100);
      }, 10);
    }, [location]);
  
    useEffect(() => {
      setTimeout(() => {
        setInit(false);
      }, 10);
    }, []);
  
    useEffect(() => {
      cameraControlsRef.current.minDistance = 1e-5;
      cameraControlsRef.current.dollyTo(1e-5, false);
      // console.log(cameraControlsRef.current.maxDistance, cameraControlsRef.current.minDistance, cameraControlsRef.current.distance);
    }, [cameraControlsRef]);

    
    const saveRotation = () => {
        localStorage.setItem("cameraRotation", JSON.stringify([cameraControlsRef.current.azimuthAngle, cameraControlsRef.current.polarAngle]));
    }

    useEffect(() => {
        document.addEventListener("click", saveRotation);
        return () => {
            document.removeEventListener("click", saveRotation);
        }
    }, []);

    useEffect(() => {
        if (focused) {
            cameraControlsRef.current.smoothTime = 0;
        } else {
            setTimeout(() => {
                cameraControlsRef.current.smoothTime = 0.25;
            }, 200);
        }
    }, [focused]);
    
    useFrame((state, delta) => {
        if (focused) {
            return;
        }
        cameraControlsRef.current.moveTo(cameraPosition.x, cameraPosition.y, cameraPosition.z, !init);
    })
      
    return null;
  }

export default MovingRig;