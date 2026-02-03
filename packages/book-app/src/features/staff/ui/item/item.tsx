import { Avatar, Button } from "@novahair/ui";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  name: string;
  avatarUrl: string | null;
  onSelect: () => void;
};
export const StaffSelectionItem = ({ name, avatarUrl, onSelect }: Props) => {
  const {t} =  useTranslation();
  return (
    <li className={staffItemClasses.base}>
      <Avatar className={staffItemClasses.avatar} alt={name} src={avatarUrl ?? ""} />

            <article className={staffItemClasses.content}>
        <h2 className={staffItemClasses.name}>{name}</h2>
        <footer>
                 <Button onClick={onSelect} size="sm">
                  {t("select")}
                  <ChevronRight className="w-4 h-4"/>
                </Button>
        </footer>
             </article>

    </li>
  )
}


export const staffItemClasses = {
  base: "flex items-center gap-3 md:gap-4 border overflow-hidden border-foreground/20 rounded-xl hover:border-foreground/40 transition-colors",
  avatar: "size-24 rounded-none border-y-0 border-l-0",
  content: "flex flex-col gap-2 flex-1 py-2 pr-3",
  name: "text-base md:text-lg font-semibold",
 };