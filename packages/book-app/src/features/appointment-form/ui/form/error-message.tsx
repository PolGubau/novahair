import { t } from "i18next";

type Props = {
	error: Error;
};

export const ErrorMessage = ({ error }: Props) => {
	const message = `An error occurred: ${error.message}`;
	console.debug("Appointment booking error:", error);
	const isDev = import.meta.env.DEV;

	if (isDev) {
		return (
			<div role="alert" className="text-destructive mt-2 whitespace-pre-wrap">
				{message}
			</div>
		);
	}
	return (
		<div role="alert" className="text-destructive mt-2 truncate line-clamp-2">
			{t("booking_error")}
		</div>
	);
};
