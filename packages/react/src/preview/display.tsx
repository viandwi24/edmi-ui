import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { AspectRatio } from "@/registry/edmi/ui/aspect-ratio";
import {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentMedia,
	AttachmentTitle,
} from "@/registry/edmi/ui/attachment";
import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
} from "@/registry/edmi/ui/avatar";
import { Button } from "@/registry/edmi/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/edmi/ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/edmi/ui/empty";
import {
	InsetPanel,
	InsetPanelBody,
	InsetPanelFooter,
	InsetPanelHeader,
} from "@/registry/edmi/ui/inset-panel";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@/registry/edmi/ui/item";
import {
	Progress,
	ProgressLabel,
	ProgressValue,
} from "@/registry/edmi/ui/progress";
import { Separator } from "@/registry/edmi/ui/separator";
import { Skeleton } from "@/registry/edmi/ui/skeleton";
import { Spinner } from "@/registry/edmi/ui/spinner";
import { RaisedSection } from "./_raised";

export default function DisplayPreview() {
	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-5 sm:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Portfolio</CardTitle>
						<CardDescription>Holdings across all indexes.</CardDescription>
						<CardAction>
							<Button size="sm" variant="outline">
								Edit
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<p className="font-mono text-2xl">$12,480.20</p>
					</CardContent>
					<CardFooter>
						<Button size="sm">Deposit</Button>
						<Button size="sm" variant="ghost">
							Cancel
						</Button>
					</CardFooter>
				</Card>
				<Card size="sm">
					<CardHeader>
						<CardTitle>Small card</CardTitle>
						<CardDescription>size="sm" spacing.</CardDescription>
					</CardHeader>
					<CardContent>Body copy sits on the card surface.</CardContent>
				</Card>
			</div>
			<div className="grid gap-5 sm:grid-cols-2">
				<InsetPanel>
					<InsetPanelHeader>Inset panel</InsetPanelHeader>
					<InsetPanelBody fade className="h-32 p-4 text-sm">
						Body runs edge to edge with a faded bottom.
					</InsetPanelBody>
					<InsetPanelFooter>Footer back on the shell</InsetPanelFooter>
				</InsetPanel>
				<InsetPanel>
					<InsetPanelHeader>No footer</InsetPanelHeader>
					<InsetPanelBody className="h-32 p-4 text-sm">
						Body runs to the bottom edge.
					</InsetPanelBody>
				</InsetPanel>
			</div>
			<div className="grid gap-5 sm:grid-cols-2">
				<div className="flex flex-col gap-4">
					<Item variant="outline">
						<ItemMedia variant="icon">
							<IconPlaceholder
								lucide="WalletIcon"
								tabler="IconWallet"
								hugeicons="WalletIcon"
								phosphor="WalletIcon"
								remixicon="RiWalletLine"
							/>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Phantom wallet</ItemTitle>
							<ItemDescription>7nXK...Qp2d</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button size="sm" variant="outline">
								Disconnect
							</Button>
						</ItemActions>
					</Item>
					<Item variant="muted" size="sm">
						<ItemContent>
							<ItemTitle>Keeper is on</ItemTitle>
							<ItemDescription>Rebalances at 5% drift.</ItemDescription>
						</ItemContent>
					</Item>
					<ItemGroup>
						<Item>
							<ItemMedia variant="icon">
								<IconPlaceholder
									lucide="UserIcon"
									tabler="IconUser"
									hugeicons="UserIcon"
									phosphor="UserIcon"
									remixicon="RiUserLine"
								/>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Profile</ItemTitle>
								<ItemDescription>Name and avatar</ItemDescription>
							</ItemContent>
						</Item>
						<ItemSeparator />
						<Item size="xs">
							<ItemContent>
								<ItemTitle>Wallets</ItemTitle>
							</ItemContent>
						</Item>
					</ItemGroup>
				</div>
				<div className="flex flex-col gap-5">
					<div className="flex items-center gap-4">
						<Avatar size="sm">
							<AvatarFallback>DL</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>EL</AvatarFallback>
						</Avatar>
						<Avatar size="lg">
							<AvatarFallback>SC</AvatarFallback>
							<AvatarBadge />
						</Avatar>
						<AvatarGroup>
							<Avatar>
								<AvatarFallback>NG</AvatarFallback>
							</Avatar>
							<Avatar>
								<AvatarFallback>ER</AvatarFallback>
							</Avatar>
							<AvatarGroupCount>+9</AvatarGroupCount>
						</AvatarGroup>
					</div>
					<div className="flex gap-4">
						<AspectRatio
							ratio={16 / 9}
							className="w-40 rounded-lg border border-border bg-muted"
						/>
						<Separator orientation="vertical" className="h-12" />
						<div className="flex items-center gap-2 text-sm">
							<Spinner /> Loading
						</div>
					</div>
					<div className="flex items-center gap-3">
						<Skeleton className="size-10 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-3.5 w-48" />
							<Skeleton className="h-3.5 w-32" />
						</div>
					</div>
					<Progress value={40}>
						<ProgressLabel>Raising for launch</ProgressLabel>
						<ProgressValue />
					</Progress>
					<Progress value={65} variant="brand" />
				</div>
			</div>
			<div className="flex flex-wrap gap-3">
				<Attachment>
					<AttachmentMedia>
						<IconPlaceholder
							lucide="FileTextIcon"
							tabler="IconFileText"
							hugeicons="FileIcon"
							phosphor="FileTextIcon"
							remixicon="RiFileTextLine"
						/>
					</AttachmentMedia>
					<AttachmentContent>
						<AttachmentTitle>thesis.pdf</AttachmentTitle>
						<AttachmentDescription>PDF, 2.4 MB</AttachmentDescription>
					</AttachmentContent>
					<AttachmentActions>
						<AttachmentAction aria-label="Remove">
							<IconPlaceholder
								lucide="XIcon"
								tabler="IconX"
								hugeicons="Cancel01Icon"
								phosphor="XIcon"
								remixicon="RiCloseLine"
							/>
						</AttachmentAction>
					</AttachmentActions>
				</Attachment>
				<Attachment state="uploading">
					<AttachmentMedia>
						<Spinner />
					</AttachmentMedia>
					<AttachmentContent>
						<AttachmentTitle>weights.csv</AttachmentTitle>
						<AttachmentDescription>Uploading</AttachmentDescription>
					</AttachmentContent>
				</Attachment>
				<Attachment state="error">
					<AttachmentMedia>
						<IconPlaceholder
							lucide="CircleAlertIcon"
							tabler="IconExclamationCircle"
							hugeicons="AlertCircleIcon"
							phosphor="WarningCircleIcon"
							remixicon="RiErrorWarningLine"
						/>
					</AttachmentMedia>
					<AttachmentContent>
						<AttachmentTitle>backtest.xlsx</AttachmentTitle>
						<AttachmentDescription>Upload failed</AttachmentDescription>
					</AttachmentContent>
				</Attachment>
				<Attachment state="idle" size="sm">
					<AttachmentMedia>
						<IconPlaceholder
							lucide="FileTextIcon"
							tabler="IconFileText"
							hugeicons="FileIcon"
							phosphor="FileTextIcon"
							remixicon="RiFileTextLine"
						/>
					</AttachmentMedia>
					<AttachmentContent>
						<AttachmentTitle>idle.pdf</AttachmentTitle>
					</AttachmentContent>
				</Attachment>
			</div>
			<div className="grid gap-5 sm:grid-cols-2">
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<IconPlaceholder
								lucide="BriefcaseIcon"
								tabler="IconBriefcase"
								hugeicons="Briefcase01Icon"
								phosphor="BriefcaseIcon"
								remixicon="RiBriefcaseLine"
							/>
						</EmptyMedia>
						<EmptyTitle>No positions yet</EmptyTitle>
						<EmptyDescription>
							Your holdings will show up here.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button>Explore indexes</Button>
					</EmptyContent>
				</Empty>
				<Empty className="border-[1.5px] border-input">
					<EmptyHeader>
						<EmptyTitle>Dashed outline</EmptyTitle>
						<EmptyDescription>Outline equals dashed.</EmptyDescription>
					</EmptyHeader>
				</Empty>
			</div>
			<RaisedSection>
				<div className="grid gap-5 sm:grid-cols-2">
					<Card raised>
						<CardHeader>
							<CardTitle>Portfolio</CardTitle>
							<CardDescription>Holdings across all indexes.</CardDescription>
							<CardAction>
								<Button size="sm" variant="outline" raised>
									Edit
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent>
							<p className="font-mono text-2xl">$12,480.20</p>
						</CardContent>
						<CardFooter>
							<Button size="sm" raised>
								Deposit
							</Button>
						</CardFooter>
					</Card>
					<InsetPanel raised>
						<InsetPanelHeader>Inset panel</InsetPanelHeader>
						<InsetPanelBody fade className="h-32 p-4 text-sm">
							Raised inset panel.
						</InsetPanelBody>
						<InsetPanelFooter>Footer back on the shell</InsetPanelFooter>
					</InsetPanel>
				</div>
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon" raised>
							<IconPlaceholder
								lucide="InboxIcon"
								tabler="IconInbox"
								hugeicons="InboxIcon"
								phosphor="TrayIcon"
								remixicon="RiInboxLine"
							/>
						</EmptyMedia>
						<EmptyTitle>No indexes yet</EmptyTitle>
					</EmptyHeader>
				</Empty>
			</RaisedSection>
		</div>
	);
}
