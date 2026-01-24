import { useState } from "react";

export const useClipboard = () => {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(text);
			} else {
				// Fallback for older browsers or non-secure contexts
				const textArea = document.createElement("textarea");
				textArea.value = text;
				textArea.style.position = "fixed";
				textArea.style.left = "-999999px";
				textArea.style.top = "-999999px";
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
			}
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy text: ", error);
		}
	};

	return { copyToClipboard, isCopied };
};
