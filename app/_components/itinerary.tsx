"use client";

import { useState } from "react";
import UserSelect from "./user-select";
import DateCarousel from "./date-carousel";
import ItineraryCardList from "./itinerary-card-list";

const Itinerary = () => {
  const [currentUser, setCurrentUser] = useState("Tim Taylor");
  const [selectedDate, setSelectedDate] = useState("Jan 04");
  const [itinerary, setItinerary] = useState({
    date: "Jan 04",
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
    "Jan 04",
    "Jan 11",
    "Jan 18",
    "Jan 25",
    "Feb 01",
    "Feb 08",
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
        isFutureDate={selectedDate !== "Jan 04"}
        onSignIn={handleSignIn}
        onScheduleAbsence={handleScheduleAbsence}
      />
    </main>
  );
};

export default Itinerary;
