import React, { Fragment } from "react";
//rafce --> React Arrow Function Component with an Export
interface User {
  id: number;
  name: string; //you may declare the type of a few or all properties or key:valeu pairs
}
//Here we'll perform server side data fetching
const UsersPage = async () => {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/users"); //With this approach we don't have to use the state hook or the effect hook with 0 dependancies
  //Now let's alter the caching behavior -->
  //   const response = await fetch("https://jsonplaceholder.typicode.com/users", {
  //     cache: "no-store", //this will ensure that the data is always fetched fresh from this API end-point
  //   });
  //   const response = await fetch("https://jsonplaceholder.typicode.com/users", {
  //     next: { revalidate: 10 }, //this will ensure that the data is re-fetched every 10 s //This caching behavior is only implemented in the fetch function. if you use a 3rd party data fetching library such as axios or React Query, you won't have access to the cache
  //   });

  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store", //Now let's disable caching and re-build this app for production
  });
  const users: User[] = await response.json();
  return (
    <Fragment>
      <div className="text-center">UsersPage</div>
      <div>
        <h1 className="text-5xl text-violet-500 text-center underline m-12">
          Users Info
        </h1>
        {/* Let's demo Dynamic Rendering or Rendering at request time */}
        <p> {new Date().toLocaleTimeString()}</p>
        {/* Now that we have disabled caching in the fetch fn above, this time stamp will change on every page refresh */}
        {/* You will see the timestamp change on every refresh in dev mode. But if we buld this application in production mode the timestamp will be fixed/static because Next.js will treat this page as a static page. By default whenever we use the  fetch function in a component/page, Next.js will cache the data so it treats our data as static. But If we disable caching, next.js thinks that the data on this page will change so it's not goping to render this page statically rather dynamnically at request time */}
        <ul className="text-fuchsia-400 text-center list-none m-12 flex-col">
          {users.map((user, index) => (
            <li key={user.id}>
              {index + 1}. {user.name}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default UsersPage;
