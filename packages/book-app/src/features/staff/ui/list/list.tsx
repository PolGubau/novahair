import { Staff } from "@novahair/client";
import { StaffSelectionItem } from "../item/item";

type Props = {
  onStaffSelect?: (staffId: string) => void;
staffs:Staff[]};
export const StaffListSelectorList = ({ onStaffSelect,staffs }: Props) => {
  return (
  <ul className={staffListClasses.base}>
        {staffs.map((staff) => (
          <StaffSelectionItem   
            key={staff.id}
            name={staff.name}
            avatarUrl={staff.avatarUrl}
            onSelect={() => onStaffSelect?.(staff.id)}
          />
        ))}
      </ul>  )
}


export const staffListClasses = {
  base: "grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
 };