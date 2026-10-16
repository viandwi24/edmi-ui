import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputHeader,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from "@edmi-react/components/ai/prompt-input";
import { Button } from "@edmi-react/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@edmi-react/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@edmi-react/ui/tooltip";
import {
	atlasAgent,
	composerMenu,
	composerPlaceholder,
	plantHead,
} from "../data";
import { Icon } from "./icons";
import { Pixels } from "./pixel";

export function Composer({
	onSend,
	onClear,
}: {
	onSend: (text: string) => void;
	onClear: () => void;
}) {
	return (
		<div className="px-2 pb-2">
			<PromptInput
				onSubmit={(m) => {
					if (m.text.trim()) onSend(m.text.trim());
				}}
			>
				<PromptInputHeader>
					<Tooltip>
						<TooltipTrigger
							render={<Button type="button" variant="outline" size="sm" />}
						>
							<Pixels
								w={plantHead.w}
								h={plantHead.h}
								rects={plantHead.rects}
								className="h-3 w-3.5"
							/>
							{atlasAgent.name}
						</TooltipTrigger>
						<TooltipContent>Atlas agent</TooltipContent>
					</Tooltip>
				</PromptInputHeader>
				<PromptInputBody>
					<PromptInputTextarea placeholder={composerPlaceholder} />
				</PromptInputBody>
				<PromptInputFooter>
					<PromptInputTools>
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<Button
										type="button"
										variant="ghost"
										size="icon-xs"
										aria-label="Add"
									/>
								}
							>
								<Icon name="plus" />
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								align="start"
								elevation="floating"
							>
								{composerMenu.map((m) => (
									<DropdownMenuItem
										key={m.id}
										onClick={m.id === "clear" ? onClear : undefined}
									>
										<Icon name={m.icon} />
										{m.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</PromptInputTools>
					<PromptInputSubmit
						size="icon-sm"
						variant="secondary"
						elevation="raised"
					>
						<Icon name="arrowUp" />
					</PromptInputSubmit>
				</PromptInputFooter>
			</PromptInput>
		</div>
	);
}
