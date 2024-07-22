import { redirect } from "next/navigation";
import ItineraryCardList from "./itinerary-card-list";
import { getCurrentUser } from "@/lib/auth";
import { getChildByIdAndCampusId } from "@/lib/db/queries/child";
import { getFamilyWithChildsByEmailAndCampusId } from "@/lib/db/queries/family";
import { Button } from "@/components/ui/button";
import ParamsSelect from "./params-select";
const classes = [
  {
    id: "1",
    time: "8:00 AM - 9:00 AM",
    name: "Class Name 1",
    location: "Location",
    campusId: 0,
  },
  {
    id: "2",
    time: "10:00 AM - 11:00 AM",
    name: "Class Name 2",
    location: "Location",
    campusId: 0,
  },
  {
    id: "3",
    time: "12:00 PM - 1:00 PM",
    name: "Class Name 3",
    location: "Location",
    campusId: 0,
  },
  {
    id: "4",
    time: "2:00 PM - 3:00 PM",
    name: "Class Name 4",
    location: "Location",
    campusId: 0,
  },
  {
    id: "5",
    time: "4:00 PM - 5:00 PM",
    name: "Class Name 5",
    location: "Location",
    campusId: 0,
  },
  {
    id: "6",
    time: "6:00 PM - 7:00 PM",
    name: "Class Name 6",
    location: "Location",
    campusId: 0,
  },
  {
    id: "7",
    time: "8:00 PM - 9:00 PM",
    name: "Class Name 7",
    location: "Location",
    campusId: 0,
  },
  {
    id: "8",
    time: "10:00 PM - 11:00 PM",
    name: "Class Name 8",
    location: "Location",
    campusId: 0,
  },
  {
    id: "9",
    time: "12:00 AM - 1:00 AM",
    name: "Class Name 9",
    location: "Location",
    campusId: 0,
  },
  {
    id: "10",
    time: "2:00 AM - 3:00 AM",
    name: "Class Name 10",
    location: "Location",
    campusId: 0,
  },
];
const generateRandomClasses = (campusId: number) => {
  const randomClasses: ClassInfo[] = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * classes.length);
    const randomClass = classes[randomIndex];
    randomClass.campusId = campusId;
    randomClasses.push(randomClass);
  }
  return randomClasses;
};
const dates = [
  "January 1, 2024",
  "January 3, 2024",
  "January 5, 2024",
  "January 7, 2024",
  "January 9, 2024",
  "January 11, 2024",
  "January 13, 2024",
  "January 15, 2024",
  "January 17, 2024",
  "January 19, 2024",
  "January 21, 2024",
  "January 23, 2024",
  "January 25, 2024",
  "January 27, 2024",
  "January 29, 2024",
];

const generateItineraries = (campusId: number) => {
  const itineraries: Itinerary[] = [];
  if (itineraries.length > 0) return itineraries;
  for (let i = 0; i < dates.length; i++) {
    itineraries.push({
      date: dates[i],
      classes: generateRandomClasses(campusId),
    });
  }
  return itineraries;
};
export interface Itinerary {
  date: string;
  classes: ClassInfo[];
}

export interface ClassInfo {
  id: string;
  time: string;
  name: string;
  campusId: number;
  location: string;
}

export default async function ItineraryPage({
  params: { campusId },
  searchParams,
}: {
  params: { campusId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const familyWithChilds = await getFamilyWithChildsByEmailAndCampusId(
    user.email,
    Number(campusId)
  );

  if (!familyWithChilds) {
    return <div>No family found</div>;
  }

  let selectedChildId;
  if (searchParams["childId"]) {
    selectedChildId = searchParams["childId"];
  } else {
    selectedChildId = familyWithChilds.childs[0].id;
  }
  if (!selectedChildId) {
    return <div>No child found</div>;
  }

  const child = await getChildByIdAndCampusId(
    Number(selectedChildId),
    Number(campusId)
  );

  if (!child) {
    return <div>No child found</div>;
  }

  let selectedDate;

  if (searchParams["date"]) {
    selectedDate = searchParams["date"] as string;
  } else {
    selectedDate = dates[0];
  }

  const itineraries = generateItineraries(Number(campusId));

  const itinerary = itineraries.find(
    (i) => i.date === selectedDate
  ) as Itinerary;

  const today = dates[0];
  const isFutureDate = selectedDate !== today;

  return (
    <main className="container flex flex-col h-full items-center overflow-hidden max-w-2xl">
      <ParamsSelect
        currentChild={child}
        childs={familyWithChilds.childs}
        dates={dates}
        selectedDate={selectedDate}
      />
      <Button className="mt-2 w-full" variant="secondary">
        {isFutureDate ? "Schedule Absence" : "Sign In Today"}
      </Button>
      <ItineraryCardList itinerary={itinerary} />
    </main>
  );
}
