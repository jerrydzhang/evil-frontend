import { ReactNode, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Material } from "three";


export default function MaterialShader({ children, ...props }: { children: ReactNode; }) {
    const ref = useRef<any>();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
    }) ,[]);

    useFrame(({ clock }) => {
        uniforms.uTime.value = clock.getElapsedTime();
    });

    useEffect(() => {
        ref.current.traverse((obj: {
            [x: string]: any; isMesh: any; material: Material; computeVertexNormals: any; 
            }) => {
            if (obj.isMesh) {
                // obj.material.wireframe = true;

                obj.material.onBeforeCompile = 
                    (shader: 
                        { uniforms:
                            { [x: string]: { value: any; }; }; 
                        vertexShader: string; 
                        fragmentShader: string; }) => {
                    shader.uniforms.uTime = uniforms.uTime;
                    // shader.vertexShader = `uniform float uTime;\n${shader.vertexShader}`;
                    shader.vertexShader = shader.vertexShader.replace(
                        '#include <common>',
                        `
                        // NOTE Add varyings and uniforms here
                        
                        uniform float uTime;

                        varying vec2 vUv;

                        float random (in vec2 _st) {
                            return fract(sin(dot(_st.xy,
                                                 vec2(12.9898,78.233)))*
                                43758.5453123);
                        }
                        
                        // Based on Morgan McGuire @morgan3d
                        // https://www.shadertoy.com/view/4dS3Wd
                        float noise (in vec2 _st) {
                            vec2 i = floor(_st);
                            vec2 f = fract(_st);
                        
                            // Four corners in 2D of a tile
                            float a = random(i);
                            float b = random(i + vec2(1.0, 0.0));
                            float c = random(i + vec2(0.0, 1.0));
                            float d = random(i + vec2(1.0, 1.0));
                        
                            vec2 u = f * f * (3.0 - 2.0 * f);
                        
                            return mix(a, b, u.x) +
                                    (c - a)* u.y * (1.0 - u.x) +
                                    (d - b) * u.x * u.y;
                        }

                        #include <common>
                    `
                      ).replace(
                        `#include <begin_vertex>`,
                        `
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);

                        #include <begin_vertex>
                        `
                      );

                    shader.fragmentShader = shader.fragmentShader.replace(
                        '#include <common>',
                        `
                        // NOTE Add varyings and uniforms here
                        
                        uniform float uTime;
                        
                        varying vec2 vUv;

                        #include <common>
                        `
                        ).replace(
                        `#include <color_fragment>`,
                        `
                        vec2 uv = vUv;

                        gl_FragColor = gl_FragColor * vec4(1.0, 1.0, 1.0, 1.0);

                        #include <color_fragment>
                        `
                        );
                
					obj.material.userData.shader = shader;
				};
            }
        });
    }, []);

    return (
        <group ref={ref}>{children}</group>
    )
}