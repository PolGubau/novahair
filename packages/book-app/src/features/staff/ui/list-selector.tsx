import { Service, useStaffs } from "@novahair/client";
import { t } from "i18next";
import { useTenantId } from "../../../shared/tenant";
import { StaffSelectionItem } from "./item/item";
import { StaffSelectionItemSkeleton } from "./item/item-skeleton";
import { LoadingOverlay } from "@novahair/ui";
import { StaffListSelectorList } from "./list/list";
import { StaffListSelectorListSkeleton } from "./list/list-skeleton";

type Props = {
  onStaffSelect?: (staffId: string) => void;
  serviceId:Service["id"]
};

export const StaffListSelector = ({ onStaffSelect,serviceId }: Props) => {
  const tenantId = useTenantId();
  const { staffs, isLoading } = useStaffs(tenantId,{containsServices:[serviceId]});

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">
      <LoadingOverlay isLoading={true}>
      <ul className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {[1, 2, 3, 4, 5].map((_) => (
          <StaffSelectionItemSkeleton key={_} />
        ))}
      </ul>
      </LoadingOverlay>
    </div>;
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-2xl md:text-4xl mb-2 md:mb-4">{t("select_staff")}</h1>
      <LoadingOverlay isLoading={isLoading} >
         {isLoading ? <StaffListSelectorListSkeleton/>:<StaffListSelectorList onStaffSelect={onStaffSelect} staffs={staffs} />}

      </LoadingOverlay>
    </div>
  );
};