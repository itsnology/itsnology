import RegisterForm from "@/components/RegisterForm";

import { redirect } from "next/navigation";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export default async function Register() {
   if (session) redirect("/");

   return <RegisterForm />;
}
