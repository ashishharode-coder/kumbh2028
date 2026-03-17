"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/app/user/layout/Navbar";
import Footer from "@/app/user/layout/Footer";

export default function LayoutHandler({ children }) {
  const pathname = usePathname();

  // Jin paths par Navbar/Footer nahi chahiye, unhe yahan add karein
  const hideLayout = pathname === "/user/login" || pathname === "/otp"; 

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}