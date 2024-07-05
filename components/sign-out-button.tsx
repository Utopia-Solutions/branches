"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { signOut } from "@/actions/auth";
import { Button } from "./ui/button";

const SignOutButton: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      router.push("/");
    } else {
      console.error("Failed to sign out:", result.error);
    }
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOutButton;
