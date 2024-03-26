"use client";
// We make this a client component
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}
const AuthProvider = ({ children }: Props) => {
  //We return the SessionProvider in the body and put the children as a prop
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
