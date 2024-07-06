"use client";

import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const SignOutButton = () => (
  <Link
    href="/api/auth/sign-out"
    className={buttonVariants({ variant: "default", size: "sm" })}
  >
    Sign Out
  </Link>
);

export default SignOutButton;
