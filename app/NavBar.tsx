"use client";
// import React from 'react'

import { useSession } from "next-auth/react";
import Link from "next/link";
import LoadingUI from "./loading";
import { Fragment } from "react";
import Image from "next/image";

//Now let's morph the status of the NavBar as per the value of the authorization/authentication session  fetched by the OAuth 2.0 Client provider (Say, Google, GitHub)

const NavBar = () => {
  // Let's use a hook -->
  const { status, data: session } = useSession(); //We use the useSession hook found in the "next-auth/react"//Since we are using this hook we have to make this component a client component as well because with this hook we access the react context object which is provided by the Session Provider

  //   if (status == "loading") return <p>Loading...</p>;
  //Let's place this inside of the NavBar so that the entire NavBar is not hidden while the 'next-auth' is validating the the veracity of the user request

  return (
    <div className="flex flex-row">
      <ul className="flex flex-row bg-slate-200 p-5 w-full">
        <li className="mr-5" key={1}>
          <Link href="/">Home</Link>
        </li>
        <li className="mr-5" key={2}>
          <Link href="/users">Users</Link>
        </li>
        <li className="mr-5" key={3}>
          <Link href="/userstablesort">Users-Table-Sort</Link>
        </li>
        <li className="mr-5" key={4}>
          <Link href="/products">Products</Link>
        </li>
        {/* <li className="mr-5" key={5}>
          <Link href="/api/auth/signin">Sign In</Link>
        </li> */}
        {/* Now we render 'Sign In' link and LogOut Logout Link  */}
        {/* Alternatively, we can place the <li> with the key={5} in a separaate component with the 'useClient'directive so as to make only this particular <li> */}

        <li className="ml-auto flex flex-row space-x-4" key={5}>
          {status === "loading" && <p>Loading...</p>}
          {status === "authenticated" && (
            <Fragment>
              {session.user?.image && (
                <Image
                  src={session.user?.image}
                  alt="Profile Image"
                  width={30}
                  height={30}
                  className="rounded-badge"
                ></Image>
              )}
              <p>{session.user?.name}</p>
              <Link href="/api/auth/signout">Logout</Link>
            </Fragment>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Sign In</Link>
          )}
        </li>
        {/* This Signout <li> is now rendered conditionally based on the value fetched by the useSession hook */}
        {/* <li className="ml-auto" key={6}>
          <Link href="/api/auth/signout">Logout</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default NavBar;
