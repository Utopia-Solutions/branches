"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/actions/auth";

export default function SignInFormCard() {
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    console.log("Initial render: isMagicLinkSent =", isMagicLinkSent);
  }, [isMagicLinkSent]);

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    console.log("Form Submitted:", values);
    const res = await signIn(values);

    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
    } else {
      toast({
        variant: "default",
        description: res.message,
      });
      setIsMagicLinkSent(true);
      console.log("Magic link sent: isMagicLinkSent =", isMagicLinkSent);
    }
  };

  console.log("Render: isMagicLinkSent =", isMagicLinkSent);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isMagicLinkSent ? "Magic Link Sent" : "Welcome"}</CardTitle>
        <CardDescription>
          {isMagicLinkSent
            ? "Check your email for a magic link to sign in."
            : "Enter your email and we'll send you a magic link to sign in."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isMagicLinkSent && (
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
              <Button type="submit" className="w-full">
                Send Magic Link
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
