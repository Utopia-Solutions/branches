"use client";

import React from "react";
import { signOut } from "@/actions/auth";
import { Button } from "./ui/button";

const SignOutButton = () => {
  const handleSignOut = async () => signOut();

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOutButton;
