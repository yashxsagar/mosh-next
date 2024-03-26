//Now that the imported <Button> component is a child component we can remove the 'use client' directive from this component
// "use client"; //With this statement we tell our Next.JS compiler to include this file in our JS bundle. if this component is dependant on other compnents, then those components will automatically be included in our JS bundle. There is no need to repeat this step
//But there is a better way than the above 'use client' directive. To make our apps faster and more search engine friendly, we want to render our components on the server as much as possible and use client components when absolutely  necessary
import React from "react";
import AddToCart from "./AddToCart";
//SSR components cannot have interactivity. They cannot handle browser events such as click, change, focus, hover and so on
// Let's import the stylesheet that is customly defined for this page/component
import styles from "./ProductCard.module.css"; // All the classes defined in this custom CSS module are now properties of the styles object

const ProductCard = () => {
  return (
    // If we add a button here and handle a click event, we will get a runtime error. To resolve this we can convert this entire component to  a client component
    <div className={styles.cardContainer}>
      {/* So let's extract this button and place it in a separate component */}
      {/* <button onClick={() => console.log("Clicked!")}>Add to Cart</button> */}
      <AddToCart />
      {/* Basically we should choose CSR only for those ReactNode's JSX Markup/elements where client interactions need to be captured/recorded */}
      {/* //Where the client component is referenced to, Here there will be a hole or slot where React will later inject our client component which is sent in the JS bundle to the client <Add to Cart/> */}
    </div>
  );
};

export default ProductCard;
