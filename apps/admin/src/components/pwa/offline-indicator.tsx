/**
 * Offline Indicator Component
 * 
 * Shows a banner when the app is offline
 */

import { motion, AnimatePresence } from "motion/react";
import { WifiOff, Wifi } from "lucide-react";

interface OfflineIndicatorProps {
	isOffline: boolean;
}

export const OfflineIndicator = ({ isOffline }: OfflineIndicatorProps) => {
	return (
		<AnimatePresence>
			{isOffline && (
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -50 }}
					className="fixed top-0 left-0 right-0 z-50"
				>
					<div className="bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm font-medium shadow-lg">
						<div className="flex items-center justify-center gap-2">
							<WifiOff className="w-4 h-4" />
							<span>Sin conexión - Trabajando en modo offline</span>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const OnlineIndicator = ({ wasOffline }: { wasOffline: boolean }) => {
	return (
		<AnimatePresence>
			{wasOffline && (
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -50 }}
					transition={{ delay: 0.2 }}
					className="fixed top-0 left-0 right-0 z-50"
				>
					<div className="bg-success text-success-foreground px-4 py-2 text-center text-sm font-medium shadow-lg">
						<div className="flex items-center justify-center gap-2">
							<Wifi className="w-4 h-4" />
							<span>Conexión restaurada</span>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

