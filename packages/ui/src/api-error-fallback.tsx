import { Link, useRouter } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { t } from "i18next";
import { ApiError, env } from "@novahair/utils";
import { Button } from "./button";

interface ApiErrorFallbackProps {
	error: Error;
	reset?: () => void;
	showBackButton?: boolean;
}

export function ApiErrorFallback({
	error,
	reset,
	showBackButton = true,
}: ApiErrorFallbackProps) {
	const router = useRouter();
	;

	// Use ApiError methods for better error detection
	const isApiError = error instanceof ApiError;
	const isNetworkError = isApiError && error.isNetworkError;
	const isServerError = isApiError && error.isServerError;
	const isNotFound = isApiError && error.statusCode === 404;

	const getErrorTitle = () => {
		if (isServerError) return t("api_error_server_title");
		if (isNotFound) return t("api_error_not_found_title");
		if (isNetworkError) return t("api_error_network_title");
		return t("api_error_generic_title");
	};

	const getErrorDescription = () => {
		if (isServerError) return t("api_error_server_description");
		if (isNotFound) return t("api_error_not_found_description");
		if (isNetworkError) return t("api_error_network_description");
		return t("api_error_generic_description");
	};

	return (
		<div className="flex items-center justify-center min-h-[400px] p-8">
			<div className="w-full max-w-md space-y-6 text-center">
				{/* Icon */}
				<div className="flex justify-center">
					<div className="rounded-full bg-destructive/10 p-4">
						<AlertCircle className="h-10 w-10 text-destructive" />
					</div>
				</div>

				{/* Title and Description */}
				<div className="space-y-2">
					<h2 className="text-2xl font-bold tracking-tight">
						{getErrorTitle()}
					</h2>
					<p className="text-muted-foreground">{getErrorDescription()}</p>
				</div>

				{/* Actions */}
				<div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
					{reset && (
						<Button onClick={reset} className="gap-2">
							<RefreshCw className="h-4 w-4" />
							{t("try_again")}
						</Button>
					)}
					{showBackButton && (
						<Button
							variant="outline"
							onClick={() => router.history.back()}
							className="gap-2"
						>
							<ArrowLeft className="h-4 w-4" />
							{t("go_back")}
						</Button>
					)}
					<Link to="/">
						<Button variant="ghost" className="gap-2 w-full">
							<Home className="h-4 w-4" />
							{t("back_to_home")}
						</Button>
					</Link>
				</div>

				{/* Error details in development */}
				{env.isDev && (
					<details className="text-left text-sm">
						<summary className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
							{t("error_details")}
						</summary>
						<div className="mt-3 space-y-2">
							<div className="rounded-md bg-muted p-3">
								<p className="font-mono text-xs break-all text-destructive">
									{error.message}
								</p>
							</div>
							{error.stack && (
								<pre className="overflow-auto rounded-md bg-muted p-3 text-xs">
									{error.stack}
								</pre>
							)}
						</div>
					</details>
				)}
			</div>
		</div>
	);
}
