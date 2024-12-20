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

Nobara token -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjQyYmU4M2IwMDczZTJlNWFhMTAyOCIsInVzZXJuYW1lIjoibm9iYXJhQDEyMyIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzM0Njc1NjI1LCJleHAiOjE3MzQ3NjIwMjV9.exoxO_JPLN9n9mI1xl-91dQtkTz2a7E3M7TztX6MuQk

Angel token -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjQyYTFkM2IwMDczZTJlNWFhMTAyNCIsInVzZXJuYW1lIjoiYW5nZWxAMTIzIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE3MzQ2NzU2NjUsImV4cCI6MTczNDc2MjA2NX0.PiSubRoFY2r1NXRmGMw-Iv7sT_10e5eD7RPYmmEW5No

sukuna token -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjUxNTVlNzEwMDQyYzdlMjgzYTNkMyIsInVzZXJuYW1lIjoic3VrdW5hQDEyMyIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzM0Njc3OTQwLCJleHAiOjE3MzQ3NjQzNDB9.S1MsASz0kZoy2h-pdUP-yZO-8Zy2qt7cXIbIbtkJpYE

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
