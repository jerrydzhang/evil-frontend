import { Dispatch, SetStateAction } from "react";
import { Vector3 } from "three";

export function pageTransition(
  path: string,
  focus: Vector3, 
  move: boolean, 
  navigate: any, 
  setFocused: Dispatch<SetStateAction<boolean>>, 
  setFocus: Dispatch<SetStateAction<Vector3>>, 
  cameraPosition: Vector3,
  setCameraPosition: Dispatch<SetStateAction<Vector3>>, 
  page?: string, 
  home?: boolean, 
  setHome?: Dispatch<SetStateAction<boolean>>) 
{
  const transitionLocations = ["/", "/about"];
  if(!transitionLocations.includes(path)) {
    setFocused(true);
    setFocus(focus);
    setCameraPosition(new Vector3(cameraPosition.x,-20,cameraPosition.z));
    setTimeout(() => {
      setTimeout(() => {
        setFocused(false);
      }, 300);
      setCameraPosition(new Vector3(-8,3,10));
      navigate(page);
    }, 10);
  } else {
    setFocused(true);
    setFocus(focus);
    setCameraPosition(new Vector3(cameraPosition.x,-20,cameraPosition.z));
    setTimeout(() => {
      move ? setFocused(false) : setTimeout(() => {
        setFocused(false);
      }, 200);
      setCameraPosition(new Vector3(-8,3,10));
      page ? navigate(page): setHome && setHome(!home);
    }, 1000);
  }
}
