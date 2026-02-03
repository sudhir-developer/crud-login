"use client";

import { useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductList({ products }: { products: Product[] }) {
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <>
    <div className="newcontainer">
      {products.slice(0, visibleCount).map((pro, index) => (
        <div key={pro.id}  className="productbox">
            <Image
            src={pro.images[0]}
            alt={pro.title}
            width={200}
            height={200}
            fetchPriority={index === 0 ? "high" : "auto"}
            priority={index === 0}
            sizes={index === 0 ? "(max-width: 768px) 100vw, 300px" : "(max-width: 768px) 50vw, 200px"}
            loading={index === 0 ? "eager" : "lazy"}
            // placeholder={index === 0 ? "empty" : "blur"}
            // blurDataURL="/small-placeholder.webp"
          />
          {index === 0 ? <h1>{pro.title}</h1> : <h2>{pro.title}</h2>}
          <p>${pro.price}</p>
        </div>
      ))}
     </div>
      {/* loadmore button */}
      <div style={{textAlign:'center'}}>
            <button onClick={() => setVisibleCount(visibleCount + 6)} disabled={visibleCount >= products.length}
            style={{
                padding: "10px 20px",
                cursor: visibleCount >= products.length ? "not-allowed" : "pointer",
                background: visibleCount >= products.length ? "#696969" : "#f00",
                color: "#fff",
                marginBottom:'30px',
                borderRadius:'10px'
            }}
            >
            {visibleCount >= products.length ? "No More" : "Load More"}
            </button>

      </div>

      </>
  );
}
