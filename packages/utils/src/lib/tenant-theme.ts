/**
 * Tenant theme configuration
 * Allows dynamic color overrides per tenant
 */

export type TenantTheme = {
	primary: string;
	primaryForeground: string;
	secondary: string;
	secondaryForeground: string;
	accent: string;
	accentForeground: string;
	destructive?: string;
	destructiveForeground?: string;
	muted?: string;
	mutedForeground?: string;
	border?: string;
	ring?: string;
};

/**
 * Apply tenant theme colors to CSS variables
 * Call this in your booking app initialization
 */
export function applyTenantTheme(theme: Partial<TenantTheme>) {
	const root = document.documentElement;

	if (theme.primary) root.style.setProperty("--primary", theme.primary);
	if (theme.primaryForeground)
		root.style.setProperty("--primary-foreground", theme.primaryForeground);
	if (theme.secondary)
		root.style.setProperty("--secondary", theme.secondary);
	if (theme.secondaryForeground)
		root.style.setProperty(
			"--secondary-foreground",
			theme.secondaryForeground,
		);
	if (theme.accent) root.style.setProperty("--accent", theme.accent);
	if (theme.accentForeground)
		root.style.setProperty("--accent-foreground", theme.accentForeground);
	if (theme.destructive)
		root.style.setProperty("--destructive", theme.destructive);
	if (theme.destructiveForeground)
		root.style.setProperty(
			"--destructive-foreground",
			theme.destructiveForeground,
		);
	if (theme.muted) root.style.setProperty("--muted", theme.muted);
	if (theme.mutedForeground)
		root.style.setProperty("--muted-foreground", theme.mutedForeground);
	if (theme.border) root.style.setProperty("--border", theme.border);
	if (theme.ring) root.style.setProperty("--ring", theme.ring);
}

/**
 * Example tenant themes
 */
export const tenantThemes = {
	default: {
		primary: "220 90% 56%",
		primaryForeground: "0 0% 100%",
		secondary: "220 14% 96%",
		secondaryForeground: "220 9% 46%",
		accent: "220 14% 96%",
		accentForeground: "220 9% 46%",
	},
	purple: {
		primary: "271 81% 56%",
		primaryForeground: "0 0% 100%",
		secondary: "271 14% 96%",
		secondaryForeground: "271 9% 46%",
		accent: "271 14% 96%",
		accentForeground: "271 9% 46%",
	},
	green: {
		primary: "142 76% 36%",
		primaryForeground: "0 0% 100%",
		secondary: "142 14% 96%",
		secondaryForeground: "142 9% 46%",
		accent: "142 14% 96%",
		accentForeground: "142 9% 46%",
	},
	orange: {
		primary: "25 95% 53%",
		primaryForeground: "0 0% 100%",
		secondary: "25 14% 96%",
		secondaryForeground: "25 9% 46%",
		accent: "25 14% 96%",
		accentForeground: "25 9% 46%",
	},
} satisfies Record<string, TenantTheme>;
