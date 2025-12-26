"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Coffeelove from "../../../public/Coffeelove.json";
import snowsanta from "../../../public/snowsanta.json";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabse/client";
import Image from "next/image";
import Button from "../entrybutton/entrybutton";
import { coffeeFont } from "@/app/layout";
import AnimatedHeader from "../animatedHeader/animatedHeader";
import { gsap } from "gsap";
// --------------------------
// 🔐 Zod Schema Validation
// --------------------------
const EnteryToclassSchema = z.object({
    name: z
      .string()
      .min(2, "نام باید حداقل ۲ حرف باشد")
      .regex(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است"),
  
      phonNumber: z
      .string()
      .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
    
  });
  

// TypeScript type از Zod
type EnteryToclassForm = z.infer<typeof EnteryToclassSchema>;

export default function SetEnteryToclassPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [ImgLoaded, setImgLoaded] = useState(false);
  // ------------------------------------
  // 🎯 React Hook Form + ZodResolver
  // ------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnteryToclassForm>({
    resolver: zodResolver(EnteryToclassSchema),
  });

  async function onSubmit(data: EnteryToclassForm) {
    //console.log("cred" , data);
    
    try {
      setLoading(true);

      const { error } = await supabase.from("customers").insert({
        name: data.name,
        phone: data.phonNumber,
      });

      if (error) {
        toast.error("مشکلی پیش اومد");
        console.log(error);
        return;
      }

      toast.success(`${data.name} به گیومه خوش امدید`);
      router.push("/welcomePage");
    } finally {
      setLoading(false);
    }
  }
  const divRef = useRef(null);

  useEffect(() => {
    gsap.from(divRef.current, {
      x: 200,        // شروع از راست
      opacity: 0,    // از شفاف
      duration: 3,   // مدت زمان انیمیشن
      ease: "power3.out",
      delay: 0.8,    // کمی تاخیر برای هماهنگی با سایر انیمیشن‌ها
    });
  }, []);


  return (
<div className="relative min-h-screen flex items-center justify-center bg-black/80">
  {/* Background */}
  <Image
    src="/bckg.jpg"
    alt="background"
    onLoadingComplete={()=>setImgLoaded(true)}
    fill
    className="object-cover brightness-50"
    priority
  />
{/* SnowSanta Cover */}
{ImgLoaded && (
  <>
<div className="absolute inset-0 z-0 pointer-events-none">
  <Lottie animationData={snowsanta} loop={true} className="w-full h-full object-cover" />
</div>


  {/* Overlay تیره */}
  <div className="absolute inset-0 bg-black/50 " />


<AnimatedHeader/>

  <div className="w-56 h-36 absolute top-1">
    <Lottie animationData={Coffeelove} loop={true} />
  </div>
  {/* Form Wrapper */}
  <div className="relative z-10 w-full max-w-lg p-8 rounded-3xl shadow-2xl">

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-center">

    <div
      ref={divRef}
      className="flex items-center justify-center text-gray-300 mb-6 gap-2"
    >
      <span className={`${coffeeFont.className}`}>همراه خانواده گیومه شو</span>
      <Image
        src="/logo2.png"
        alt="logo"
        width={96}
        height={96}
        className="rounded-full"
      />
    </div>



      {/* Input fields */}
      <div className="space-y-4 ">
        <input
          {...register("name")}
          type="text"
          placeholder="نام و نام خانوادگی"
          className={`w-full px-4 py-3 rounded-xl text-white bg-black/40 border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
            errors.name ? "border-red-500" : "border-red-700"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}

        <input
          {...register("phonNumber")}
          type="text"
          placeholder="شماره همراه"
          className={`w-full px-4 py-3 rounded-xl text-white bg-black/40 border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
            errors.phonNumber ? "border-red-500" : "border-red-700"
          }`}
        />
        {errors.phonNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phonNumber.message}</p>
        )}
      </div>

      {/* Submit Button */}
      
      <Button
        type="submit"
        loading={loading}
        text="ورود به دنیای قهوه"
      />
    </form>
  </div>
  </>
  )}
</div>

  );
}
