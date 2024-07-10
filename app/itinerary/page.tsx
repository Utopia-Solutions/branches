"use client";

import { useState } from "react";
import UserSelect from "./_components/user-select";
import DateCarousel from "./_components/date-carousel";
import ItineraryCardList from "./_components/itinerary-card-list";

const DailyItinerary = () => {
  const [currentUser, setCurrentUser] = useState("Tim Taylor");
  const [selectedDate, setSelectedDate] = useState("Jan 4");
  const [itinerary, setItinerary] = useState({
    date: "Jan 4",
    classes: [
      {
        time: "8:00 AM - 9:00 AM",
        name: "Class Name",
        location: "Location",
        presence: "gray-circle",
        attendance: "gray",
        showAttendance: true,
      },
      // Additional classes here
    ],
  });

  const familyMembers = [
    "Tim Taylor",
    "Jill Taylor",
    "Brad Taylor",
    "Mark Taylor",
    "Randy Taylor",
  ];
  const dates = [
    "Jan 4",
    "Jan 11",
    "Jan 18",
    "Jan 25",
    "Feb 1",
    "Feb 8",
    "Feb 15",
  ];

  const handleUserSelect = (user: string) => {
    setCurrentUser(user);
    // Fetch and update itinerary for selected user
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Fetch and update itinerary for selected date
  };

  const handleSignIn = () => {
    // Handle sign-in action
  };

  const handleScheduleAbsence = () => {
    // Handle schedule absence action
  };

  return (
    <main className="container flex flex-col w-full h-full items-center">
      <UserSelect
        currentUser={currentUser}
        familyMembers={familyMembers}
        onSelect={handleUserSelect}
      />
      <DateCarousel
        dates={dates}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
      />
      <ItineraryCardList
        itinerary={itinerary}
        isFutureDate={selectedDate !== "Jan 4"}
        onSignIn={handleSignIn}
        onScheduleAbsence={handleScheduleAbsence}
      />
    </main>
  );
};

export default DailyItinerary;
