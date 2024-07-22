"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Pencil2Icon,
  CheckIcon,
  QuestionMarkIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Itinerary } from "./page";

interface ItineraryCardListProps {
  itinerary: Itinerary;
}

const switchAvatar = (type: string) => {
  switch (type) {
    case "present":
      return (
        <AvatarFallback className="text-primary-foreground bg-primary">
          <CheckIcon className="w-8 h-8" />
        </AvatarFallback>
      );

    case "absent":
      return (
        <AvatarFallback className="text-destructive-foreground bg-destructive">
          <Cross1Icon className="w-6 h-6" />
        </AvatarFallback>
      );

    default:
      return (
        <AvatarFallback className="text-foreground bg-background">
          <QuestionMarkIcon className="w-6 h-6" />
        </AvatarFallback>
      );
  }
};

const switchButton = (type: string, classId: string, campusId: string) => {
  switch (type) {
    default:
      return (
        <Link
          href={`/${campusId}/classes/${classId}/attendance`}
          className={cn(buttonVariants(), "w-full text-md")}
        >
          View Completed Attendance
        </Link>
      );

    case "update":
      return (
        <Link
          href={`/${campusId}/classes/${classId}/attendance`}
          className={cn(buttonVariants(), "w-full text-md")}
        >
          <Pencil2Icon className="mr-2 w-5 h-5" />
          Edit Completed Attendance
        </Link>
      );
  }
};

const ItineraryCardList: React.FC<ItineraryCardListProps> = ({ itinerary }) => {
  return (
    <div className="flex-1 flex-col overflow-auto w-full pb-4 mt-2">
      {itinerary.classes.map((classInfo) => (
        <Card key={classInfo.id} className="mt-2 w-full">
          <CardHeader className="p-4">
            <CardTitle className="flex items-center">
              <Avatar className="mr-4 text-primary">
                {switchAvatar("question")}
              </Avatar>
              {classInfo.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{classInfo.location}</div>
            <div>{classInfo.time}</div>
          </CardContent>
          {true && (
            <CardFooter className="p-4 pt-0">
              {switchButton(
                "update",
                classInfo.id,
                classInfo.campusId.toString()
              )}
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ItineraryCardList;
