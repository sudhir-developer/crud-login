
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page of my website",
};

export default async function Home() {


  return (
    <>
    <div style={{padding:'20px'}}>
      <h1>Home Page</h1>
    </div>
    </>
  );
}

