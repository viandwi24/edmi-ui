import { Persona, type PersonaState } from "@edmi-react/components/ai/persona";
import { useState } from "react";

const states: PersonaState[] = [
	"idle",
	"listening",
	"thinking",
	"speaking",
	"asleep",
];

export default function Demo() {
	const [state, setState] = useState<PersonaState>("idle");
	return (
		<div className="flex flex-col items-center gap-5">
			<Persona className="size-24" state={state} variant="obsidian" />
			<div className="flex flex-wrap justify-center gap-1.5">
				{states.map((s) => (
					<button
						className="rounded-md border border-border px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground data-[active=true]:bg-accent data-[active=true]:text-foreground"
						data-active={state === s}
						key={s}
						onClick={() => setState(s)}
						type="button"
					>
						{s}
					</button>
				))}
			</div>
			<p className="max-w-sm text-center text-xs text-muted-foreground">
				Rive artwork loads from the network. Variants: obsidian, mana, opal,
				halo, glint, command.
			</p>
		</div>
	);
}
