
import ProtectedRoute from "../components/protect/ProtectedRoute";
import UserComponent from "../components/userComponent";
import ProductList from "../components/productList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Page",
  description: "This is the home page of my website",
};

export default async function Home() {

const res = await fetch("https://dummyjson.com/products", {
  next: { revalidate: 3600 },cache: "force-cache",
});
const data = await res.json();

  return (
    <>
    <ProtectedRoute>
    <div style={{padding:'20px'}}>
    <ProductList products={data.products} />
    <hr/>
    <hr/>
    </div>
    <UserComponent/>
    </ProtectedRoute>
    </>
  );
}

