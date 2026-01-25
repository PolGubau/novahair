import { config } from "../constants";
import { ApiError } from "./api-error";

export async function genericFetch<ResponseType>(
	url: string,
	options?: RequestInit,
): Promise<ResponseType> {
	try {
		const defaultOptions: RequestInit = {
			headers: {
				...(config.tenantId && { "X-Tenant-ID": config.tenantId }),
				...options?.headers,
			},
			...options,
		};
		const response = await fetch(url, defaultOptions);

		if (!response.ok) {
			const errorText = await response.text().catch(() => "");
			throw new ApiError(
				errorText || `Request failed: ${response.statusText}`,
				response.status,
				url,
			);
		}

		// Handle empty responses (like DELETE)
		const contentType = response.headers.get("content-type");
		const contentLength = response.headers.get("content-length");

		// Si no hay contenido, retornar vacío
		if (contentLength === "0" || response.status === 204) {
			return undefined as ResponseType;
		}

		// Si no es JSON, intentar devolver texto
		if (!contentType?.includes("application/json")) {
			const text = await response.text();
			return (text || undefined) as ResponseType;
		}

		return await response.json();
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		// Network error or other fetch failure
		throw new ApiError(
			error instanceof Error ? error.message : "Network error",
			undefined,
			url,
		);
	}
}
