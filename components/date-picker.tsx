interface DatePickerProps {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <div className="flex overflow-x-auto space-x-2 p-2 bg-gray-100">
      {dates.map((date, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded ${selectedDate === date ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}
          onClick={() => onSelectDate(date)}
        >
          {date}
        </button>
      ))}
    </div>
  );
};

export default DatePicker;
