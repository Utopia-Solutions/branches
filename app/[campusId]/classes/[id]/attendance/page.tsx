"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Attendance = {
  [name: string]: Status;
};

type Status = "Here" | "Absent" | "Late" | undefined;

const ClassAttendancePage: React.FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const [attendance, setAttendance] = useState<Attendance>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const faculty = ["Joe Taylor", "Jane Taylor"];
  const students = [
    "Tim Taylor",
    "Jill Taylor",
    "Brad Taylor",
    "Mark Taylor",
    "Randy Taylor",
  ];
  const handleAttendanceChange = (name: string, status: Status): void => {
    setAttendance((prev) => ({ ...prev, [name]: status }));
  };

  console.log("attendance", JSON.stringify(attendance));

  const router = useRouter();
  const handleSubmit = (): void => {
    setSubmitted(true);
    router.back();
    toast.success("Attendance submitted successfully");
  };

  const renderHereButton = (name: string): JSX.Element => (
    <Button
      variant="outline"
      className={
        attendance[name] === "Here"
          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
      }
      onClick={() => handleAttendanceChange(name, "Here")}
    >
      Here
    </Button>
  );

  const renderAbsentButton = (name: string): JSX.Element => (
    <Button
      variant="outline"
      className={
        attendance[name] === "Absent"
          ? "bg-destructive text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground"
          : "bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
      }
      onClick={() => handleAttendanceChange(name, "Absent")}
    >
      Absent
    </Button>
  );

  const renderLateButton = (name: string): JSX.Element => (
    <Button
      variant="outline"
      className={
        attendance[name] === "Late"
          ? "bg-yellow-500 text-destructive-foreground hover:bg-yellow-500 hover:text-destructive-foreground"
          : "bg-muted text-muted-foreground hover:bg-yellow-500 hover:text-destructive-foreground"
      }
      onClick={() => handleAttendanceChange(name, "Late")}
    >
      Late
    </Button>
  );

  const renderPersonRow = (name: string): JSX.Element => (
    <div className="flex items-center justify-between space-x-2">
      <span>{name}</span>
      <div className="flex space-x-2">
        {renderHereButton(name)}
        {renderAbsentButton(name)}
        {renderLateButton(name)}
      </div>
    </div>
  );

  return (
    <main className="container flex flex-col w-full h-full items-center pt-4">
      <Card className="max-w-lg">
        <CardHeader className="flex justify-between">
          <CardTitle>Take Attendance</CardTitle>
          <CardDescription>
            [class name] [start time] - [end time] - [location]
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold">Faculty</h3>
          {faculty.map((name) => (
            <div key={name} className="mt-2">
              {renderPersonRow(name)}
            </div>
          ))}
          <h3 className="font-semibold mt-4">Students</h3>
          {students.map((name) => (
            <div key={name} className="mt-2">
              {renderPersonRow(name)}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            onClick={handleSubmit}
            className="w-full text-md"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default ClassAttendancePage;
