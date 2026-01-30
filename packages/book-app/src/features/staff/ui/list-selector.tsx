import { useStaffs } from "@novahair/client";
import { Avatar, Button } from "@novahair/ui";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { ChevronRight } from "lucide-react";
import { useTenantId } from "../../../shared/tenant";

type Props = {
  serviceId: string;
  onStaffSelect?: (staffId: string) => void;
  
};

export const StaffListSelector = ({ serviceId, onStaffSelect }: Props) => {
  const tenantId = useTenantId();
  const { staffs, isLoading } = useStaffs(tenantId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="">{t("select_staff")}</h1>
      <ul className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {staffs.map((staff) => (
          <li key={staff.id} 
              className="flex items-center gap-4 border overflow-hidden border-foreground/20 rounded-xl"
          >
              <Avatar className="size-24 rounded-none border-y-0 border-l-0"
                alt={staff.name ?? "Unknown"}
                src={staff.avatarUrl ?? ""}
                />

            <div className="flex flex-col gap-2">
            
              <h2 className="text-lg">{staff.name ?? t("unknown")}</h2>
            
                 <Button onClick={() => onStaffSelect?.(staff.id)}>
                  {t("select")}         
                  <ChevronRight/>
                </Button>
             </div>            

           </li>
        ))}
      </ul>
    </div>
  );
};