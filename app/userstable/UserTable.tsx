import React from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
const UserTable = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const data: User[] = await response.json();

  return (
    <table className="table flex flex-col">
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
    </table>
  );
};

export default UserTable;
