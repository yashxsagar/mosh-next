// Here we mimic the users page, perform an async data fetch and transcribe the data in the Daisy UI's table component
import React, { Fragment, Suspense } from "react";
// const Joi = require("joi");
import UserTable2 from "./UserTable2";
import Link from "next/link";
import { Metadata } from "next";
import { sortedData } from "./UserTable2";
// import Joi, { Schema } from "joi";
// const schema = Joi.string().lowercase().required();
// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
// }
interface Props {
  //Remember we cannot access query string parameters or route parameters inside of a component module but only within a page.tsx route
  searchParams: { sortOrder: "id" | "name" | "email" | "username" };
}
const UsersTableSort = async ({ searchParams: { sortOrder } }: Props) => {
  // Now transferring the fetch logic as well to the UserTable Next.js component
  //   const response = await fetch("https://jsonplaceholder.typicode.com/users", {
  //     cache: "no-store",
  //   });
  //   const data: User[] = await response.json();
  //Just adding a checkpoint to see whether the sortOrder prop/querystring search params is working or not?
  console.log(sortOrder);
  return (
    <Fragment>
      <div>UsersTableSort</div>
      <div className="text-center">
        <h1 className="text-3xl text-violet-500 underline m-10">
          {" "}
          Users Table
        </h1>
        {/* Let's demo the notion of programmatic navigation in comparison with client-side navigation */}
        {/* Lets make the below link look like a button */}
        <Link href="/users/new" className="btn">
          New User
        </Link>
        {/* Now trasnferring the Table UI element as a separate Next.js component that is co-located in this same route's directory */}
        {/* <table className="table flex flex-col">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        {/* Now we just add the <UserTable> abstracted out and and encapsulated component here */}
        {/* We can grab the below UsersTable2 in a suspense component and show a fall-back UI while this component is being loaded */}
        <Suspense fallback={<p>Loading...</p>}>
          <UserTable2 sortOrder={sortOrder} />
        </Suspense>
        {/* Once a component has been surrounded within a <Suspense> block and you inspect it using Chrome Dev Tools, then within the network tab the main page that is returned, the preview of it shows the Loading UI animation which in this case is the <p>Loading...</p> ReaactNode type content. This is what the client will initially see. The server generates the /userstablesort page and sends it to the client but it doesn't terminate the request/response lifecycle. It will wait for the UserTable2 table to render and then it will send additional data back to the client. This concept of sending an initial response to th client but keeping the request/response lifecycle open for future data refreshes is called Streaming. */}
      </div>
    </Fragment>
  );
};

export default UsersTableSort;

export async function generateMetadata({
  searchParams: { sortOrder },
}: Props): Promise<Metadata> {
  return {
    title: "Sorted Users Table",
    description: sortOrder,
    keywords: sortedData.map((u, index) => {
      return `${index}. ${u.name}`;
    }),
  };
}
