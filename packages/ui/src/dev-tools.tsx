import { env } from "@novahair/utils";

export const Devtools = env.isDev
	? () => (
			<>
				{/*  <TanStackDevtools
				config={{ position: "bottom-right" }}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
			 */}
			</>
		)
	: () => null;
