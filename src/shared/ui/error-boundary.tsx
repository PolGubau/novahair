import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./button";

interface Props {
	children: ReactNode;
	fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Error capturado por ErrorBoundary:", error, errorInfo);
	}

	resetError = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError && this.state.error) {
			if (this.props.fallback) {
				return this.props.fallback(this.state.error, this.resetError);
			}

			return (
				<div className="flex min-h-screen items-center justify-center p-4">
					<div className="w-full max-w-md space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-4xl font-bold tracking-tighter">
								{t("error_occurred")}
							</h1>
							<p className="text-muted-foreground">
								{this.state.error.message || t("error_message_default")}
							</p>
						</div>
						<div className="flex gap-2 justify-center">
							<Button onClick={this.resetError}>{t("try_again")}</Button>
							<Link to="/">
								<Button variant="outline">{t("back_to_home")}</Button>
							</Link>
						</div>
						{import.meta.env.DEV && (
							<details className="text-left text-sm">
								<summary className="cursor-pointer text-muted-foreground hover:text-foreground">
									{t("error_details")}
								</summary>
								<pre className="mt-2 overflow-auto rounded-md bg-muted p-4">
									{this.state.error.stack}
								</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
