// components/UserDropdown.tsx
import { useState } from "react";

interface UserDropdownProps {
  currentUser: string;
  familyMembers: string[];
  onSelect: (user: string) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  currentUser,
  familyMembers,
  onSelect,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span>{currentUser}</span>
        <span className="material-icons">expand_more</span>
      </button>
      {dropdownOpen && (
        <ul className="absolute mt-2 bg-white border rounded shadow-lg">
          {familyMembers.map((member, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-200 ${currentUser === member && "text-gray-500"}`}
              onClick={() => {
                onSelect(member);
                setDropdownOpen(false);
              }}
            >
              {member}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
