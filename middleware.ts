import middleware from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

//We now longer need the below custom middleware function because 'next-auth' has a built in default middle-ware function which we can import and it automatically redirects to the end-point /api/auth/signin
// export function middleware(request: NextRequest) {
//   //   return NextResponse.redirect(new URL("/new-page", request.url)); //Now if we make a get/post request to any page we will get redirected to this /new-page route. Even for requests made to API route resources
// //   return NextResponse.redirect("https://localhost:3000/api/auth/signin");
// }

// Now to make the middleware function invoke for certain end-points/routes only we define a config object -->
//If we do not define and export this config object, the middleware function will get invoked for every request to every route/end-point

export default middleware;
export const config = {
  matcher: [
    "/users",
    "/userstablesort",
    // "/api/:id*",
    "/api/users-db",
    "/admin/:path*",
  ],
};
//So in a single place we can see all the routes that are protected
//We can add wildcards to elements of the matcher array as well
//*:zero or more - it is used to specify that the matcher should run the middleware function for all sub-paths
//+:1 or more
//?:zero or one
