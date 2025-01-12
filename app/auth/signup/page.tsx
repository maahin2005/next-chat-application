"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import SignupFormStepOne from "@/components/authentication/signup/SignupFormStepOne";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SimpleSpinner from "@/components/loading/SimpleSpinner";

const Signup: React.FC = () => {
  
const { data: session, status } = useSession();
const [isAPICalled, setIsAPICalled] = useState(false);
const router = useRouter();

const [loading,setLoading] = useState(false);

const signup = async (userData:any) => {
  console.log("HIIIIIIIIIIIIIII");
  setLoading(true)
  try {

    setIsAPICalled(true);
    const res = await axios.post("/api/users/google-provider", userData);

    if(res.data.success) {
      alert(res.data.msg);

      router.push("/dashboard");
      setLoading(false)
    }

  } catch (error) {
    console.error("Signup error:", error);
    setLoading(false)
  }
};

const handleAuthByGoogle = async () => {
  try {
    await signIn("google");
  } catch (error) {
    console.error("Google auth error:", error);
  }
};

useEffect(() => {
  if (session && session?.user && status === "authenticated") {
    const userData = {
      name: session?.user?.name,
      email: session?.user?.email,
      profileImage: session?.user?.image,
    };
    if(!isAPICalled){
      signup(userData);
    }
  }

  const storedData = localStorage.getItem("signup-email");
  
    if (storedData && JSON.parse(storedData).verifiedEmail) {
      router.push("/auth/signup/build-profile");
    }
}, [session, status,router]);

  return (
    <>
      <div className="relative bg-slate-950 min-h-fit">
        <div className="hidden md:inline-block absolute border-t-white  border-t-2 w-[80%] top-[13%] left-[14%]"></div>
        <div className="flex md:flex-row flex-col h-fit md:h-[700px] min-h-screen">
          <div className="md:w-[42%] lg:w-1/3 p-3 md:p-5 flex flex-col md:bg-opacity-70">
            <div className="border-l-2 ml-[1%] p-3 border-white md:m-auto">
              <div>
                <header className="text-white">
                    <h1 className="text-7xl font-bold">Letschat</h1>
                  <p className=" text-gray-400 mt-2">START FOR FREE</p>
                  <h2 className="text-4xl font-bold mt-2">
                    Create new account<span className="text-blue-500">.</span>
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
                  <Link
                    href="/"
                    className=" text-blue-600 underline hover:no-underline text-sm"
                  >
                    <span className="text-sm font-bold">GO BACK</span>
                  </Link>
                </header>
              </div>
            </div>
          </div>
          <div className="text-white my-auto h-[90vh] hidden md:inline-block">
            <div className="h-[40%] my-5 border-r-2 m-auto border-white w-0"></div>
            <div className="h-8 w-8 bg-white rounded-full"></div>
            <div className="h-[40%] my-5 border-r-2 m-auto border-white w-0"></div>
          </div>
          <div className="flex-1 md:ml-10 md:pl-5 my-auto">
            <div className="m-auto my-10 md:m-0 w-[90%] md:w-[85%] lg:w-[58%]">
              <SignupFormStepOne />
              <div className="flex justify-center items-center gap-4 my-8">
                <div className="h-2 border-b-2 border-gray-400 w-1/2"></div>
                <p className="text-sm text-gray-300">OR</p>
                <div className="h-2 border-b-2 border-gray-400 w-1/2"></div>
              </div>
              <button
                className="my-3 transition-colors font-kanit text-lg tracking-wide bg-slate-200 text-black flex justify-center items-center gap-3 hover:text-white w-full m-auto hover:bg-transparent border-gray-200 rounded-full border-2 h-10 p-3"
                onClick={handleAuthByGoogle}
              >
                 {loading?<>
                  <SimpleSpinner/>
                  Navigating you to your dashboard
                 </>
                 :<>
                  <FcGoogle className="text-2xl " />
                  {session?.user?"Please wait...":"Continue with Google"}
                 </>
                  }
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:inline-block absolute border-t-white  border-t-2 w-[50%] bottom-[15%] left-[2%]"></div>
      </div>
    </>
  );
};

export default Signup;
