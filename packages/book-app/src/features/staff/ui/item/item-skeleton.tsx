import { Avatar, Button } from "@novahair/ui";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { staffItemClasses } from "./item";
import { cn } from "@novahair/utils";
 
export const StaffSelectionItemSkeleton = () => {
  const {t} =  useTranslation();
  return (
    <li className={cn(staffItemClasses.base,"skeleton")}>
      <Avatar className={cn(staffItemClasses.avatar)} alt={"Unknown"} src={""} />
            <article className={cn(staffItemClasses.content)}>
        <h2 className={cn(staffItemClasses.name,"skeleton")}>{"Loading..."}</h2>
        <footer>
                 <Button disabled loading size="sm">
                  {t("select")}
                  <ChevronRight className="w-4 h-4"/>
                </Button>
        </footer>
             </article>

    </li>
  )
}
 