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

`
