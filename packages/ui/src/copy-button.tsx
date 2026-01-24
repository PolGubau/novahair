import { useClipboard } from "@novahair/utils/hooks/use-clipboard";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button, type ButtonProps } from "./button";

interface CopyButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
	text: string;
	successMessage?: string;
}

export const CopyButton = ({
	text,
	successMessage,
	...props
}: CopyButtonProps) => {
	const { copyToClipboard, isCopied } = useClipboard();
	const { t } = useTranslation();

	const handleCopy = () => {
		copyToClipboard(text);
	};

	return (
		<Button
			onClick={handleCopy}
			{...props}
			title={
				isCopied ? successMessage || t("copied", "Copied!") : t("copy", "Copy")
			}
		>
			{isCopied ? (
				<>
					<Check className="w-4 h-4" />
					{successMessage || t("copied", "Copied!")}
				</>
			) : (
				<>
					<Copy className="w-4 h-4" />
					{t("copy", "Copy")}
				</>
			)}
		</Button>
	);
};
