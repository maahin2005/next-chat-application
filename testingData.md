{
"name":"Mahin",
"username":"mahin@123",
"email":"mahin@gmail.com",
"password":"123"
}

{
"name":"Angel",
"username":"angel@123",
"email":"angel@gmail.com",
"password":"123"
}

{
"name":"Nobara",
"username":"nobara@123",
"email":"nobara@gmail.com",
"password":"123"
}

{
"name":"Sukuna",
"username":"sukuna@123",
"email":"sukuna@gmail.com",
"password":"123",
"role":"Admin"
}

{
"name":"Saturo Gojo",
"username":"saturo@123",
"email":"saturo@gmail.com",
"password":"123",
"role":"Creater"
}

Nobara token ->eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzE3ZTc5YjdlOTIxMTljYTkwY2JhNyIsInVzZXJuYW1lIjoibm9iYXJhQDEyMyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTczNTQ5MTIxMSwiZXhwIjoxNzM1NTc3NjExfQ.Y-W_ObkOsCN7i7jXIlN2fybkV1mjxSojsmrqmVcmRGc

sukuna token -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjUxNTVlNzEwMDQyYzdlMjgzYTNkMyIsInVzZXJuYW1lIjoic3VrdW5hQDEyMyIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzM0Njc3OTQwLCJleHAiOjE3MzQ3NjQzNDB9.S1MsASz0kZoy2h-pdUP-yZO-8Zy2qt7cXIbIbtkJpYE

saturo -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjUxNzBkOGE2ODJkMzllZjdlMGVmOCIsInVzZXJuYW1lIjoic2F0dXJvQDEyMyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTczNDc4MTgyNywiZXhwIjoxNzM0ODY4MjI3fQ.GUesDjnPHYvo-FNrveu1ENvI1LhL-HAF4OTv1ogC6EM

route.ts - nextauth

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // For password hashing
import jwt from "jsonwebtoken";

const handler = NextAuth({
providers: [
// Google Provider
GoogleProvider({
clientId: process.env.GOOGLE_ID,
clientSecret: process.env.GOOGLE_SECRET,
}),

    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your own user fetching logic
        const user = await getUserByEmail(credentials.email); // Fetch user by email from DB

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        // Return user object on successful login
        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),

],
secret: process.env.NEXTAUTH_SECRET,
session: {
strategy: "jwt",
},
callbacks: {
async jwt({ token, user, account }) {
if (user) {
token.id = user.id;
token.role = user.role; // Add custom claims
}
return token;
},
async session({ session, token }) {
session.user.id = token.id;
session.user.role = token.role;
return session;
},
},
});

export { handler as GET, handler as POST };

### Good method

`
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserModel from "@/Models/users.model";

export async function GET(req) {
try {
await connectDB();
const { searchParams } = new URL(req.url);
const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Check if the username exists in the database
    const user = await UserModel.findOne({ username });

    if (user) {
      return NextResponse.json({ exists: true ,
        canTaken: false,
         msg:"Oops! This one's already taken. Try something unique and awesome!"}, { status: 200 });
    }

    return NextResponse.json({ exists: false , canTaken: true,
        msg:"Awesome! This username is yours to claim."
    }, { status: 200 });

} catch (error) {
console.error("Error checking username:", error);
return NextResponse.json(
{ error: "Internal Server Error" },
{ status: 500 }
);
}
}

## `

Login page ak code

{/_ <AuthNav /> _/}

      {/* Main Content */}
      {/* <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto p-4 w-full">
          <div className="bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="gap-2 text-4xl items-center font-kanit hidden md:flex">
              <AiOutlineWechatWork className="text-blue-600" />
              <h1>LetsChat.io</h1>
            </div>

            <div className="w-full md:w-1/2 max-w-md">
              <div className="text-4xl font-bold text-gray-800 mb-6 text-center">
                Login<span className="text-blue-600">#</span>
              </div>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Username
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="username"
                      placeholder="username"
                      className="w-full border-b border-gray-300 bg-transparent px-3 py-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      className="w-full border-b border-gray-300 bg-transparent px-2 py-2 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </form>

              <div className="flex items-center my-4">
                <div className="w-full border-t border-gray-300"></div>
                <span className="px-2 text-gray-500 text-sm">or</span>
                <div className="w-full border-t border-gray-300"></div>
              </div>

              <div className="flex justify-center">
                <GoogleButton onClick={() => signIn("google")} />
                <button onClick={() => signOut()}>Sign Out</button>
              </div>

              <div className="mt-6 text-sm text-center space-y-2">
                <Link
                  href="/auth/signup"
                  className="text-blue-600 hover:underline transition duration-300"
                >
                  Sign Up
                </Link>
                <br />
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:underline transition duration-300"
                >
                  Forgot Password?
                </Link>
                <br />
                <Link
                  href="/help"
                  className="text-blue-600 hover:underline transition duration-300"
                >
                  Need help getting started?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main> */}

---

side line or code

{/\_ <div className="text-white h-[80vh]">

<div className="h-8 w-8 bg-gray-400 rounded-full"></div>
<div className="h-[35%] my-5 border-r-2 m-auto border-gray-400 w-0"></div>
<p className="text-center text-sm text-gray-300">OR</p>
<div className="h-[35%] my-5 border-r-2 m-auto border-gray-400 w-0"></div>
</div> _/}
{/_ </div> _/}
