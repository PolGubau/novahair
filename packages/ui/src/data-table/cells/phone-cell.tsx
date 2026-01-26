import { t } from "i18next";
import { Phone } from "lucide-react";
import { IconButton } from "../../icon-button";

type Props = {
	phone: string;
};
export const PhoneCell = ({ phone }: Props) => {
	return (
		<div className="flex gap-2 items-center group">
			{phone}
			<a href={`tel:${phone}`} target="_blank" rel="noreferrer">
				<IconButton
					variant="ghost"
					size="sm"
					label={t("call")}
					className="opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<Phone />
				</IconButton>
			</a>
		</div>
	);
};
