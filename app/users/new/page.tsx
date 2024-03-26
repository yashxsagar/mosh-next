"use client";
// import { Router, useRouter } from "next/router";
import { useRouter } from "next/navigation";
import React from "react";

const NewUserPage = () => {
  //   const router = useRouter();
  //   This is not going to work as in Next.js 13 and onwards we've migrated to the pages based router
  //   So, when importing this hook always import it from next/navigation
  const router = useRouter();
  return (
    <div>
      <h1>NewUserPage</h1>
      {/* Let's demo the notion of programmatic navigation which happens on a button click in comparison with client-side navigation which happens using the /next/link component in Next.js*/}
      <button
        className="btn btn-primary"
        onClick={() => {
          router.push("/userstablesort");
        }}
      >
        Create
      </button>
      {/* To handle the click event of a button, we need to add user-interactibvity by converting this component into a CSR component */}
    </div>
  );
};

export default NewUserPage;
