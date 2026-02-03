import { StaffSelectionItemSkeleton } from "../item/item-skeleton";
import { staffListClasses } from "./list";

 type Props = {
  count?: number;
};
export const StaffListSelectorListSkeleton = ({ count = 5 }: Props) => {
  return (
  <ul className={staffListClasses.base}>
      {new Array(count).fill(null).map((_,index) => (
          <StaffSelectionItemSkeleton   
          key={index}
        />
      ))}
      </ul>  )
}
