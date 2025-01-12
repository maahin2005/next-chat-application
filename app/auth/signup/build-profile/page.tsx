"use client"

import React, { useEffect } from 'react'
import SignupFormStepTwo from '@/components/authentication/signup/SignupFormStepTwo';
import { useRouter } from 'next/navigation';

function profileBuilder() {
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("signup-email");
    if (!storedData) {
      router.push("/auth/signup");
    }
  }, [])
  return (
    <div className="relative bg-slate-950 min-h-fit">
              <div className="hidden md:inline-block absolute border-t-white  border-t-2 w-[80%] top-[13%] left-[14%]"></div>

    <div className="flex h-fit min-h-screen bg-slate-950">
      <div className="md:w-[42%] lg:w-1/3 p-3 md:p-5 flex flex-col md:bg-opacity-70">
            <div className="border-l-2 ml-[1%] p-3 border-white md:m-auto">
              <div>
                <header className="text-white">
                    <h1 className="text-7xl font-bold">Letschat</h1>
                  <p className=" text-gray-400 mt-2">START FOR FREE</p>
                  <h2 className="text-4xl font-bold mt-2">
                    Build your<span className="text-blue-500">.</span>
                  </h2>
                  <p className="text-sm text-gray-500 my-1">
                    Already a member?{" "}
                    <a
                      href="/auth/login"
                      className="text-blue-500 hover:underline"
                    >
                      Log In
                    </a>
                  </p>
                </header>
              </div>
            </div>
          </div>
          <div className="text-white my-auto h-[90vh] hidden md:inline-block">
            <div className="h-[40%] my-5 border-r-2 m-auto border-white w-0"></div>
            <div className="h-8 w-8 bg-white rounded-full"></div>
            <div className="h-[40%] my-5 border-r-2 m-auto border-white w-0"></div>
          </div>
    <div  className="flex-1 md:ml-10 md:pl-5 my-auto">

        <div className="m-auto md:m-0 my-10 w-[90%] md:w-[85%] lg:w-[58%]">
          <SignupFormStepTwo />
        </div>
    </div>
  </div>
  <div className="hidden md:inline-block absolute border-t-white  border-t-2 w-[50%] bottom-[15%] left-[2%]"></div>

  </div>
  )
}

export default profileBuilder