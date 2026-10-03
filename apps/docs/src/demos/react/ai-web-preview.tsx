import {
	WebPreview,
	WebPreviewBody,
	WebPreviewConsole,
	WebPreviewNavigation,
	WebPreviewNavigationButton,
	WebPreviewUrl,
} from "@edmi-react/components/ai/web-preview";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const page = `<!doctype html><html><body style="margin:0;padding:22px;font-family:system-ui,sans-serif;background:#f4f3ef;color:#1f1f1d">
<div style="font-size:20px;font-weight:600">MAG4</div>
<div style="font-size:12px;color:#777">Magnificent Four</div>
<div style="display:flex;gap:10px;margin-top:16px">
${[
	["NAV", "$0.9998"],
	["Holders", "412"],
	["AUM", "$49K"],
]
	.map(
		([k, v]) =>
			`<div style="width:130px;padding:10px 12px;background:#fff;border:1px solid #e4e2da;border-radius:10px"><div style="font-size:12px;color:#777">${k}</div><div style="font:16px ui-monospace,monospace">${v}</div></div>`,
	)
	.join("")}
</div></body></html>`;

const logs = [
	{
		level: "log" as const,
		message: "Mounted IndexPage",
		timestamp: new Date("2026-01-01T14:02:11"),
	},
	{
		level: "warn" as const,
		message: "Missing key prop in list",
		timestamp: new Date("2026-01-01T14:02:12"),
	},
];

function Navigation() {
	return (
		<WebPreviewNavigation>
			<WebPreviewNavigationButton tooltip="Back">
				<IconPlaceholder
					lucide="ChevronLeftIcon"
					tabler="IconChevronLeft"
					hugeicons="ArrowLeft01Icon"
					phosphor="CaretLeftIcon"
					remixicon="RiArrowLeftSLine"
					className="size-4"
				/>
			</WebPreviewNavigationButton>
			<WebPreviewNavigationButton tooltip="Forward">
				<IconPlaceholder
					lucide="ChevronRightIcon"
					tabler="IconChevronRight"
					hugeicons="ArrowRight01Icon"
					phosphor="CaretRightIcon"
					remixicon="RiArrowRightSLine"
					className="size-4"
				/>
			</WebPreviewNavigationButton>
			<WebPreviewNavigationButton tooltip="Reload">
				<IconPlaceholder
					lucide="RotateCwIcon"
					tabler="IconRotateClockwise2"
					hugeicons="Rotate01Icon"
					phosphor="ArrowClockwiseIcon"
					remixicon="RiRefreshLine"
					className="size-4"
				/>
			</WebPreviewNavigationButton>
			<WebPreviewUrl />
			<WebPreviewNavigationButton tooltip="Open in new tab">
				<IconPlaceholder
					lucide="ExternalLinkIcon"
					tabler="IconExternalLink"
					hugeicons="LinkSquare02Icon"
					phosphor="ArrowSquareOutIcon"
					remixicon="RiExternalLinkLine"
					className="size-4"
				/>
			</WebPreviewNavigationButton>
		</WebPreviewNavigation>
	);
}

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-5">
			<WebPreview defaultConsoleOpen defaultUrl="localhost:3000/indexes/mag4">
				<Navigation />
				<WebPreviewBody className="h-[220px]" srcDoc={page} />
				<WebPreviewConsole logs={logs} />
			</WebPreview>
			<WebPreview defaultUrl="localhost:3000/indexes/mag4">
				<Navigation />
				<WebPreviewBody
					className="h-[220px]"
					src="about:blank"
					loading={
						<div className="absolute inset-0 flex items-center justify-center gap-2.5 bg-background text-[13.5px] text-muted-foreground">
							<IconPlaceholder
								lucide="Loader2Icon"
								tabler="IconLoader"
								hugeicons="Loading03Icon"
								phosphor="SpinnerIcon"
								remixicon="RiLoaderLine"
								className="size-4 animate-spin"
							/>
							Generating preview…
						</div>
					}
				/>
			</WebPreview>
		</div>
	);
}
