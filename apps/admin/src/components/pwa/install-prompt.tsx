/**
 * PWA Install Prompt Component
 * 
 * Shows a banner prompting users to install the app
 */

import { Button } from "@novahair/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Download, X } from "lucide-react";
import { useState } from "react";

interface InstallPromptProps {
	show: boolean;
	onInstall: () => void;
}

export const InstallPrompt = ({ show, onInstall }: InstallPromptProps) => {
	const [dismissed, setDismissed] = useState(false);

	const handleDismiss = () => {
		setDismissed(true);
		// Store dismissal in localStorage to not show again for a while
		localStorage.setItem("pwa-install-dismissed", Date.now().toString());
	};

	// Check if was recently dismissed (within 7 days)
	const wasRecentlyDismissed = () => {
		const dismissedAt = localStorage.getItem("pwa-install-dismissed");
		if (!dismissedAt) return false;

		const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
		return Number.parseInt(dismissedAt) > sevenDaysAgo;
	};

	const shouldShow = show && !dismissed && !wasRecentlyDismissed();

	return (
		<AnimatePresence>
			{shouldShow && (
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -50 }}
					className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
				>
					<div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg shadow-lg p-4">
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0 mt-0.5">
								<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
									<Download className="w-5 h-5 text-primary-foreground" />
								</div>
							</div>

							<div className="flex-1 min-w-0">
								<h3 className="text-sm font-semibold text-foreground mb-1">
									Instalar NovaHair Admin
								</h3>
								<p className="text-sm text-muted-foreground mb-3">
									Instala la app para acceso rápido y funcionalidad offline.
								</p>

								<div className="flex gap-2">
									<Button
										size="sm"
										onClick={onInstall}
										className="gap-2"
									>
										<Download className="w-4 h-4" />
										Instalar
									</Button>
									<Button
										size="sm"
										variant="ghost"
										onClick={handleDismiss}
									>
										Ahora no
									</Button>
								</div>
							</div>

							<button
								type="button"
								onClick={handleDismiss}
								className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
								aria-label="Cerrar"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

