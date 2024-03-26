"use client"; //With this statement we tell our Next.JS compiler to include this file in our JS bundle. if this component is dependant on other compnents, then those components will automatically be included in our JS bundle. There is no need to repeat this step
//But there is a better way than the above 'use client' directive. To make our apps faster and more search engine friendly, we want to render our components on the server as much as possible and use client components when absolutely  necessary
import React from "react";
//SSR components cannot have interactivity. They cannot handle browser events such as click, change, focus, hover and so on
const ProductCard = () => {
  return (
    // If we add a button here and handle a click event, we will get a runtime error. To resolve this we can convert this entire component to  a client component
    <div>
      <button onClick={() => console.log("Clicked!")}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
