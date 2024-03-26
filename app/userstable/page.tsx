"use client";
// Say this page route is meant to feature a very heavy component that is to be loaded conditionally on a button click rather than on  the initial page load on the client's browser

// Here we mimic the users page, perform an async data fetch and transcribe the data in the Daisy UI's table component

import React, { Fragment, useState } from "react";
// const Joi = require("joi");
import UserTable from "./UserTable";
// import MyHeavyComponent from "../components/HeavyComponent";//We no lionger need to statically import this component into our page route. So let's dynamically import it at run time user-interactivity
// import _ from "lodash"; //the default convention for importing from the lodash library
//We get rid of the import statement to lodash module since we are lazy loading it on the button click user interaction below
import dynamic from "next/dynamic";
import { LoDashStatic } from "lodash";
const HeavyComponent = dynamic(() => import("../components/HeavyComponent"), {
  loading: () => {
    return <p>Loading...</p>;
  },
  ssr: false, //This disables pre-rendering on the server and is a fail-safe for in case you are trying to access certain browser APIs on the server they may not be available leading to errors
});
//We have several properties we can toggle/set as an options object passed to the dynamic () function for dynamically loading components based on user-interactivity on ta page route/end-point
//Note that we should use this technique only for large and heavy components

// import Joi, { Schema } from "joi";
// const schema = Joi.string().lowercase().required();
// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
// }
// const UsersTable = async () => {
// Now transferring the fetch logic as well to the UserTable Next.js component
//   const response = await fetch("https://jsonplaceholder.typicode.com/users", {
//     cache: "no-store",
//   });
//   const data: User[] = await response.json();
const UsersTable = () => {
  let [isVisible, setIsVisible] = useState(false);
  //Now we need to re-declare the UsersTable function as a non-async function is not imputed to render client-side so as to capture the show button's user-inetractivity
  return (
    <Fragment>
      <div>UsersTable</div>
      <div className="text-center flex flex-col items-center">
        <button
          className="btn block btn-outline btn-success"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          Show
        </button>
        {isVisible && <HeavyComponent />}
        {/* Say we have a button that is meant to sort a list of users upon the click of that buton */}
        <button
          className="btn btn-outline border-green-400 mt-3"
          onClick={async () => {
            const _: LoDashStatic = (await import("lodash")).default; //Now we dynamically import the lodash library into our browser making it download on button click thereby reducing drastically the default 'on load' page bundle
            const users = [
              { name: "Samosa", age: 5 },
              { name: "Yash Sagar Santani", age: 32 },
              { name: "Tamanna Narendra", age: 30 },
            ];
            const sortedUsers = _.orderBy(users, ["name"]);
            console.log(sortedUsers);
          }}
        >
          {" "}
          Sort Users
        </button>
        {/* With this way of importing lodash, once again we are including the entire lodash library into our page bundle by default which will slow down our user experience and overall app performance. So let's lazy load it */}
        {/* Although this 'MyHeavyComponent' is rendered conditionally, if you go to Dev Tools --> Network --> page.js --> Search 'Heavy' --> you'll find that Next.js has included this heavy component as part of our JS client bundle and sent it to the client browser by default. This is because this component is statically imported into the client side rendered page. To overcome this and fetch this HeavyComp on user interactivity we need to use the dynamic function that imports this component when needed and not as part of the default JS bundle for this page. To see the dynamic fn's usage see this page above */}
        <h1 className="text-3xl text-violet-500 underline m-10">
          {" "}
          Users Table
        </h1>
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
        <UserTable />
      </div>
    </Fragment>
  );
};

export default UsersTable;
