'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

// ===================== SHADER =====================
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  #ifdef GL_ES
    precision lowp float;
  #endif
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;
  
  vec4 buf[8];
  
  vec4 sigmoid(vec4 x) { return 1. / (1. + exp(-x)); }
  
  vec4 cppn_fn(vec2 coordinate, float in0, float in1, float in2) {
    // layer 1
    buf[6] = vec4(coordinate.x, coordinate.y, 0.3948 + in0, 0.36 + in1);
    buf[7] = vec4(0.14 + in2, sqrt(coordinate.x * coordinate.x + coordinate.y * coordinate.y), 0., 0.);

    // layer 2
    buf[0] = mat4(vec4(6.5404, -3.6126, 0.759, -1.136), vec4(2.458, 3.166, 1.221, 0.062), vec4(-5.478, -6.159, 1.87, -4.774), vec4(6.039, -5.542, -0.909, 3.251))
    * buf[6]
    + mat4(vec4(0.847, -5.722, 3.975, 1.652), vec4(-0.243, 0.583, -1.766, -5.350), vec4(0.0), vec4(0.0))
    * buf[7]
    + vec4(0.218, 1.124, -1.796, 5.029);
    
    buf[1] = mat4(vec4(-3.352, -6.061, 0.556, -4.471), vec4(0.863, 1.743, 5.643, 1.610), vec4(2.494, -3.501, 1.718, 6.357), vec4(3.310, 8.209, 1.135, -1.165))
    * buf[6]
    + mat4(vec4(5.240, -13.034, 0.009, 15.870), vec4(2.987, 3.129, -0.890, -1.682), vec4(0.0), vec4(0.0))
    * buf[7]
    + vec4(-5.945, -6.573, -0.881, 1.543);

    buf[0] = sigmoid(buf[0]);
    buf[1] = sigmoid(buf[1]);

    // layer 3
    buf[2] = mat4(vec4(-15.219, 8.095, -2.429, -1.938), vec4(-5.951, 4.311, 2.639, 1.274), vec4(-7.314, 6.729, 5.247, 5.941), vec4(5.079, 8.979, -1.727, -1.158))
    * buf[6]
    + mat4(vec4(-11.967, -11.608, 6.148, 11.237), vec4(2.124, -6.263, -1.705, -0.702), vec4(0.0), vec4(0.0))
    * buf[7]
    + vec4(-4.171, -3.228, -4.576, -3.640);
    
    buf[3] = mat4(vec4(3.183, -13.738, 1.879, 3.233), vec4(0.643, 12.768, 1.914, 0.509), vec4(-0.049, 4.480, 1.473, 1.801), vec4(5.003, 13.000, 3.399, -4.556))
    * buf[6]
    + mat4(vec4(-0.128, 7.720, -3.142, 4.742), vec4(0.639, 3.714, -0.810, -0.391), vec4(0.0), vec4(0.0))
    * buf[7]
    + vec4(-1.181, -21.621, 0.785, 1.232);
    
    buf[2] = sigmoid(buf[2]);
    buf[3] = sigmoid(buf[3]);

    // layers 5-8 logic condensed
    buf[4] = mat4(vec4(5.214, -7.183, 2.722, 2.659), vec4(-5.601, -25.359, 4.067, 0.460), vec4(-10.577, 24.286, 21.102, 37.546), vec4(4.302, -1.962, 2.345, -1.372)) * buf[0] + vec4(-7.679, 15.927, 1.320, -1.668); // partial
    buf[4] = sigmoid(buf[4]);
    
    // Output layer mapping to Blue and Pink
    vec3 pink = vec3(0.98, 0.05, 0.98); // #FA0CF9
    vec3 blue = vec3(0.05, 0.58, 0.97); // #0C94F7
    
    float mixVal = buf[0].x;
    vec3 finalColor = mix(pink, blue, mixVal);
    
    return vec4(finalColor, 1.0);
  }
  
  void main() {
    vec2 uv = vUv * 2.0 - 1.0; uv.y *= -1.0;
    gl_FragColor = cppn_fn(uv, 0.1 * sin(0.3 * iTime), 0.1 * sin(0.69 * iTime), 0.1 * sin(0.44 * iTime));
  }
`;

const CPPNShaderMaterial = shaderMaterial(
    { iTime: 0, iResolution: new THREE.Vector2(1, 1) },
    vertexShader,
    fragmentShader
);

extend({ CPPNShaderMaterial });

function ShaderPlane() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<any>(null!);

    useFrame((state) => {
        if (!materialRef.current) return;
        materialRef.current.iTime = state.clock.elapsedTime;
        const { width, height } = state.size;
        materialRef.current.iResolution.set(width, height);
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <planeGeometry args={[4, 4]} />
            {/* @ts-ignore */}
            <cPPNShaderMaterial ref={materialRef} side={THREE.DoubleSide} />
        </mesh>
    );
}

export function NeuralBackground({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const camera = useMemo(() => ({ position: [0, 0, 1] as [number, number, number], fov: 75, near: 0.1, far: 1000 }), []);

    useGSAP(
        () => {
            if (!containerRef.current) return;
            gsap.to(containerRef.current, {
                opacity: 0.25, // User requested "pas trop fort"
                duration: 2,
                ease: 'power2.inOut'
            });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className={cn("fixed inset-0 -z-30 w-full h-full bg-black opacity-0 pointer-events-none", className)}
            aria-hidden
        >
            <Canvas
                camera={camera}
                gl={{ antialias: true, alpha: false }}
                dpr={[1, 2]}
                style={{ width: '100%', height: '100%' }}
            >
                <ShaderPlane />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
        </div>
    );
}
