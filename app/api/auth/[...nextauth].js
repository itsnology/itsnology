import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "@models/User";
import { compare } from "bcryptjs";

export default NextAuth({
   providers: [
      // Google Provider

      CredentialsProvider({
         name: "Credentials",
         async authorize(credentials, req) {
            connectMongo().catch((error) => {
               error: "Connection Failed...!";
            });

            // check user existance
            const result = await Users.findOne({ email: credentials.email });
            if (!result) {
               throw new Error("No user Found with Email Please Sign Up...!");
            }

            // compare()
            const checkPassword = await compare(
               credentials.password,
               result.password
            );

            // incorrect password
            if (!checkPassword || result.email !== credentials.email) {
               throw new Error("Username or Password doesn't match");
            }

            return result;
         },
      }),
   ],
   secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
   session: {
      strategy: "jwt",
   },
});
