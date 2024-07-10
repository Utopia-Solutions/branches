import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil2Icon, PersonIcon } from "@radix-ui/react-icons";

interface ClassInfo {
  time: string;
  name: string;
  location: string;
  presence: string;
  attendance: string;
  showAttendance: boolean;
}

interface ItineraryTableProps {
  itinerary: {
    date: string;
    classes: ClassInfo[];
  };
  isFutureDate: boolean;
  onSignIn: () => void;
  onScheduleAbsence: () => void;
}

const ItineraryTable: React.FC<ItineraryTableProps> = ({
  itinerary,
  isFutureDate,
  onSignIn,
  onScheduleAbsence,
}) => {
  return (
    <div className="flex flex-col m-2 items-center">
      <h2 className="text-xl font-bold">ItineraryTable for {itinerary.date}</h2>
      <Button
        className="m-2"
        variant="secondary"
        onClick={isFutureDate ? onScheduleAbsence : onSignIn}
      >
        {isFutureDate ? "Schedule Absence" : "Sign In Today"}
      </Button>
      <Table>
        <TableHeader>
          <TableHead>Presence</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Attendance</TableHead>
        </TableHeader>
        <TableBody>
          {itinerary.classes.map((cls, index) => (
            <TableRow key={index}>
              <TableCell>
                <PersonIcon className="h-5 w-5" />
              </TableCell>
              <TableCell>{cls.time}</TableCell>
              <TableCell>{cls.name}</TableCell>
              <TableCell>{cls.location}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Pencil2Icon className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItineraryTable;
