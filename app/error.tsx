"use client";
// Here we design a react component that is passed by the Next.js router to the layout.tsx file as a {children} prop whenever any of our pages encounters a runtime error
// The error.tsx file can only be a client/CSR component
import React from "react";
interface Props {
  error: Error; //Next.Js will automatically pass the Error object to this component
  reset: () => void; //Defining the type of the reset function that is also passed as a prop to the error.tsx file at runtime by the layout.tsx file/Next.js app router
}
const ErrorPage = ({ error: { message }, reset }: Props) => {
  // In a real application we should actually log this error using a logging service. So instead of logging it to the console which is only visible to our client, we should log it somewhere permanent where we can monitor and identofy the issues in our application. One good error logging/monitoring service is called Sentry
  console.log("An Unexpected Error has occured", message);
  return (
    <>
      <div className="flex alert alert-error  justify-center">
        An Unexpected Error has occured in the Web Application: {message}
      </div>
      <button
        className="btn btn-circle btn-error items-center"
        onClick={() => {
          reset();
        }}
      >
        Retry
      </button>
    </>
  );
};

export default ErrorPage;
