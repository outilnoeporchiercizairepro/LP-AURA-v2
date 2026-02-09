"use client";
import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
    text: string;
    image?: string;
    name: string;
    role: string;
    title: string;
}

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role, title }, i) => (
                                <div
                                    className="p-8 rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-md shadow-xl shadow-black/20 max-w-xs w-full text-white"
                                    key={`${index}-${i}`}
                                >
                                    <div className="flex items-center gap-1 mb-4">
                                        <svg height="16" width="80" viewBox="0 0 512 96">
                                            <path fill="#00b67a" d="M0 0h96v96H0zM104 0h96v96h-96zM208 0h96v96h-96zM312 0h96v96h-96zM416 0h96v96h-96z"></path>
                                            <path fill="#ffffff" d="M48 64.7L62.6 61l6.1 18.8zm33.6-24.3H55.9L48 16.2l-7.9 24.2H14.4l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM152 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L152 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM256 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L256 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM360 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L360 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2zM464 64.7l14.6-3.7 6.1 18.8zm33.6-24.3h-25.7L464 16.2l-7.9 24.2h-25.7l20.8 15-7.9 24.2 20.8-15 12.8-9.2z"></path>
                                        </svg>
                                    </div>
                                    <div className="font-bold mb-3 text-sm leading-snug">{title}</div>
                                    <div className="text-sm opacity-70 leading-relaxed font-normal">{text}</div>
                                    <div className="flex items-center gap-3 mt-8">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[10px] font-bold text-white overflow-hidden shrink-0">
                                            {image ? <img src={image} alt={name} className="w-full h-full object-cover" /> : <span>{name.charAt(0)}</span>}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <div className="font-semibold tracking-tight text-xs truncate">{name}</div>
                                            <div className="flex items-center gap-1">
                                                <svg viewBox="0 0 14 14" fill="none" className="w-2.5 h-2.5 text-green-500">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM6.09217 7.81401L9.20311 4.7031C9.44874 4.45757 9.84688 4.45757 10.0923 4.7031C10.338 4.94864 10.338 5.34673 10.0923 5.59226L6.62009 9.06448C6.59573 9.10283 6.56682 9.13912 6.53333 9.17256C6.28787 9.41821 5.88965 9.41821 5.64402 9.17256L3.7059 7.11031C3.46046 6.86464 3.46046 6.46669 3.7059 6.22102C3.95154 5.97548 4.34968 5.97548 4.59512 6.22102L6.09217 7.81401Z" fill="currentColor"></path>
                                                </svg>
                                                <span className="text-[10px] opacity-40 tracking-tight">Vérifié</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};
