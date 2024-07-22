"use client";

import { useAppContext } from "@/contexts/AppContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Campus } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export default function CampusSelect({
  selectedCampus,
  campuses,
}: {
  selectedCampus: Campus | undefined | null;
  campuses: Campus[];
}) {
  console.log("selectedCampus", selectedCampus);
  return (
    <div>
      <Select
        onValueChange={(value) => redirect(`/${value}/itinerary`)}
        defaultValue={selectedCampus?.id?.toString() ?? ""}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Campus">
            {selectedCampus?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {campuses.map((campus) => (
            <SelectItem key={campus.id} value={campus.id.toString()}>
              {campus.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
