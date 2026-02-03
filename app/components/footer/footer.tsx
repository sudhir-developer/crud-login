"use client";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";



const Footer= ()=>{
   const { user, authLoading, logout } = useContext(AuthContext);
   const router = useRouter();
   if (authLoading) {
   return null; 
   }
    return(
       <div className="footer">
       {user ? (
        <>
         <span className="welcome">Welcome, <span className="username">{user.name}</span></span>
          <button className="logout_btn" onClick={() => {
            logout();
            router.push("/login");
          }}>
            Logout
          </button>
        </>
      ) : (
        <button className="logout_btn" onClick={() => router.push("/login")}>
          Login
        </button>
      )}
       </div>
    )
   
   }
   
   export default Footer;