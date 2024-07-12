"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/types";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/actions/auth";
import Image from "next/image";
import { toast } from "sonner";

export default function SignInFormCard() {
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useReactHookForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
    },
  });

  // this prevents hydration mismatch if the user is using lastpass or other password managers
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setIsLoading(true);
    const res = await signIn(values);

    if (!res.success) {
      toast(res.message);
    } else if (res.success) {
      toast(res.message);
      setIsMagicLinkSent(true);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader className="pt-0">
        <Image
          src="/logo.png"
          alt="Logo"
          className="w-full"
          width={300}
          height={300}
        />
        <CardTitle>{isMagicLinkSent ? "Magic Link Sent" : "Welcome"}</CardTitle>
        <CardDescription>
          {isMagicLinkSent
            ? "Check your email for a magic link to sign in."
            : "Enter your email and we'll send you a magic link to sign in."}
        </CardDescription>
      </CardHeader>
      {!isMagicLinkSent && (
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Magic Link"}
              </Button>
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
}
