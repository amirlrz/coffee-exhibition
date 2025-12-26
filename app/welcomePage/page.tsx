"use client";

import Image from "next/image";
import SocialButton from "../components/socialbtn/socialbtn";
import Lottie from "lottie-react";
import coffeebrownPink from "../../public/coffeebrownPink.json";
import { useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import { coffeeFont } from "@/app/layout";
import storeContext from "../providers/Themcontext";

export default function WelcomePage() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const context = useContext(storeContext);
  if (!context) {
    throw new Error("useContext must be used within a StoreProvider");
  }

  const { ImgLoaded ,setImgLoaded} = context;

  useEffect(() => {
    if ( ImgLoaded) {
    // انیمیشن متن خوشامدگویی
    gsap.from(textRef.current, {
      y: -50,
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: "power3.out",
    });

    // انیمیشن Lottie
    gsap.from(lottieRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out",
    });

    // انیمیشن شبکه‌های اجتماعی
    gsap.from(socialRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }
  }, [ImgLoaded]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black/80">
      {/* Background */}
      <Image
        src="/entery1.jpg"
        alt="background"
        fill
        onLoadingComplete={()=>setImgLoaded(true)}
        className="object-cover brightness-50"
        priority
      />

      {/* Overlay تیره */}
      <div className="absolute inset-0 bg-black/60 " />
{
  ImgLoaded && (
    <>
 {/* Content */}
 <div className="relative z-10 flex flex-col items-center gap-6 text-center">
 <h1
   ref={textRef}
   className={`${coffeeFont.className} text-2xl md:text-4xl text-red-600 font-bold tracking-widest`}
 >
    به خانواده گیومه خوش آمدید
 </h1>

 <p className={`${coffeeFont.className} text-gray-200 text-lg`}>
   حالا شما هم بخشی از دنیای قهوه ما هستید ☕
 </p>

 {/* Lottie Animation */}
 <div ref={lottieRef} className="w-72 h-72">
   <Lottie animationData={coffeebrownPink} loop={true} />
 </div>

 {/* Social Buttons */}
 <div ref={socialRef}>
   <SocialButton />
 </div>
</div>
</>
  )
}
     
    </div>
  );
}
