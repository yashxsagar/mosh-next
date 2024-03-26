// "use client";
import React from "react";
import { sort } from "fast-sort";
import THead from "./thead";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  sortOrder: "id" | "name" | "username" | "email";
}

export let sortedData: User[] = [];

const UserTable2 = async ({ sortOrder }: Props) => {
  // Now, let's try to induce an error by supplying an erronenous endpoint
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const data: User[] = await response.json();
  //  sortedData: User[] = [];

  if (sortOrder == "username") {
    sortedData = sort(data).asc((data) => data.username);
  } else if (sortOrder == "name") {
    sortedData = sort(data).asc((data) => data.name);
  } else if (sortOrder == "email") {
    sortedData = sort(data).asc((data) => data.email);
  } else {
    //This else fragment means that if the sortOrder is set to any value, even an invalid value we will by default sort by the id attribute/property of the fetched data
    sortedData = sort(data).asc((data) => data.id);
  }

  return (
    <table className="table flex flex-col">
      {/* Abstracting/Encapsulating out the <thead> in a separate client side so as to enable user interactivity module */}
      {/* <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email Address</th>
        </tr>
      </thead> */}
      <THead />
      <tbody>
        {sortedData.map((user, index) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable2;
