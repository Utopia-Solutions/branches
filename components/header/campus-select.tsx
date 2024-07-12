"use client";

import { useAppContext } from "@/contexts/AppContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CampusSelect() {
  const { selectedCampusId, setSelectedCampusId, campuses, selectedCampus } =
    useAppContext();

  console.log(selectedCampusId, campuses, selectedCampus);

  return (
    <div>
      <Select
        onValueChange={(value) => setSelectedCampusId(Number(value))}
        defaultValue={selectedCampusId?.toString() ?? ""}
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
