import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/book/choose-service";
import { endpoints } from "@/shared/constants";

const { getServices } = endpoints;

export const listServices = async () => {
	const response = await fetch(getServices);
	const data = await response.json();
	return data;
};
export const ServiceSelector = () => {
	const navigate = useNavigate({ from: Route.fullPath });

	const { isLoading, error, data } = useQuery({
		queryKey: ["services"],
		staleTime: 1000 * 60 * 5, // 5 minutes
		queryFn: listServices,
	});
	if (isLoading) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="">
			<select
				name="chosen-service"
				className="w-full p-4 text-3xl border-primary focus:border rounded-xl"
				onChange={(e) => {
					navigate({
						to: "/book/" + e.target.value,
					});
				}}
			>
				<option value="">Select a service</option>
				{data.map((service: any) => (
					<option key={service.id} value={service.id}>
						{service.name}
					</option>
				))}
			</select>
		</div>
	);
};
