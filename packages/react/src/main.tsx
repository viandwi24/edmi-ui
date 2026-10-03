import {
	Component,
	type ComponentType,
	type ReactNode,
	StrictMode,
} from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

// Visual-check page: every `src/preview/<group>.tsx` (default export) is rendered twice,
// light and dark, side by side. Add a file per group; nothing to register here.
const modules = import.meta.glob<{ default: ComponentType }>(
	["./preview/*.tsx", "!./preview/_*.tsx"],
	{ eager: true },
);

// One broken group must not blank the whole page.
class GroupBoundary extends Component<
	{ name: string; children: ReactNode },
	{ error: Error | null }
> {
	state = { error: null as Error | null };
	static getDerivedStateFromError(error: Error) {
		return { error };
	}
	componentDidCatch(error: Error) {
		console.error(`[preview:${this.props.name}]`, error);
	}
	render() {
		if (this.state.error) {
			return (
				<pre className="whitespace-pre-wrap rounded-md border border-destructive p-3 font-mono text-xs text-destructive">
					{`${this.props.name} crashed: ${this.state.error.message}`}
				</pre>
			);
		}
		return this.props.children;
	}
}

function App() {
	const groups = Object.entries(modules).sort(([a], [b]) => a.localeCompare(b));
	return (
		<div className="min-h-screen bg-stage">
			{groups.map(([path, mod]) => {
				const Preview = mod.default;
				const name = path.replace("./preview/", "").replace(".tsx", "");
				return (
					<section key={path} id={name} className="border-b border-border">
						<h1 className="px-6 pt-4 font-mono text-xs tracking-wide text-muted-foreground uppercase">
							{name}
						</h1>
						<div className="grid grid-cols-1 lg:grid-cols-2">
							<div className="bg-background p-6 text-foreground">
								<GroupBoundary name={name}>
									<Preview />
								</GroupBoundary>
							</div>
							<div className="dark bg-background p-6 text-foreground">
								<GroupBoundary name={name}>
									<Preview />
								</GroupBoundary>
							</div>
						</div>
					</section>
				);
			})}
		</div>
	);
}

// Reuse the root across HMR re-evaluations of this module.
const container = document.getElementById("root") as HTMLElement;
const root = (import.meta.hot?.data.root ??
	createRoot(container)) as ReturnType<typeof createRoot>;
if (import.meta.hot) import.meta.hot.data.root = root;
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
