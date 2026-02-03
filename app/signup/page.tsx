import SignupComponent from "../components/signup/signup";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Signup",
    description: "This is the Sign Up of my website",
  };
export default function Signup(){
    return(
        <>
        <SignupComponent/>
        </>
    )
}