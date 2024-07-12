import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserSelectProps {
  currentUser: string;
  familyMembers: string[];
  onSelect: (user: string) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({
  currentUser,
  familyMembers,
  onSelect,
}) => {
  return (
    <div className="flex items-center m-2">
      <Select onValueChange={onSelect} defaultValue={currentUser}>
        <SelectTrigger className={buttonVariants()}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {familyMembers.map((member) => (
            <SelectItem key={member} value={member}>
              {member}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelect;
