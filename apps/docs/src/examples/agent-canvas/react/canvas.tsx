import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { TooltipProvider } from "@edmi-react/ui/tooltip";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import { depts, plant, plantHead, RING, TILE } from "../data";
import { Icon } from "./icons";
import {
	NewTaskDialog,
	NotificationsPopover,
	OrgMenu,
	RoadmapPopover,
	SearchPalette,
	ShortcutsDialog,
	ThemeTip,
} from "./overlays";
import { Pixels } from "./pixel";

const grid =
	"[background-image:linear-gradient(to_right,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px)] [background-size:48px_48px]";

function Thumb({ x, y }: { x: number; y: number }) {
	return (
		<span
			className="pointer-events-none absolute overflow-hidden rounded-[3px] border border-border bg-muted"
			style={{ left: x, top: y, width: TILE.w, height: TILE.h }}
		>
			<i className="absolute top-2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-border" />
			<i className="absolute top-3.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-border" />
		</span>
	);
}

export function Canvas({
	onNewTask,
	onOpenPanel,
}: {
	onNewTask: (name: string) => void;
	onOpenPanel: () => void;
}) {
	const [zoom, setZoom] = useState(100);
	const [pan, setPan] = useState({ x: 0, y: 0 });
	const [dragging, setDragging] = useState(false);
	const drag = useRef<{ id: number; x: number; y: number } | null>(null);
	const [hub, setHub] = useState(true);
	const [active, setActive] = useState<string | null>(null);
	const [palette, setPalette] = useState(false);
	const [shortcuts, setShortcuts] = useState(false);
	const [taskDialog, setTaskDialog] = useState(false);
	const pick = (id: string) => setActive((a) => (a === id ? null : id));
	const step = (d: number) =>
		setZoom((z) => Math.min(160, Math.max(60, z + d)));
	const reset = () => {
		setZoom(100);
		setPan({ x: 0, y: 0 });
	};

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setPalette((p) => !p);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const down = (e: PointerEvent<HTMLDivElement>) => {
		const t = e.target as HTMLElement;
		// portalled overlays bubble through the React tree: only pan from the canvas itself
		if (!e.currentTarget.contains(t) || t.closest("button,[data-nopan]"))
			return;
		drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
		e.currentTarget.setPointerCapture(e.pointerId);
		setDragging(true);
	};
	const move = (e: PointerEvent<HTMLDivElement>) => {
		const d = drag.current;
		if (!d || d.id !== e.pointerId) return;
		const dx = e.clientX - d.x;
		const dy = e.clientY - d.y;
		d.x = e.clientX;
		d.y = e.clientY;
		setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
	};
	const up = (e: PointerEvent<HTMLDivElement>) => {
		if (drag.current?.id !== e.pointerId) return;
		drag.current = null;
		setDragging(false);
	};

	return (
		<TooltipProvider>
			<div
				className={`absolute inset-0 touch-none overflow-hidden bg-card select-none ${grid} ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
				style={{ backgroundPosition: `${pan.x}px ${pan.y}px` }}
				onPointerDown={down}
				onPointerMove={move}
				onPointerUp={up}
				onPointerCancel={up}
			>
				<div
					className="absolute top-[46.5%] left-1/2 size-0 origin-top-left lg:left-[calc((100%-438px)*0.58)]"
					style={{
						transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`,
					}}
				>
					<svg
						className="pointer-events-none absolute overflow-visible"
						width="1"
						height="1"
						aria-hidden="true"
					>
						<circle
							r={RING}
							fill="none"
							stroke="var(--foreground)"
							strokeOpacity="0.12"
							strokeWidth="1.5"
						/>
						{depts.map((d) => (
							<line
								key={`s-${d.id}`}
								x1="0"
								y1="0"
								x2={d.node[0]}
								y2={d.node[1]}
								stroke="var(--foreground)"
								strokeOpacity="0.2"
								strokeDasharray="4 4"
							/>
						))}
						{depts.map((d) => (
							<g key={`c-${d.id}`}>
								<path
									d={d.path}
									fill="none"
									stroke="var(--foreground)"
									strokeOpacity={active === d.id ? 0.9 : 0.35}
									strokeWidth={active === d.id ? 1.5 : 1}
									strokeDasharray="4 4"
								/>
								<circle
									cx={d.end[0]}
									cy={d.end[1]}
									r="3"
									fill="var(--border)"
								/>
							</g>
						))}
					</svg>

					{depts.map((d) => (
						<div key={d.id}>
							{d.thumbs.map((t) => (
								<Thumb key={`${t.x}-${t.y}`} x={t.x} y={t.y} />
							))}
							<Button
								type="button"
								variant={active === d.id ? "secondary" : "outline"}
								size="sm"
								onClick={() => pick(d.id)}
								aria-pressed={active === d.id}
								className="absolute"
								style={{
									left: d.plate.x,
									top: d.plate.y,
									width: d.plate.w,
									height: d.grid ? 32 : d.plate.h,
								}}
							>
								{d.label}
							</Button>
							{d.grid && (
								<span
									className="pointer-events-none absolute grid grid-cols-3 gap-px overflow-hidden p-0.5"
									style={{
										left: d.plate.x,
										top: d.plate.y + 32,
										width: d.plate.w,
										height: d.plate.h - 32,
									}}
								>
									{[0, 1, 2, 3, 4, 5].map((n) => (
										<span
											key={n}
											className="relative overflow-hidden rounded-[3px] border border-border bg-muted"
										>
											<i className="absolute top-2 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-border" />
										</span>
									))}
								</span>
							)}
						</div>
					))}

					<Pixels
						w={plant.w}
						h={plant.h}
						rects={plant.rects}
						className="pointer-events-none absolute top-[-78px] left-[-18px] w-9 opacity-80"
					/>
					<button
						type="button"
						aria-label="Atlas"
						aria-pressed={hub}
						onClick={() => setHub((h) => !h)}
						className={`absolute top-[-29px] left-[-49px] h-[58px] w-[98px] rounded-xl p-0.5 outline-none ${hub ? "ring-2 ring-ring" : ""}`}
					>
						<Card
							elevation={hub ? "floating" : "raised"}
							className="size-full items-center justify-center gap-0 py-0"
						>
							<span className="font-serif text-[19px] leading-none tracking-tight">
								Atlas
							</span>
						</Card>
					</button>

					{depts.map((d) => (
						<Button
							key={`n-${d.id}`}
							type="button"
							variant={active === d.id ? "secondary" : "outline"}
							size="icon-sm"
							elevation="raised"
							aria-label={d.label}
							onClick={() => pick(d.id)}
							className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
							style={{ left: d.node[0], top: d.node[1] }}
						>
							<AgentAvatar seed={d.id} color={d.color} size={13} tile={false} />
						</Button>
					))}
				</div>

				<div className="absolute top-4 left-4 flex items-center gap-2">
					<OrgMenu onShortcuts={() => setShortcuts(true)} />
					<Button variant="secondary" size="sm" elevation="raised">
						<Pixels
							w={plantHead.w}
							h={plantHead.h}
							rects={plantHead.rects}
							className="h-3 w-3.5"
						/>
						Upgrade
					</Button>
				</div>

				<div className="absolute top-4 right-3 flex items-center gap-1.5 lg:right-[485px]">
					<Button
						variant="ghost"
						size="icon-xs"
						aria-label="Search"
						onClick={() => setPalette(true)}
					>
						<Icon name="search" />
					</Button>
					<RoadmapPopover />
					<ThemeTip />
					<Button
						variant="outline"
						size="sm"
						onClick={() => setTaskDialog(true)}
					>
						<Icon name="plus" />
						New task
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						className="lg:hidden"
						aria-label="Open panel"
						onClick={onOpenPanel}
					>
						<Icon name="message" />
					</Button>
				</div>

				<NotificationsPopover />

				<Card
					data-nopan
					elevation="raised"
					className="absolute right-3 bottom-4 flex-row items-center gap-0.5 p-1 py-1 lg:right-[485px]"
				>
					<Button
						variant="ghost"
						size="icon-xs"
						aria-label="Reset view"
						onClick={reset}
					>
						<Icon name="home" />
					</Button>
					<span className="w-12 text-center font-mono text-xs">{zoom}%</span>
					<Button
						variant="ghost"
						size="icon-xs"
						aria-label="Zoom in"
						onClick={() => step(10)}
						disabled={zoom >= 160}
					>
						<Icon name="plus" />
					</Button>
					<Button
						variant="ghost"
						size="icon-xs"
						aria-label="Zoom out"
						onClick={() => step(-10)}
						disabled={zoom <= 60}
					>
						<Icon name="minus" />
					</Button>
					<Button
						variant="ghost"
						size="icon-xs"
						aria-label="Shortcuts"
						onClick={() => setShortcuts(true)}
					>
						<Icon name="keyboard" />
					</Button>
				</Card>

				<SearchPalette
					open={palette}
					onOpenChange={setPalette}
					onNewTask={() => setTaskDialog(true)}
					onRoadmap={() => {}}
					onDepartment={(id) => setActive(id)}
				/>
				<ShortcutsDialog open={shortcuts} onOpenChange={setShortcuts} />
				<NewTaskDialog
					open={taskDialog}
					onOpenChange={setTaskDialog}
					onCreate={onNewTask}
				/>
			</div>
		</TooltipProvider>
	);
}
