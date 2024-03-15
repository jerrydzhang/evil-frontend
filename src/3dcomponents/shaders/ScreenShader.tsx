import { Effect } from "postprocessing";
import { forwardRef, useMemo } from "react";
import { Uniform } from "three";

const fragmentShader =
`
uniform vec3 glowColor;
uniform float intensity;

#define M_PI 3.1415926535897932384626433832795

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void mainUv(inout vec2 uv) {
    uv = uv;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 adjustedColor = inputColor.rgb * 2.;

    // Define the number of levels for posterization
    float numLevels = 64.;
    float maskLevels = 4.;

    // Calculate the color value for each channel
    vec3 color = adjustedColor.rgb;
    color = floor(color * (numLevels)) / (numLevels - 1.0);

    vec3 mask = adjustedColor.rgb;
    mask = floor(mask * (maskLevels)) / (maskLevels - 1.0);

    // Make any colors that are not black, white
    vec3 bloommask = vec3(max(max(mask.r, mask.g),mask.b));
    bloommask = bloommask * glowColor;

    bloommask = rgb2hsv(bloommask);
    bloommask.g = bloommask.g + 0.5;
    bloommask = hsv2rgb(bloommask);

    // Output the modified color
    outputColor = vec4(color - mask * 0.5 + bloommask * (intensity * sin(time) * 0.5 + 0.5), inputColor.a);
    // outputColor = vec4(mask, 1.);
    // outputColor = vec4(color - mask * 0.5, inputColor.a);
}
`;

const glowColor = [76, 36, 74].map((value) => value / 255);

let _intensity: number, _glowColor: Array<number>;

export default class ScreenShader extends Effect {
    constructor({intensity = 0, glowColor = [76, 36, 74].map((value) => value / 255)}) {
        const uniforms = new Map<string, Uniform<any>>([
            ["intensity", new Uniform(intensity)],
            ["glowColor", new Uniform(glowColor)],
            ["uTime", new Uniform(0)],
        ]);

        _intensity = intensity;
        _glowColor = glowColor;

        super("ScreenShader", fragmentShader, { uniforms });
    }

    public update = (_renderer: any, _inputBuffer: any, deltaTime: number) => {
        this.uniforms.get("intensity")!.value = _intensity;
        this.uniforms.get("glowColor")!.value = _glowColor;
    };
}

export const MyCustomEffect = forwardRef(({intensity = 0, glowColor = [76, 36, 74].map((value) => value / 255)}: { intensity: number, glowColor: Array<number> }, ref) => {
    const effect = useMemo(() => new ScreenShader({intensity, glowColor}), [
        intensity,
        glowColor,
    ])
    return <primitive ref={ref} object={effect} dispose={null} />
})
  