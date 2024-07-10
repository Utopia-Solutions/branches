"use client";

import { useState, useEffect } from "react";
import UserDropdown from "@/components/user-dropdown";
import DatePicker from "@/components/date-picker";
import Itinerary from "@/components/itinerary";

const DailyItinerary: React.FC = () => {
  const [currentUser, setCurrentUser] = useState("Tim Taylor");
  const [selectedDate, setSelectedDate] = useState("Jan 18");
  const [itinerary, setItinerary] = useState({
    date: "Jan 18",
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
    <>
      <UserDropdown
        currentUser={currentUser}
        familyMembers={familyMembers}
        onSelect={handleUserSelect}
      />
      <DatePicker
        dates={dates}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
      />
      <Itinerary
        itinerary={itinerary}
        isFutureDate={selectedDate !== "Jan 18"}
        onSignIn={handleSignIn}
        onScheduleAbsence={handleScheduleAbsence}
      />
    </>
  );
};

export default DailyItinerary;
