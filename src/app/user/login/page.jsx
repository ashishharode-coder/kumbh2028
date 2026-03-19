"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
const counter_bg = "/counter_bg.jpeg";

const Login = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const inputRefs = useRef([]);

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    if (status === "true") {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) setMobile(val);
  };

  const handleSendOtp = () => {
    if (!isValidMobile) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      showToast("OTP Sent Successfully", "success");
    }, 1000);
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      showToast("Enter 4-digit OTP", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (enteredOtp === "1234") {
        showToast("Access Granted!", "success");

        // 2 Sec Loader Logic
        setTimeout(() => {
          setIsRedirecting(true);
          localStorage.setItem("isLoggedIn", "true");

          setTimeout(() => {
            router.replace("/");
          }, 2000);
        }, 800);
      } else {
        showToast("Invalid OTP", "error");
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }, 1200);
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") {
      // Sirf tabhi action (OTP send) karo jab mobile valid ho AUR terms accept ho chuke ho
      if (isValidMobile && acceptedTerms && !loading) {
        action();
      } else if (!acceptedTerms && isValidMobile) {
        // Optional: Agar user ne tick nahi kiya toh error dikha sakte hain
        showToast("Please accept Terms & Conditions", "error");
      }
    }
  };
  const isValidMobile = mobile.length === 10 && /^[6-9]/.test(mobile);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={counter_bg}
          alt="Background"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[0px]" />
      </div>

      {/* Dynamic Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed top-10 z-[100] border backdrop-blur-xl px-5 py-2.5 rounded-full text-[11px] font-black tracking-widest flex items-center gap-2 shadow-2xl ${
              toast.type === "success"
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                : "bg-red-500/20 border-red-500/40 text-red-400"
            }`}
          >
            {toast.type === "success" ? (
              <Sparkles size={16} />
            ) : (
              <XCircle size={16} />
            )}
            {toast.msg.toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isRedirecting ? (
          /* --- 2 SEC LOADER UI --- */
          <motion.div
            key="redirect-loader"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="z-20 text-center space-y-4"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-16 h-16 border-t-2 border-orange-500 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-xl">
                🔱
              </div>
            </div>
            <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
              Initializing Journey...
            </p>
          </motion.div>
        ) : (
          /* --- MAIN LOGIN CARD --- */
          <motion.div
            layout
            key="login-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[340px] bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 p-8 shadow-2xl relative z-10"
          >
            {/* Progress Bar */}
            <div className="flex gap-1.5 mb-8 justify-center">
              <div
                className={`h-1 w-6 rounded-full transition-all duration-500 ${step >= 1 ? "bg-orange-500 shadow-[0_0_10px_#f97316]" : "bg-white/20"}`}
              />
              <div
                className={`h-1 w-6 rounded-full transition-all duration-500 ${step >= 2 ? "bg-orange-500 shadow-[0_0_10px_#f97316]" : "bg-white/20"}`}
              />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase italic leading-tight">
                {step === 1 ? "Login" : "Security"} <br />
                <span className="text-orange-500 italic">
                  {step === 1 ? "Access" : "Check"}
                </span>
              </h2>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mt-3">
                {step === 1 ? "Simhastha 2028" : `OTP sent to +91 ${mobile}`}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div
                    className={`flex items-center transition-all duration-300 rounded-2xl px-4 py-4 border-2 ${isValidMobile ? "border-orange-500/50 bg-orange-500/10" : "border-white/10 bg-white/5 focus-within:border-white/40"}`}
                  >
                    <span className="text-orange-500 font-black mr-3 text-sm">
                      +91
                    </span>
                    <input
                      autoFocus
                      type="tel"
                      value={mobile}
                      onChange={handleMobileChange}
                      onKeyDown={(e) => handleKeyDown(e, handleSendOtp)}
                      placeholder="Mobile Number"
                      className="bg-transparent w-full text-sm font-bold focus:outline-none text-white placeholder:text-white/20 tracking-widest"
                    />
                    {isValidMobile && (
                      <CheckCircle2 size={18} className="text-orange-500" />
                    )}
                  </div>

                  <div
                    className="flex items-center gap-3 px-1 group cursor-pointer"
                    onClick={() => setAcceptedTerms(!acceptedTerms)}
                  >
                    <div
                      className={`shrink-0 w-4 h-4 rounded border transition-all flex items-center justify-center ${acceptedTerms ? "bg-orange-500 border-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]" : "border-white/30 bg-white/5 group-hover:border-white/50"}`}
                    >
                      {acceptedTerms && (
                        <CheckCircle2
                          size={12}
                          className="text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                    <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider select-none whitespace-nowrap">
                      I accept all{" "}
                      <span className="text-white underline underline-offset-2">
                        Terms & Conditions
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={handleSendOtp}
                    disabled={!isValidMobile || !acceptedTerms || loading}
                    className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl ${
                      isValidMobile && acceptedTerms
                        ? "bg-orange-600 text-white hover:bg-orange-500"
                        : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                    }`}
                  >
                    {loading ? (
                      <RefreshCw className="animate-spin" size={16} />
                    ) : (
                      <>
                        Get OTP <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between gap-3">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={data}
                        onKeyDown={(e) => {
                          // Existing Enter Key Logic
                          if (e.key === "Enter")
                            handleKeyDown(e, handleVerifyOtp);

                          // --- BACKSPACE LOGIC START ---
                          if (e.key === "Backspace") {
                            if (!otp[index] && index > 0) {
                              // Agar current box khali hai, pichle box par jao
                              const newOtp = [...otp];
                              newOtp[index - 1] = ""; // Pichle box ko khali karo
                              setOtp(newOtp);
                              inputRefs.current[index - 1].focus();
                            } else {
                              // Current box ko khali karo
                              const newOtp = [...otp];
                              newOtp[index] = "";
                              setOtp(newOtp);
                            }
                          }
                          // --- BACKSPACE LOGIC END ---
                        }}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (isNaN(v)) return;
                          const newOtp = [...otp];
                          newOtp[index] = v.substring(v.length - 1);
                          setOtp(newOtp);
                          if (v && index < 3)
                            inputRefs.current[index + 1].focus();
                        }}
                        className="w-full h-12 text-center text-xl font-black bg-white/10 border border-white/20 focus:border-orange-500 rounded-xl transition-all outline-none text-white focus:bg-white/20"
                      />
                    ))}
                  </div>
                  <div className="space-y-4">
                    <button
                      onClick={handleVerifyOtp}
                      disabled={loading}
                      className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 flex items-center justify-center"
                    >
                      {loading ? (
                        <RefreshCw className="animate-spin" size={16} />
                      ) : (
                        "Verify Access"
                      )}
                    </button>
                    <div className="flex justify-between items-center px-1">
                      <button
                        onClick={() => setStep(1)}
                        className="text-white/40 font-bold text-[10px] uppercase flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <ChevronLeft size={14} /> Back
                      </button>
                      <button
                        disabled={!canResend}
                        className={`font-black text-[10px] uppercase tracking-tighter ${canResend ? "text-orange-500 underline underline-offset-4" : "text-white/20"}`}
                      >
                        {canResend ? "Resend" : `Wait ${timer}s`}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="absolute bottom-8 z-10 text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">
        Mahakal Digital Community
      </p>
    </div>
  );
};

export default Login;
