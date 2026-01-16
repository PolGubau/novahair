import { getStrictContext } from "~/shared/lib/get-strict-context";

export type CheckboxContextType = {
	isChecked: boolean | "indeterminate";
	setIsChecked: (checked: boolean | "indeterminate") => void;
};

export const [CheckboxProvider, useCheckbox] =
	getStrictContext<CheckboxContextType>("CheckboxContext");
