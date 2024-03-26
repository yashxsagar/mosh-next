import React from "react";

//This is a React component that will be rendered if the user tries visit a page route that is not defined
// interface Props {
//   params: { slug: string[] };
// }
// interface Props {
//   id: string;
// }
const UserNotFoundPage = () => {
  return (
    <div className="text-center text-4xl text-fuchsia-600">
      404: The requested <u>User</u> is Not Found
    </div>
  );
};

export default UserNotFoundPage;
