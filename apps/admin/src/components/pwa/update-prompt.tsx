/**
 * PWA Update Prompt Component
 * 
 * Shows a notification when a new version of the app is available
 */

import { Button } from "@novahair/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCcw, X } from "lucide-react";

interface UpdatePromptProps {
	show: boolean;
	onUpdate: () => void;
	onDismiss: () => void;
}

export const UpdatePrompt = ({
	show,
	onUpdate,
	onDismiss,
}: UpdatePromptProps) => {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					className="fixed bottom-4 right-4 z-50 max-w-md"
				>
					<div className="bg-card border border-border rounded-lg shadow-lg p-4">
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0 mt-0.5">
								<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
									<RefreshCcw className="w-5 h-5 text-primary" />
								</div>
							</div>

							<div className="flex-1 min-w-0">
								<h3 className="text-sm font-semibold text-foreground mb-1">
									Nueva versión disponible
								</h3>
								<p className="text-sm text-muted-foreground mb-3">
									Hay una actualización disponible. Actualiza para obtener las
									últimas mejoras y correcciones.
								</p>

								<div className="flex gap-2">
									<Button
										size="sm"
										onClick={onUpdate}
										className="gap-2"
									>
										<RefreshCcw className="w-4 h-4" />
										Actualizar ahora
									</Button>
									<Button
										size="sm"
										variant="ghost"
										onClick={onDismiss}
									>
										Más tarde
									</Button>
								</div>
							</div>

							<button
								type="button"
								onClick={onDismiss}
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

