"use client";

import Link from "next/link";

const THead = () => {
  return (
    <thead>
      <tr>
        <th>
          <Link href="userstablesort?sortOrder=id">Id</Link>
        </th>
        <th>
          <Link href="userstablesort?sortOrder=name">Name</Link>
        </th>
        <th>
          <Link href="userstablesort?sortOrder=username">Username</Link>
        </th>
        <th>
          <Link href="userstablesort?sortOrder=email">Email Address</Link>
        </th>
      </tr>
    </thead>
  );
};

export default THead;
