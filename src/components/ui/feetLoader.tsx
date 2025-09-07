"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FootstepsLoaderProps {
  className?: string;
  color?: string;
}

export function FootstepsLoader({
  className,
  color = "#000000",
}: FootstepsLoaderProps) {
  const [footsteps, setFootsteps] = useState<
    { id: number; x: number; y: number; rotation: number }[]
  >([]);


  useEffect(() => {
    const generateFootstepsPath = () => {
      const steps = [];

      const centerX = 150;
      const centerY = 80;
      const maxT = Math.PI * 4;
      const distance = 50;

      for (let t = 0; t < maxT; t += 0.2) {
        // Calculate position using the exact parametric equations
        const x = centerX + Math.sin(2.2 * t) * distance;
        const y = centerY + Math.cos(3.1 * t) * distance;

        // Calculate the tangent angle for proper foot rotation
        const dx = 2.2 * Math.cos(2.2 * t);
        const dy = -3.1 * Math.sin(3.1 * t);
        const baseRotation = Math.atan2(dy, dx) * (180 / Math.PI) - 90;

        // Alternate left and right footsteps with appropriate rotation
        const isLeftFoot = t % 2 === 0;
        const rotation = isLeftFoot ? baseRotation - 15 : baseRotation + 15;

        steps.push({ id: t, x, y, rotation });
      }

      return steps;
    };

    setFootsteps(generateFootstepsPath());
  }, []);

  return (
    <div
      className={`relative h-40 w-full ${className}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 160"
        preserveAspectRatio="xMidYMid meet"
      >
        {footsteps.map((step, index) => (
          <motion.g
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3,
              delay: index * 0.6,
              times: [0, 0.4, 0.6, 1],
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: (footsteps.length - 1) * 0.6,
            }}
            transform={`translate(${step.x}, ${step.y}) rotate(${step.rotation})`}
          >
            {index % 2 === 0 ? (
              // Left foot
              <path
                d="M-7,-3 C-5,-7 0,-8 3,-6 C6,-4 7,0 5,5 C3,10 -2,12 -5,10 C-8,8 -9,1 -7,-3 Z"
                fill={color}
              />
            ) : (
              // Right foot
              <path
                d="M7,-3 C5,-7 0,-8 -3,-6 C-6,-4 -7,0 -5,5 C-3,10 2,12 5,10 C8,8 9,1 7,-3 Z"
                fill={color}
              />
            )}
          </motion.g>
        ))}
      </svg>
      <p className="w-full text-lg text-center animate-pulse">
        We're securely getting your data...
      </p>
      <span className="sr-only">Loading...</span>
    </div>
  );
}