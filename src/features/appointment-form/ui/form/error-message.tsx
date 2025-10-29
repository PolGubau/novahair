import { t } from "i18next";

type Props = {
	error: Error;
};

export const ErrorMessage = ({ error }: Props) => {
	const message = `An error occurred: ${error.message}`;
	return (
		<div role="alert" className="text-destructive mt-2">
			{t("booking_error", { message })}
		</div>
	);
};
