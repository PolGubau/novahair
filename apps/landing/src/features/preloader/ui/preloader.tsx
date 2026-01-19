import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { copy } from '~/data/copy";
import { Loader } from '@novahair/ui/loader";

type Props = {
	isReady: boolean;
};

/**
 * Pantalla de carga inicial animada con GSAP
 */
export const Preloader = ({ isReady }: Props) => {
	const ref = useRef<HTMLOutputElement>(null);

	// UX timings
	const SHOW_DELAY_MS = 0; // wait before showing the preloader
	const MIN_VISIBLE_MS = 400; // once shown, keep visible at least this long

	const [visible, setVisible] = useState(false);

	const showTimerRef = useRef<number | null>(null);
	const hideTimerRef = useRef<number | null>(null);
	const shownAtRef = useRef<number | null>(null);

	useEffect(() => {
		// Start a timer to show the preloader only if loading takes a bit
		if (!isReady) {
			showTimerRef.current = window.setTimeout(() => {
				setVisible(true);
				shownAtRef.current = Date.now();
			}, SHOW_DELAY_MS);
		}

		return () => {
			if (showTimerRef.current) clearTimeout(showTimerRef.current);
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
			// kill any running gsap tweens on unmount
			gsap.killTweensOf(ref.current);
		};
	}, [isReady]);

	// Entrance animation when the preloader becomes visible
	useEffect(() => {
		const el = ref.current;
		if (!el || !visible) return;

		gsap.fromTo(
			el,
			{ opacity: 0, translateY: 20 },
			{ opacity: 1, translateY: 0, duration: 0.4 },
		);
	}, [visible]);

	// When ready, hide the preloader respecting minimum visible time
	useEffect(() => {
		if (!isReady) return;

		// If preloader wasn't shown yet, cancel the show timer and do nothing
		if (!visible) {
			if (showTimerRef.current) {
				clearTimeout(showTimerRef.current);
			}
			return;
		}

		const shownAt = shownAtRef.current ?? Date.now();
		const elapsed = Date.now() - shownAt;
		const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

		hideTimerRef.current = window.setTimeout(() => {
			const el = ref.current;
			if (!el) return;

			gsap.to(el, {
				opacity: 0,
				translateY: -20,
				duration: 0.35,
				onComplete: () => {
					setVisible(false);
				},
			});
		}, wait);

		return () => {
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
		};
	}, [isReady, visible]);

	if (!visible) return null;

	return (
		<output
			ref={ref}
			className="fixed inset-0 z-50 flex items-center justify-center bg-background"
			aria-live="polite"
		>
			<div className="flex flex-col items-center gap-4">
				<div className="flex flex-col items-center gap-4">
					<p className="text-2xl md:text-4xl font-semibold animate-pulse">
						{copy.name}
					</p>
					<Loader size={48} />
				</div>
			</div>
		</output>
	);
};
