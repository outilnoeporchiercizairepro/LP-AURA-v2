"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGradientBackgroundProps {
    className?: string;
    intensity?: "subtle" | "medium" | "strong";
    position?: "fixed" | "absolute";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    const isPink = Math.random() > 0.5;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 150 + Math.random() * 200,
        length: height * 3,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.015 + Math.random() * 0.02, // 10% of original (0.15 + 0.2)
        hue: isPink ? 300 : 205,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

export function BeamsBackground({
    className,
    intensity = "strong",
    position = "fixed",
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 20;

    const opacityMap = {
        subtle: 0.04, // 10% of original
        medium: 0.07, // 10% of original
        strong: 0.1, // 10% of original
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        const updateCanvasSize = () => {
            const width = position === "fixed" ? window.innerWidth : canvas.parentElement?.clientWidth || window.innerWidth;
            const height = position === "fixed" ? window.innerHeight : canvas.parentElement?.clientHeight || window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);

            const totalBeams = MINIMUM_BEAMS * 1.5;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(width, height)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            const width = canvas?.width ? canvas.width / dpr : window.innerWidth;
            const height = canvas?.height ? canvas.height / dpr : window.innerHeight;

            const column = index % 3;
            const spacing = width / 3;

            beam.y = height + 300;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.8;
            beam.width = 200 + Math.random() * 200;
            beam.speed = 0.5 + Math.random() * 1.0;
            const isPink = Math.random() > 0.5;
            beam.hue = isPink ? 300 : 205;
            beam.opacity = 0.15 + Math.random() * 0.2;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity =
                beam.opacity *
                (0.7 + Math.sin(beam.pulse) * 0.3) *
                opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            const hue = beam.hue;

            gradient.addColorStop(0, `hsla(${hue}, 90%, 60%, 0)`);
            gradient.addColorStop(
                0.2,
                `hsla(${hue}, 90%, 60%, ${pulsingOpacity * 0.5})`
            );
            gradient.addColorStop(
                0.5,
                `hsla(${hue}, 90%, 60%, ${pulsingOpacity})`
            );
            gradient.addColorStop(
                0.8,
                `hsla(${hue}, 90%, 60%, ${pulsingOpacity * 0.5})`
            );
            gradient.addColorStop(1, `hsla(${hue}, 90%, 60%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!ctx || !canvas) return;

            const width = canvas.width / dpr;
            const height = canvas.height / dpr;

            ctx.clearRect(0, 0, width, height);
            ctx.filter = "blur(40px)";

            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                if (beam.y + beam.length < -300) {
                    resetBeam(beam, index, beamsRef.current.length);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [intensity, position]);

    return (
        <div
            className={cn(
                position === "fixed" ? "fixed inset-0" : "absolute inset-0",
                "min-h-full w-full overflow-hidden bg-black -z-10 pointer-events-none",
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ filter: "blur(20px)" }}
            />

            <motion.div
                className="absolute inset-0 bg-black/20"
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                }}
            />
        </div>
    );
}
