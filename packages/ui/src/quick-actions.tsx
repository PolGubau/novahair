import { MoreVertical } from "lucide-react";
import { cn } from "@novahair/utils";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./dropdown-menu";

export interface QuickAction {
  id: string;
  className?: string;
	label: string;
	icon: React.ReactNode;
	onClick: () => void;
	variant?: "link" | "outline" | "primary" | "error" | "secondary" | "ghost";
	hidden?: boolean;
}

interface QuickActionsProps {
	actions: QuickAction[];
 	className?: string;
	maxVisibleActions?: number;
}

export function QuickActions({
	actions,
 	className,
	maxVisibleActions = 2,
}: QuickActionsProps) {
	const visibleActions = actions
		.filter((action) => !action.hidden)
		.slice(0, maxVisibleActions);
	const moreActions = actions
		.filter((action) => !action.hidden)
		.slice(maxVisibleActions);

  return (
    <>
			<div className={cn("flex gap-1 md:hidden", className)}>
				{visibleActions.map((action) => (
					<Button
						key={action.id}
						variant={action.variant || "ghost"}
						size="sm"
						onClick={action.onClick}
						title={action.label}
						className={action.className}
					>
						{action.icon}
						<span className="sr-only">{action.label}</span>
					</Button>
				))}

				{moreActions.length > 0 && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm" className="p-2">
								<MoreVertical className="h-4 w-4" />
								<span className="sr-only">More actions</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{moreActions.map((action) => (
								<DropdownMenuItem
									key={action.id}
									onClick={action.onClick}
									className={cn({
										"text-destructive": action.variant === "error",
									})}
								>
									<span className="flex items-center gap-2">
										{action.icon}
										{action.label}
									</span>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		<div className={cn("flex gap-1 max-md:hidden", className)}>
			{visibleActions.map((action) => (
				<Button
					key={action.id}
					variant={action.variant || "ghost"}
					size="sm"
					onClick={action.onClick}
          className={action.className}
          >
					{action.icon}
					{action.label}
				</Button>
			))}

			{moreActions.length > 0 && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm">
							<MoreVertical className="h-4 w-4" />
							<span className="sr-only">More actions</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{moreActions.map((action) => (
							<DropdownMenuItem
								key={action.id}
								onClick={action.onClick}
								className={cn({
									"text-destructive": action.variant === "error",
								})}
							>
								<span className="flex items-center gap-2">
									{action.icon}
									{action.label}
								</span>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			)}
    </div>
  </>);
}
