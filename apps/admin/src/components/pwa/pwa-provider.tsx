/**
 * PWA Provider Component
 * 
 * Wraps the app and provides PWA functionality
 */

import { usePWA } from "~/hooks/use-pwa";
import { UpdatePrompt } from "./update-prompt";
import { InstallPrompt } from "./install-prompt";
import { OfflineIndicator, OnlineIndicator } from "./offline-indicator";
import { useEffect, useState } from "react";

interface PWAProviderProps {
	children: React.ReactNode;
}

export const PWAProvider = ({ children }: PWAProviderProps) => {
	const {
		isInstallable,
		needRefresh,
		isOffline,
		promptInstall,
		updateServiceWorker,
		dismissUpdate,
	} = usePWA();

	const [wasOffline, setWasOffline] = useState(false);

	// Track when we come back online
	useEffect(() => {
		if (isOffline) {
			setWasOffline(true);
		} else if (wasOffline) {
			// Show "back online" message for 3 seconds
			const timer = setTimeout(() => {
				setWasOffline(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isOffline, wasOffline]);

	const handleUpdate = async () => {
		await updateServiceWorker(true);
	};

	return (
		<>
			{children}

			{/* Update notification */}
			<UpdatePrompt
				show={needRefresh}
				onUpdate={handleUpdate}
				onDismiss={dismissUpdate}
			/>

			{/* Install prompt */}
			<InstallPrompt show={isInstallable} onInstall={promptInstall} />

			{/* Offline indicator */}
			<OfflineIndicator isOffline={isOffline} />

			{/* Back online indicator */}
			{!isOffline && <OnlineIndicator wasOffline={wasOffline} />}
		</>
	);
};

