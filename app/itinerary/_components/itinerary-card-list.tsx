import { Button } from "@/components/ui/button";
import { Pencil2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";

interface ClassInfo {
  time: string;
  name: string;
  location: string;
  presence: string;
  attendance: string;
  showAttendance: boolean;
}

interface ItineraryCardListProps {
  itinerary: {
    date: string;
    classes: ClassInfo[];
  };
  isFutureDate: boolean;
  onSignIn: () => void;
  onScheduleAbsence: () => void;
}

const ItineraryCardList: React.FC<ItineraryCardListProps> = ({
  itinerary,
  isFutureDate,
  onSignIn,
  onScheduleAbsence,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">Itinerary for {itinerary.date}</h1>
      <Button
        className="m-2"
        variant="secondary"
        onClick={isFutureDate ? onScheduleAbsence : onSignIn}
      >
        {isFutureDate ? "Schedule Absence" : "Sign In Today"}
      </Button>
      {itinerary.classes.map((classInfo) => (
        <Card
          key={classInfo.name}
          className="m-2 flex flex-wrap items-center space-x-4 p-2"
        >
          {classInfo.showAttendance && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("View Attendance")}
            >
              <PersonIcon />{" "}
            </Button>
          )}
          <div>{classInfo.time}</div>
          <div>{classInfo.name}</div>
          <div>{classInfo.location}</div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Edit")}
          >
            <Pencil2Icon />
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default ItineraryCardList;
