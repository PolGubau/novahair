/**
 * PWA Hook
 * 
 * Manages Progressive Web App functionality including:
 * - Service Worker registration and updates
 * - Install prompt
 * - Online/offline status
 * - Update notifications
 */

import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export interface PWAState {
	/** Whether the app is installable */
	isInstallable: boolean;
	/** Whether the app is installed */
	isInstalled: boolean;
	/** Whether there's an update available */
	needRefresh: boolean;
	/** Whether the app is currently offline */
	isOffline: boolean;
	/** Trigger the install prompt */
	promptInstall: () => void;
	/** Update the service worker */
	updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
	/** Dismiss the update notification */
	dismissUpdate: () => void;
}

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const usePWA = (): PWAState => {
	const [isInstallable, setIsInstallable] = useState(false);
	const [isInstalled, setIsInstalled] = useState(false);
	const [isOffline, setIsOffline] = useState(!navigator.onLine);
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);

	// Service Worker registration
	const {
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered(registration) {
			console.log("✅ Service Worker registered:", registration);
		},
		onRegisterError(error) {
			console.error("❌ Service Worker registration error:", error);
		},
		onNeedRefresh() {
			console.log("🔄 New content available, please refresh.");
		},
		onOfflineReady() {
			console.log("📴 App ready to work offline");
		},
	});

	// Handle install prompt
	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			setIsInstallable(true);
		};

		const handleAppInstalled = () => {
			setIsInstalled(true);
			setIsInstallable(false);
			setDeferredPrompt(null);
			console.log("✅ PWA installed successfully");
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		window.addEventListener("appinstalled", handleAppInstalled);

		// Check if already installed
		if (window.matchMedia("(display-mode: standalone)").matches) {
			setIsInstalled(true);
		}

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt,
			);
			window.removeEventListener("appinstalled", handleAppInstalled);
		};
	}, []);

	// Handle online/offline status
	useEffect(() => {
		const handleOnline = () => {
			setIsOffline(false);
			console.log("🌐 Back online");
		};

		const handleOffline = () => {
			setIsOffline(true);
			console.log("📴 Gone offline");
		};

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	const promptInstall = async () => {
		if (!deferredPrompt) {
			console.warn("Install prompt not available");
			return;
		}

		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === "accepted") {
			console.log("✅ User accepted the install prompt");
		} else {
			console.log("❌ User dismissed the install prompt");
		}

		setDeferredPrompt(null);
		setIsInstallable(false);
	};

	const dismissUpdate = () => {
		setNeedRefresh(false);
	};

	return {
		isInstallable,
		isInstalled,
		needRefresh,
		isOffline,
		promptInstall,
		updateServiceWorker,
		dismissUpdate,
	};
};

