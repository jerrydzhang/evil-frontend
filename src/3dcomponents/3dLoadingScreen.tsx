import { useProgress, Html } from "@react-three/drei";
import React from "react";

export function ThreeDLoading() {
    const { active, progress, errors, item, loaded, total } = useProgress()

    return (
        <Html center>
            <div className="">
                <p className="text-3xl">Loading...</p>
                {progress}%
            </div>
        </Html>
    )
}