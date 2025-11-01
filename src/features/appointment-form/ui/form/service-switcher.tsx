import { useNavigate } from "@tanstack/react-router";
import { Route } from "~/routes/book/$serviceId";
import { NativeSelect } from "~/shared/ui/native-select";
import { useServices } from "../../model/use-services";

export const ServiceSwitcher = () => {
	const navigate = useNavigate({ from: "/book/$serviceId" });

	const { services } = useServices();
	const selectedServiceId = Route.useParams().serviceId;

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newServiceId = event.target.value;
		navigate({ to: `/book/${newServiceId}` });
	};

	return (
		<div>
			<NativeSelect onChange={handleChange} value={selectedServiceId}>
				{services.map((service) => (
					<option key={service.id} value={service.id}>
						{service.name}
					</option>
				))}
			</NativeSelect>
		</div>
	);
};
