import { TranslationKey } from "@novahair/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"
import { Button, ButtonProps } from "./button"
import { useTranslation } from "react-i18next";
import { Trash2Icon } from "lucide-react";


export type Props = {
  title?: TranslationKey;
  description?: TranslationKey;
  trigger?: React.ReactNode;
  onConfirm: () => void;
  icon?: React.ReactNode;
  confirmLabel?: TranslationKey;
   triggerProps?:ButtonProps
} 
export function ConfirmDeleteDialog({
  title = "are_you_sure_you_want_to_delete_this",
  description = "this_action_cannot_be_undone",
  trigger,
  onConfirm,
  confirmLabel = "delete",
  triggerProps,
  icon = <Trash2Icon />,
}: Props) {

    const { t } = useTranslation();
  return (
    <AlertDialog>
      {trigger ? (
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
      ) : (
        <AlertDialogTrigger asChild>
          <Button variant={triggerProps?.variant??"error"} {...triggerProps}>
            <Trash2Icon/>
            {t("delete")}
          </Button>
        </AlertDialogTrigger>
      )}
      
      <AlertDialogContent size="sm">
         <AlertDialogHeader>
        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
          {icon}
          </AlertDialogMedia>
          <AlertDialogTitle>{t(title)}</AlertDialogTitle>
          <AlertDialogDescription>
            {t(description)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
         <AlertDialogCancel>
            {t("cancel")}
            </AlertDialogCancel>
          <AlertDialogAction variant="error" onClick={onConfirm}>
               {t(confirmLabel)}
           </AlertDialogAction>
        </AlertDialogFooter>
       </AlertDialogContent>
    </AlertDialog>
  )
}
