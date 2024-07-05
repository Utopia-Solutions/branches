"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WelcomeCard({ user }: { user: { id: string } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You&apos;re Signed In!</CardTitle>
        <CardDescription>This is a protected route</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Your user id is <strong>{user.id}</strong>
        </p>
      </CardContent>
    </Card>
  );
}
