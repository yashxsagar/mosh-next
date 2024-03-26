//This is the page.tsx route for the home (/) page of our Next.JS application

import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import yash from "@/public/images/yash.jpeg";
import { Fragment } from "react";
import MyHeavyComponent from "./components/HeavyComponent";

export default async function Home() {
  const session = await getServerSession(); //This returns a promise that resolves into a copy of the authentication session's object
  //While calling the above session we have to pass our authentication options which we defined as an object while initializing our 'next-auth' route handler inside of /api/auth/[...nextauth] directory
  //So let's go to this route file

  return (
    <>
      <main className="flex flex-col items-center text-center">
        {/* Now say we want to conditionally render the user's name or Hello World depending on whether we have an active user authentication session or not */}
        <h1 className="text-pretty text-opacity-40 text-5xl">
          Hello {(session && <span>{session.user?.name!}</span>) || `World!`}
        </h1>
        {/* <a href="/users">Users</a> Not recommended usage as it's very network resource intensive */}
        <Link href="users">Users</Link>
        <ProductCard />

        {/* Say, we want to dispaly this heavy component conditionally at the click of a button rather than forcing the client browser to download all the components in this home page including this heavy component on first load itself */}

        {/* In Next.js we have a built-in <Image/> component that is built on top of the standard HTML <img> element. under the hood it automatically compresses and resizes our images based on the viewing device size. It has a few props such as src*/}
        {/* <Image
        // className="border rounded-lg"
        className="rounded-r-full rounded-t-full rounded-b-full rounded-l-full"
        width={100}
        height={100}
        src={yash}
        alt="developer-photo-round"
      ></Image> */}
        {/* With remote images,we should always specify their dimensions because Next.Js is not aware of them ahead of time */}
      </main>
      <footer className="relative h-screen">
        {/* //Furthermore the parent element of an Image which is styled to fill and object-cover should always have a set height attribute. This ensures that the Image component only occupies this encompassing container and not  the entire page dimensions*/}
        <Image
          // className="btn-circle btn-lg"
          src="https://bit.ly/react-cover"
          alt="react-cover-image"
          // width={300}
          // height={170}
          // If we want our images to be responsive and look great on all device sizes we can eliminate pre-defined static sizes and set the boolean prop fill
          fill={true} //Whenever we use the fill prop the parent element/encompassing containter should have the static set to absolute, fixed or realative always
          //Now while filling if we even want to retain the aspect ratio, there is a way top achieve that as well -->
          // style={{ objectFit: "cover" }} //Instead of using in-line styles, we can achieve the same effect by using Tailwind classes as well which is much more modular and user-frientdly to a code evaluator
          className="object-cover rounded-3xl"
          // sizes="50vw" //This determines how much of the width of the viewport is the rendered inage gouing to occupy
          quality={75} //A no between 1-100
          priority={true} //By default Next/Image has Lazy Loading, i.e., images are only retreieved from the backend/server once they are visible in the viewport. If we want the images to load by default on page load itself we can set this boolean property to true
        ></Image>
      </footer>
    </>
  );
}
