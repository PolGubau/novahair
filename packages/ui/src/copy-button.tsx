import { useClipboard } from "@novahair/utils/hooks/use-clipboard";
import { Check, Copy } from "lucide-react";
import { t } from "i18next";
import type { ButtonProps } from "./button";
import { IconButton } from "./icon-button";

interface CopyButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
	text: string;
}

export const CopyButton = ({ text, ...props }: CopyButtonProps) => {
	const { copyToClipboard, isCopied } = useClipboard();
	;
	const handleCopy = () => {
		copyToClipboard(text);
	};
	return (
		<IconButton
			onClick={handleCopy}
			{...props}
			label={isCopied ? t("copied") : t("copy")}
		>
			{isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
		</IconButton>
	);
};
