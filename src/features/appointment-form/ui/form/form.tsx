import { t } from "i18next";
import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Textarea } from "~/shared/ui/textarea";
import { SlotChooser } from "./slot-chooser";

type AppointmentFormProps = {
	date: Date;
	staffId?: string;
};

export const AppointmentForm = ({ date, staffId }: AppointmentFormProps) => {
	const [chosenSlot, setChosenSlot] = useState<string | null>(null);
	return (
		<form className="flex flex-col gap-4">
			<Input
				label={t("name")}
				placeholder={t("name_placeholder")}
				name={"name"}
			/>
			<Input
				label={t("email")}
				placeholder={t("email_placeholder")}
				name="email"
			/>
			<Input label={t("phone")} placeholder="600 123 456" name="phone" />

			<SlotChooser
				date={date}
				staffId={staffId}
				selectedSlot={chosenSlot || undefined}
				onChange={(slot) => setChosenSlot(slot)}
			/>
			<Textarea
				label={t("notes")}
				placeholder={t("notes_placeholder")}
				name="notes"
			/>

			<Button type="submit" className="mt-6">
				{t("book_appointment")}
				<Send className="size-4" />
			</Button>
		</form>
	);
};
