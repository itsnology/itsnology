// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectMongo from "../../../database/conn";
// import Users from "@models/User";
// import { compare } from "bcryptjs";

// export default NextAuth({
//    providers: [
//       // Google Provider

//       CredentialsProvider({
//          name: "Credentials",
//          async authorize(credentials, req) {
//             connectMongo().catch((error) => {
//                error: "Connection Failed...!";
//             });

//             // check user existance
//             const result = await Users.findOne({ email: credentials.email });
//             if (!result) {
//                throw new Error("No user Found with Email Please Sign Up...!");
//             }

//             // compare()
//             const checkPassword = await compare(
//                credentials.password,
//                result.password
//             );

//             // incorrect password
//             if (!checkPassword || result.email !== credentials.email) {
//                throw new Error("Username or Password doesn't match");
//             }

//             return result;
//          },
//       }),
//    ],
//    secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
//    session: {
//       strategy: "jwt",
//    },
// });

import NextAuth from "next-auth";
import Users from "@models/User.js";
import { connectDB } from "@utils/database";

const handler = NextAuth({
   callbacks: {
      async session({ session }) {
         // store the user id from MongoDB to session
         const sessionUser = await Users.findOne({ email: session.user.email });
         session.user.id = sessionUser._id.toString();

         return session;
      },
      async signIn({ profile }) {
         try {
            await connectDB();

            // check if user already exists
            const userExists = await Users.findOne({ email: profile.email });

            // if not, create a new document and save user in MongoDB
            if (!userExists) {
               await Users.create({
                  email: profile.email,
                  username: profile.name.replace(" ", "").toLowerCase(),
                  image: profile.picture,
               });
            }

            return true;
         } catch (error) {
            console.log("Error checking if user exists: ", error.message);
            return false;
         }
      },
      async redirect({ url, baseUrl }) {
         // specify the URL to redirect to after a successful sign-in
         return url.startsWith(baseUrl) ? url : "/";
      },
   },
});

export { handler as GET, handler as POST };
