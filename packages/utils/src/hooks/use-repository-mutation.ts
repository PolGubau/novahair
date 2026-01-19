import {
	type UseMutationOptions,
	type UseMutationResult,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

/**
 * Hook para mutaciones de repository con invalidación automática
 * @param mutationFn - Función async del repository
 * @param queryKey - Key de la query a invalidar
 * @param options - Opciones adicionales de useMutation
 */
export function useRepositoryMutation<TData, TVariables>(
	mutationFn: (variables: TVariables) => Promise<TData>,
	queryKey: readonly string[],
	options?: Omit<
		UseMutationOptions<TData, Error, TVariables>,
		"mutationFn" | "onSuccess"
	> & {
		onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
	},
): UseMutationResult<TData, Error, TVariables> {
	const qc = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: async (data, variables) => {
			// Invalidar query automáticamente
			await qc.invalidateQueries({ queryKey });

			// Llamar onSuccess custom si existe
			if (options?.onSuccess) {
				await options.onSuccess(data, variables);
			}
		},
		...options,
	});
}
