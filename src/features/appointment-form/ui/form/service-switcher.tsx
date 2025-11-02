import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { Route } from "~/routes/book/$serviceId";
import { Select } from "~/shared/ui/select";
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
			<Select onChange={handleChange} value={selectedServiceId}>
				<option disabled value="">
					{t("select_service")}
				</option>

				{services.map((service) => (
					<option key={service.id} value={service.id}>
						{service.name}
					</option>
				))}
			</Select>
		</div>
	);
};
