export class ApiError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public endpoint?: string,
	) {
		super(message);
		this.name = "ApiError";
	}

	static fromResponse(response: Response, endpoint: string): ApiError {
		return new ApiError(
			`HTTP ${response.status}: ${response.statusText}`,
			response.status,
			endpoint,
		);
	}

	isNetworkError(): boolean {
		return !this.statusCode;
	}

	isClientError(): boolean {
		return !!this.statusCode && this.statusCode >= 400 && this.statusCode < 500;
	}

	isServerError(): boolean {
		return !!this.statusCode && this.statusCode >= 500;
	}
}
