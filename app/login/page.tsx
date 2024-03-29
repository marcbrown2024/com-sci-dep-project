"use client";

// React components
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// Components
import { useAuth } from "@/context/AuthContext";
import LoggingInLoading from "@/components/global/LoggingInLoading";

// Assets
import logo from "../../public/assets/shawlogin.png";
import ShawU from "../../public/assets/ShawUSign.jpg";

// icons
import { HiAtSymbol } from "react-icons/hi2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type Props = {};

const Login = (props: Props) => {
  const { setLoading2 } = useGlobalLoading();
  const { isOpen, setTranslateAlert } = useGlobalAlert();
  const { login, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    logEmail: "",
    logPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.logEmail, formData.logPassword);
      setTranslateAlert(true, "Successfully logged in", "success");
    } catch (err) {
      if (err instanceof Error) {
        setTranslateAlert(true, "Invalid login credentials", "error");
        setTimeout(() => {
          setLoading2(true, 0, 1000);
          setFormData({
            logEmail: "",
            logPassword: "",
          });
        }, 4000);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading2(true, 0, 1000);
      setFormData({
        logEmail: "",
        logPassword: "",
      });
    }
  }, [setFormData, setLoading2, user]);

  useEffect(() => {
    if (user && !isOpen) {
      router.push("/");
    }
  }, [router, user, isOpen]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black">
      <LoggingInLoading />
      <div className="absolute h-screen w-screen flex items-center justify-center z-0">
        <Image
          src={ShawU}
          alt="logo"
          priority
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-[33rem] w-[20rem] md:h-[35rem] md:w-[26rem] flex flex-col items-center justify-between bg-[#fefefe] rounded-xl z-40">
        <div className="h-2/6 w-full flex items-center justify-center">
          <Image src={logo} alt="logo" className="w-4/6 h-auto" priority />
        </div>
        <div className="h-1/6 w-full flex flex-col items-center justify-start text-3xl sm:text-4xl text-[#8c2333] font-sans font-bold mb-1">
          <h1>Department of</h1>
          <div>Computer Science</div>
        </div>
        <div className="h-3/6 w-full flex flex-col items-center justify-center gap-8 bg-[#8c2333] rounded-b-xl">
          <form
            onSubmit={handleLogin}
            className="w-5/6 flex flex-col items-center justify-center gap-6 rounded-b-xl"
          >
            <label htmlFor="logEmail" className="group w-full flex">
              <input
                className="w-full text-[#fff] bg-transparent p-4 border-b border-gray-300 placeholder:text-white/75 focus:placeholder:text-white outline-none"
                type="email"
                id="logEmail"
                name="logEmail"
                autoComplete="on"
                placeholder="Email"
                required
                value={formData.logEmail}
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    logEmail: e.target.value,
                  }))
                }
              />
              <span className="flex items-center justify-center text-xl -ml-8 cursor-pointer group">
                <HiAtSymbol className="flex items-center justify-center text-xl text-white opacity-50 transition-opacity duration-100 group-focus-within:opacity-100" />
              </span>
            </label>
            <label htmlFor="logPassword" className="group w-full flex">
              <input
                className="w-full text-[#fff] bg-transparent p-4 border-b border-gray-300 placeholder:text-white/75 focus:placeholder:text-white outline-none"
                type={`${showPassword ? "text" : "password"}`}
                id="logPassword"
                name="logPassword"
                placeholder="Password"
                autoComplete="off"
                required
                value={formData.logPassword}
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    logPassword: e.target.value,
                  }))
                }
              />
              <span
                className="flex items-center justify-center text-xl -ml-8 cursor-pointer group"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="flex items-center justify-center text-xl text-white opacity-50 transition-opacity duration-100 hover:opacity-100" />
                ) : (
                  <AiFillEye className="flex items-center justify-center text-xl text-white opacity-50 transition-opacity duration-100 hover:opacity-100" />
                )}
              </span>
            </label>
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                type="submit"
                className="disabled:opacity-50 w-28 h-12 flex items-center justify-center text-md text-[#000] font-semibold bg-[#fff] rounded-md p-4 hover:bg-[#f6f6f6] hover:scale-95 cursor-pointer "
                disabled={
                  !formData.logEmail.includes("@") ||
                  !formData.logEmail.includes("shawu.edu") ||
                  formData.logPassword.length < 8
                }
              >
                Sign In
              </button>
              <div
                className="text-sm text-[#fff] hover:underline cursor-pointer"
                onClick={() => (
                  router.push("/forgotPassword"), setLoading2(true, 0, 500)
                )}
              >
                Forgot Password
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
