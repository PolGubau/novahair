import { Select } from "@novahair/ui";
import { cn, TranslationKey } from "@novahair/utils";
import { allLocales, Locale } from "@novahair/utils/i18n/constants";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {version,displayName,description} from "../../../../package.json";
import { AdminMain } from "~/app/layouts/admin-main";
 
const settingsItem = "grid md:grid-cols-2 gap-2 items-center p-4"

export const Route = createFileRoute("/settings/preferences/")({
  component: RouteComponent,
});
const localeLabelMapper: Record<Locale, TranslationKey> = {
  en: "english",
  es: "spanish",
};

function RouteComponent() {
  const { i18n, t } = useTranslation();
  return <AdminMain title="preferences" description="manage_preferences_description"> 

   
    <ul className="border border-foreground/10 rounded-xl gap-2 flex flex-col divide-y divide-foreground/10 max-w-4xl">
      <li className={settingsItem}>
        <span className="font-medium">{t("language")}</span>
      
        <Select
      value={i18n.language}
      options={allLocales.map((locale) => ({
        label: localeLabelMapper[locale],
        value: locale,
      }))}
      onChange={(e) => { i18n.changeLanguage(e); }}
        />
        </li>
  <li className={cn(settingsItem,"items-start")}>
     <span className="font-medium">{t("version")}</span>
    <div className="flex flex-col gap-1">
    <p>{displayName} - {version}</p>
    <small>
    {description}
    </small>

    </div>
      </li>

</ul>
  </AdminMain>;
}