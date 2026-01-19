export const Devtools = import.meta.env.DEV
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
