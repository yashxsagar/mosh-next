import { notFound } from "next/navigation";
import React, { Fragment } from "react";
//To access the relevant route paramater that the user is requesting/accessing we need to define props here -->
//This is the way to access route parameters and query strings in a Next.js application where there is a unified backend and front-end
//We don't have to create a dedicated route using an Express.js backend (such as, app.get('/users/:id', (req,res)=>{console.log(parseInt(req.params.id))}) and then fetch the route parameter using the async fetch function in the front-end React component
interface Props {
  params: { id: number };
}
const UserDetailPage = ({ params: { id } }: Props) => {
  //Think of this as the slot where the layout.tsx inserts the page/resource requested by the client as a prop which in this case is the http://localhost:3000/users/[id:number]
  let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (!(id in ids)) {
    return notFound(); //This will now reference the local not-found.tsx page that is scoped to this particular route/end-point's directory
  }
  return (
    <Fragment>
      <div>UserDetailPage</div>
      <div className="alert alert-success">User Id: {id}</div>
    </Fragment>
  );
};

export default UserDetailPage;
