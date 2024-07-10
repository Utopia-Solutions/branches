interface ClassInfo {
  time: string;
  name: string;
  location: string;
  presence: string;
  attendance: string;
  showAttendance: boolean;
}

interface ItineraryProps {
  itinerary: {
    date: string;
    classes: ClassInfo[];
  };
  isFutureDate: boolean;
  onSignIn: () => void;
  onScheduleAbsence: () => void;
}

const Itinerary: React.FC<ItineraryProps> = ({
  itinerary,
  isFutureDate,
  onSignIn,
  onScheduleAbsence,
}) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Itinerary for {itinerary.date}</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={isFutureDate ? onScheduleAbsence : onSignIn}
        >
          {isFutureDate ? "Schedule Absence" : "Sign In Today"}
        </button>
      </div>
      <ul className="space-y-2">
        {itinerary.classes.map((cls, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 border rounded"
          >
            <div className="flex items-center space-x-2">
              <span className={`icon ${cls.presence}`}></span>
              <div>
                <div>{cls.time}</div>
                <div>
                  {cls.name} - {cls.location}
                </div>
              </div>
            </div>
            {!isFutureDate && cls.showAttendance && (
              <button className={`icon ${cls.attendance}`}></button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Itinerary;
