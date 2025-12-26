'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { coffeeFont } from "@/app/layout";

export default function AnimatedHeader() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: 50,          // حرکت از پایین
      opacity: 0,     // از شفاف
      scale: 0.8,     // کمی کوچک‌تر
      duration: 1.2,  // مدت زمان
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return (
    <h1
      ref={headerRef}
      className={`
        ${coffeeFont.className}
        absolute top-3
        text-3xl 
        text-red-700
        tracking-widest
        drop-shadow-[0_0_10px_rgba(185,28,28,0.9)]
        flex items-center justify-center
      `}
    >
      برشته کاری قهوه گیومه
    </h1>
  );
}
