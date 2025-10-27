import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/book/choose-service";
import { LoadingOverlay } from "@/shared/ui/loading-overlay";
import { useServices } from "../model/use-services";

export const ServiceSelector = () => {
	const navigate = useNavigate({ from: Route.fullPath });

	const { isLoading, error, services } = useServices();

	if (error) return `An error has occurred: ${error.message}`;

	return (
		<div className="">
			<LoadingOverlay isLoading={isLoading}>
				<h1 className="text-4xl mb-4">Choose a service</h1>
				<select
					name="chosen-service"
					className="w-full p-4 text-3xl border-primary focus:border rounded-xl"
					onChange={(e) => {
						navigate({
							to: `/book/${e.target.value}`,
						});
					}}
				>
					<option value="">Select a service</option>
					{services.map((service) => (
						<option key={service.id} value={service.id}>
							{service.name}
						</option>
					))}
				</select>
			</LoadingOverlay>
		</div>
	);
};
