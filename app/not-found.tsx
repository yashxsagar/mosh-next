import React from "react";

//This is a React component that will be rendered if the user tries visit a page route that is not defined
// interface Props {
//   params: { slug: string[] };
// }
const NotFoundPage = () => {
  return (
    <div className="text-center text-4xl text-fuchsia-600">
      404: The request page is Not Found
    </div>
  );
};

export default NotFoundPage;
