import { connectDB } from "@utils/database";
import User from "@models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {},

         async authorize(credentials) {
            const { email } = credentials;

            try {
               await connectDB();
               const user = await User.findOne({ email });

               if (!user) {
                  return null;
               }

               return user;
            } catch (error) {
               console.log("Error: ", error);
            }
         },
      }),
   ],
   session: {
      strategy: "jwt",
   },

   secret: process.env.NEXTAUTH_SECRET,
   pages: {
      signIn: "/",
   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import User from "@models/User.js";
// import { connectDB } from "@utils/database";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
// providers: [
//    CredentialsProvider({
//       name: "credentials",
//       credentials: {
//          email: { label: "Email", type: "email" },
//          name: { label: "Name", type: "text" },
//          number: { label: "Number", type: "number" },
//       },

//       async authorize(credentials) {
//          const { email, name, number } = credentials;

//          try {
//             await connectDB();
//             const user = await User.findOne({ email });

//             if (!user) {
//                return null;
//             }

//             return user;
//          } catch (error) {
//             console.log("Error: ", error);
//          }
//       },
//    }),
// ],
//    callbacks: {
//       async session({ session }) {
// store the user id from MongoDB to session
//          const sessionUser = await User.findOne({ email: session.user.email });
//          session.user.id = sessionUser._id.toString();

//          return session;
//       },
//       async signIn({ profile }) {
//          try {
//             await connectDB();

//             // check if user already exists
//             const userExists = await User.findOne({ email: profile.email });

//             // if not, create a new document and save user in MongoDB
//             if (!userExists) {
//                await User.create({
//                   email: profile.email,
//                   name: profile.name,
//                   number: profile.number,
//                   image: profile.picture,
//                });
//             }

//             return true;
//          } catch (error) {
//             console.log("Error checking if user exists: ", error.message);
//             return false;
//          }
//       },
//       async redirect({ url, baseUrl }) {
//          // specify the URL to redirect to after a successful sign-in
//          return url.startsWith(baseUrl) ? url : "/";
//       },
//    },
// });

// export { handler as GET, handler as POST };
