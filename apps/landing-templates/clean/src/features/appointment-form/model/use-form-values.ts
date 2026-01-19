import { useEffect, useState } from "react";
import {
	getAppointmentFormFields,
	saveAppointmentFormFields,
} from "../infra/fields-persistence";

export const useFormValues = <T = Record<string, string>>() => {
	const [fields, setFields] = useState<T>({} as T);
	useEffect(() => {
		const savedFields = getAppointmentFormFields<T>();
		setFields(savedFields);
	}, []);

	function updateField(field: keyof T, value: string) {
		setFields((prev) => {
			const updated = {
				...prev,
				[field]: value,
			};
			saveAppointmentFormFields(updated);
			return updated;
		});
	}
	return {
		fields,
		updateField,
	};
};
