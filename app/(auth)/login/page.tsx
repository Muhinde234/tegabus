"use client"

import Input from "@/components/ui/inputField";
import Container from "../../../components/ui/container"
import Logo from "@/components/common/logo";

import Link from "next/link";
import { useForm } from "react-hook-form";

const LoginPage = () => {
 



  const {
    register,
    formState: { errors },
  } = useForm();

 

  return (
    <Container className="h-screen flex flex-col justify-center items-center mt-12">
  
      <div className="min-w-[540px] border border-gray-300 rounded-lg p-6">
        <div className="flex justify-center items-center gap-[16px]">
         <Link href="/">
          <Logo/>
         </Link>
        
         
        </div>
        <div className="flex flex-col justify-center items-center gap-[6px] mt-6">
          <h2 className="text-2xl font-extrabold">User Login</h2>
          <p className="text-neutral-90">Fill in your details to login</p>
        </div>
        <div className="border-t border-gray-200 my-4"></div>

       

        <form  className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="example@email.com"
            required
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
         
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
         
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
            <Link
              href="/forgot-password"
              className="hover:underline text-blue-600"
            >
              Forgot password?
            </Link>
            <span>
              Need an account?{" "}
              <Link href="/register" className="underline text-blue-600">
                Register
              </Link>
            </span>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-[#2356CF] text-white p-2 rounded-lg mt-2 hover:bg-[#1a4bb5] transition-colors cursor-pointer"
             
            >
            
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;



