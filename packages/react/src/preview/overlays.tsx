import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
} from "@/registry/edmi/ui/alert";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/registry/edmi/ui/alert-dialog";
import { Button } from "@/registry/edmi/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/edmi/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/registry/edmi/ui/drawer";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/registry/edmi/ui/hover-card";
import { Input } from "@/registry/edmi/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/registry/edmi/ui/popover";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/registry/edmi/ui/sheet";
import { Toaster, toast } from "@/registry/edmi/ui/sonner";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/edmi/ui/tooltip";
import { RaisedSection } from "./_raised";

export default function OverlaysPreview() {
	return (
		<div className="flex flex-col gap-8">
			<div className="grid gap-3">
				<Alert>
					<IconPlaceholder
						lucide="InfoIcon"
						tabler="IconInfoCircle"
						hugeicons="InformationCircleIcon"
						phosphor="InfoIcon"
						remixicon="RiInformationLine"
					/>
					<AlertTitle>Devnet only</AlertTitle>
					<AlertDescription>Prices come from a mock oracle.</AlertDescription>
				</Alert>
				<Alert variant="destructive">
					<IconPlaceholder
						lucide="OctagonXIcon"
						tabler="IconAlertOctagon"
						hugeicons="Alert02Icon"
						phosphor="WarningOctagonIcon"
						remixicon="RiErrorWarningLine"
					/>
					<AlertTitle>Transaction failed</AlertTitle>
					<AlertDescription>Slippage was above 1%.</AlertDescription>
				</Alert>
				<Alert variant="success">
					<IconPlaceholder
						lucide="CircleCheckIcon"
						tabler="IconCircleCheck"
						hugeicons="CheckmarkCircle02Icon"
						phosphor="CheckCircleIcon"
						remixicon="RiCheckboxCircleLine"
					/>
					<AlertTitle>Index launched</AlertTitle>
					<AlertDescription>MAG4 is live.</AlertDescription>
					<AlertAction>
						<Button size="xs" variant="outline">
							View
						</Button>
					</AlertAction>
				</Alert>
				<Alert variant="warning">
					<IconPlaceholder
						lucide="TriangleAlertIcon"
						tabler="IconAlertTriangle"
						hugeicons="Alert02Icon"
						phosphor="WarningIcon"
						remixicon="RiErrorWarningLine"
					/>
					<AlertTitle>Drift is 6.2%</AlertTitle>
					<AlertDescription>Above the 5% limit.</AlertDescription>
				</Alert>
				<Alert variant="info">
					<IconPlaceholder
						lucide="InfoIcon"
						tabler="IconInfoCircle"
						hugeicons="InformationCircleIcon"
						phosphor="InfoIcon"
						remixicon="RiInformationLine"
					/>
					<AlertTitle>Rebalance scheduled</AlertTitle>
					<AlertDescription>Next run at 09:00 UTC.</AlertDescription>
				</Alert>
			</div>
			<div className="flex flex-wrap items-start gap-3">
				<Popover defaultOpen>
					<PopoverTrigger render={<Button variant="outline" />}>
						Set limits
					</PopoverTrigger>
					<PopoverContent align="start" className="w-80">
						<PopoverHeader>
							<PopoverTitle>Rebalance limits</PopoverTitle>
							<PopoverDescription>
								Applied to the next keeper run.
							</PopoverDescription>
						</PopoverHeader>
						<Input defaultValue="5%" />
					</PopoverContent>
				</Popover>
				<Dialog>
					<DialogTrigger render={<Button variant="outline" />}>
						Dialog
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>Shown on your indexes.</DialogDescription>
						</DialogHeader>
						<Input defaultValue="Dewi Lestari" />
						<DialogFooter>
							<DialogClose render={<Button variant="outline" />}>
								Cancel
							</DialogClose>
							<Button>Save changes</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<AlertDialog>
					<AlertDialogTrigger render={<Button variant="outline" />}>
						Alert dialog
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Close this index?</AlertDialogTitle>
							<AlertDialogDescription>
								This cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction variant="destructive">
								Close index
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<Sheet>
					<SheetTrigger render={<Button variant="outline" />}>
						Sheet
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Filters</SheetTitle>
							<SheetDescription>Narrow the index list.</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
				<Drawer>
					<DrawerTrigger render={<Button variant="outline" />}>
						Drawer
					</DrawerTrigger>
					<DrawerContent showHandle>
						<DrawerHeader>
							<DrawerTitle>Join MAG4</DrawerTitle>
							<DrawerDescription>Amount in USDC</DrawerDescription>
						</DrawerHeader>
						<DrawerFooter className="flex-row">
							<DrawerClose
								render={<Button variant="outline" className="flex-1" />}
							>
								Cancel
							</DrawerClose>
							<Button className="flex-1">Join</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
				<Toaster />
				<Button
					variant="outline"
					onClick={() =>
						toast.success("Joined MAG4", { description: "98,209 shares" })
					}
				>
					Toast
				</Button>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger render={<Button variant="outline" />}>
							Tooltip
						</TooltipTrigger>
						<TooltipContent>Copy address</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<HoverCard>
					<HoverCardTrigger
						render={<a href="#dewi" className="text-sm underline" />}
					>
						@dewi
					</HoverCardTrigger>
					<HoverCardContent>Dewi Lestari, 3 indexes.</HoverCardContent>
				</HoverCard>
			</div>
			<RaisedSection>
				<div className="flex flex-wrap items-start gap-3">
					<Popover defaultOpen>
						<PopoverTrigger
							render={<Button variant="outline" elevation="raised" />}
						>
							Raised popover
						</PopoverTrigger>
						<PopoverContent elevation="raised" align="start" className="w-64">
							<PopoverHeader>
								<PopoverTitle>Rebalance limits</PopoverTitle>
							</PopoverHeader>
						</PopoverContent>
					</Popover>
					<Dialog>
						<DialogTrigger
							render={<Button variant="outline" elevation="raised" />}
						>
							Raised dialog
						</DialogTrigger>
						<DialogContent elevation="raised">
							<DialogHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>Shown on your indexes.</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button elevation="raised">Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<AlertDialog>
						<AlertDialogTrigger
							render={<Button variant="outline" elevation="raised" />}
						>
							Raised alert dialog
						</AlertDialogTrigger>
						<AlertDialogContent elevation="raised">
							<AlertDialogHeader>
								<AlertDialogTitle>Close this index?</AlertDialogTitle>
								<AlertDialogDescription>
									This cannot be undone.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction variant="destructive" elevation="raised">
									Close index
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					<Button
						variant="outline"
						elevation="raised"
						onClick={() =>
							toast.success("Joined MAG4", {
								description: "98,209 shares",
								classNames: {
									toast: "border-b-lip! shadow-[0_3px_0_var(--lip)]!",
								},
							})
						}
					>
						Raised toast
					</Button>
				</div>
			</RaisedSection>
		</div>
	);
}
