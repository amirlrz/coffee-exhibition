import { coffeeFont } from "@/app/layout";
import storeContext from "@/app/providers/Themcontext";
import gsap from "gsap";
import { useContext, useLayoutEffect, useRef } from "react";

export default function AnimatedHeader() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const context = useContext(storeContext);
  if (!context) {
    throw new Error("useContext must be used within a StoreProvider");
  }

  const { ImgLoaded } = context;

  useLayoutEffect(() => {
    if (!ImgLoaded || !headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        //clearProps: "all", 
      }
    );
  }, [ImgLoaded]);

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
        opacity-0
      `}
      style={{ visibility: ImgLoaded ? "visible" : "hidden" }}
    >
      برشته کاری قهوه گیومه
    </h1>
  );
}
