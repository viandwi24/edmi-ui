import { IconPlaceholder } from "@/edmi/icon-placeholder";

export type IconName =
	| "search"
	| "map"
	| "sun"
	| "plus"
	| "chevronDown"
	| "chevronRight"
	| "home"
	| "minus"
	| "keyboard"
	| "bell"
	| "more"
	| "arrowUp"
	| "upload"
	| "grid"
	| "list"
	| "info"
	| "close"
	| "pencil"
	| "globe"
	| "mail"
	| "card"
	| "server"
	| "message"
	| "settings"
	| "lightbulb"
	| "plug"
	| "gift"
	| "database"
	| "coins"
	| "book"
	| "users"
	| "lifebuoy"
	| "archive"
	| "paperclip"
	| "listChecks"
	| "trash"
	| "check";

const extra: Partial<
	Record<
		IconName,
		{
			lucide: string;
			tabler: string;
			hugeicons: string;
			phosphor: string;
			remixicon: string;
		}
	>
> = {
	settings: {
		lucide: "SettingsIcon",
		tabler: "IconSettings",
		hugeicons: "Settings01Icon",
		phosphor: "GearIcon",
		remixicon: "RiSettingsLine",
	},
	lightbulb: {
		lucide: "LightbulbIcon",
		tabler: "IconBulb",
		hugeicons: "BulbIcon",
		phosphor: "LightbulbIcon",
		remixicon: "RiLightbulbLine",
	},
	plug: {
		lucide: "PlugIcon",
		tabler: "IconPlug",
		hugeicons: "PlugSocketIcon",
		phosphor: "PlugsConnectedIcon",
		remixicon: "RiPlugLine",
	},
	gift: {
		lucide: "GiftIcon",
		tabler: "IconGift",
		hugeicons: "GiftIcon",
		phosphor: "GiftIcon",
		remixicon: "RiGiftLine",
	},
	database: {
		lucide: "DatabaseIcon",
		tabler: "IconDatabase",
		hugeicons: "Database01Icon",
		phosphor: "DatabaseIcon",
		remixicon: "RiDatabase2Line",
	},
	coins: {
		lucide: "CoinsIcon",
		tabler: "IconCoins",
		hugeicons: "Coins01Icon",
		phosphor: "CoinsIcon",
		remixicon: "RiCoinsLine",
	},
	book: {
		lucide: "BookOpenIcon",
		tabler: "IconBook",
		hugeicons: "BookOpen02Icon",
		phosphor: "BookOpenIcon",
		remixicon: "RiBookOpenLine",
	},
	users: {
		lucide: "UsersIcon",
		tabler: "IconUsers",
		hugeicons: "UserGroupIcon",
		phosphor: "UsersThreeIcon",
		remixicon: "RiGroupLine",
	},
	lifebuoy: {
		lucide: "LifeBuoyIcon",
		tabler: "IconLifebuoy",
		hugeicons: "ChartRingIcon",
		phosphor: "LifebuoyIcon",
		remixicon: "RiLifebuoyLine",
	},
	archive: {
		lucide: "ArchiveIcon",
		tabler: "IconArchive",
		hugeicons: "Archive02Icon",
		phosphor: "ArchiveIcon",
		remixicon: "RiArchiveLine",
	},
	paperclip: {
		lucide: "PaperclipIcon",
		tabler: "IconPaperclip",
		hugeicons: "AttachmentIcon",
		phosphor: "PaperclipIcon",
		remixicon: "RiAttachmentLine",
	},
	listChecks: {
		lucide: "ListChecksIcon",
		tabler: "IconListCheck",
		hugeicons: "TaskDone01Icon",
		phosphor: "ListChecksIcon",
		remixicon: "RiListCheck2",
	},
	trash: {
		lucide: "Trash2Icon",
		tabler: "IconTrash",
		hugeicons: "Delete02Icon",
		phosphor: "TrashIcon",
		remixicon: "RiDeleteBinLine",
	},
	check: {
		lucide: "CheckIcon",
		tabler: "IconCheck",
		hugeicons: "Tick02Icon",
		phosphor: "CheckIcon",
		remixicon: "RiCheckLine",
	},
};

export function Icon({
	name,
	className,
}: {
	name: IconName;
	className?: string;
}) {
	const x = extra[name];
	if (x) return <IconPlaceholder {...x} className={className} />;
	switch (name) {
		case "search":
			return (
				<IconPlaceholder
					lucide="SearchIcon"
					tabler="IconSearch"
					hugeicons="Search01Icon"
					phosphor="MagnifyingGlassIcon"
					remixicon="RiSearchLine"
					className={className}
				/>
			);
		case "map":
			return (
				<IconPlaceholder
					lucide="MapIcon"
					tabler="IconMap"
					hugeicons="MapsIcon"
					phosphor="MapTrifoldIcon"
					remixicon="RiMapLine"
					className={className}
				/>
			);
		case "sun":
			return (
				<IconPlaceholder
					lucide="SunIcon"
					tabler="IconSun"
					hugeicons="Sun01Icon"
					phosphor="SunIcon"
					remixicon="RiSunLine"
					className={className}
				/>
			);
		case "plus":
			return (
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="Add01Icon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
					className={className}
				/>
			);
		case "chevronDown":
			return (
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconChevronDown"
					hugeicons="ArrowDown01Icon"
					phosphor="CaretDownIcon"
					remixicon="RiArrowDownSLine"
					className={className}
				/>
			);
		case "chevronRight":
			return (
				<IconPlaceholder
					lucide="ChevronRightIcon"
					tabler="IconChevronRight"
					hugeicons="ArrowRight01Icon"
					phosphor="CaretRightIcon"
					remixicon="RiArrowRightSLine"
					className={className}
				/>
			);
		case "home":
			return (
				<IconPlaceholder
					lucide="HomeIcon"
					tabler="IconHome"
					hugeicons="Home01Icon"
					phosphor="HouseIcon"
					remixicon="RiHomeLine"
					className={className}
				/>
			);
		case "minus":
			return (
				<IconPlaceholder
					lucide="MinusIcon"
					tabler="IconMinus"
					hugeicons="MinusSignIcon"
					phosphor="MinusIcon"
					remixicon="RiSubtractLine"
					className={className}
				/>
			);
		case "keyboard":
			return (
				<IconPlaceholder
					lucide="KeyboardIcon"
					tabler="IconKeyboard"
					hugeicons="KeyboardIcon"
					phosphor="KeyboardIcon"
					remixicon="RiKeyboardLine"
					className={className}
				/>
			);
		case "bell":
			return (
				<IconPlaceholder
					lucide="BellIcon"
					tabler="IconBell"
					hugeicons="Notification01Icon"
					phosphor="BellIcon"
					remixicon="RiNotificationLine"
					className={className}
				/>
			);
		case "more":
			return (
				<IconPlaceholder
					lucide="MoreHorizontalIcon"
					tabler="IconDots"
					hugeicons="MoreHorizontalCircle01Icon"
					phosphor="DotsThreeIcon"
					remixicon="RiMoreLine"
					className={className}
				/>
			);
		case "arrowUp":
			return (
				<IconPlaceholder
					lucide="ArrowUpIcon"
					tabler="IconArrowUp"
					hugeicons="ArrowUp01Icon"
					phosphor="ArrowUpIcon"
					remixicon="RiArrowUpLine"
					className={className}
				/>
			);
		case "upload":
			return (
				<IconPlaceholder
					lucide="UploadIcon"
					tabler="IconUpload"
					hugeicons="Upload01Icon"
					phosphor="UploadSimpleIcon"
					remixicon="RiUploadLine"
					className={className}
				/>
			);
		case "grid":
			return (
				<IconPlaceholder
					lucide="LayoutGridIcon"
					tabler="IconLayoutGrid"
					hugeicons="GridViewIcon"
					phosphor="SquaresFourIcon"
					remixicon="RiLayoutGridLine"
					className={className}
				/>
			);
		case "list":
			return (
				<IconPlaceholder
					lucide="ListIcon"
					tabler="IconList"
					hugeicons="ListViewIcon"
					phosphor="ListIcon"
					remixicon="RiListUnordered"
					className={className}
				/>
			);
		case "info":
			return (
				<IconPlaceholder
					lucide="InfoIcon"
					tabler="IconInfoCircle"
					hugeicons="InformationCircleIcon"
					phosphor="InfoIcon"
					remixicon="RiInformationLine"
					className={className}
				/>
			);
		case "close":
			return (
				<IconPlaceholder
					lucide="XIcon"
					tabler="IconX"
					hugeicons="Cancel01Icon"
					phosphor="XIcon"
					remixicon="RiCloseLine"
					className={className}
				/>
			);
		case "pencil":
			return (
				<IconPlaceholder
					lucide="PencilIcon"
					tabler="IconPencil"
					hugeicons="PencilEdit01Icon"
					phosphor="PencilSimpleIcon"
					remixicon="RiPencilLine"
					className={className}
				/>
			);
		case "globe":
			return (
				<IconPlaceholder
					lucide="GlobeIcon"
					tabler="IconWorld"
					hugeicons="Globe02Icon"
					phosphor="GlobeIcon"
					remixicon="RiGlobalLine"
					className={className}
				/>
			);
		case "mail":
			return (
				<IconPlaceholder
					lucide="MailIcon"
					tabler="IconMail"
					hugeicons="Mail01Icon"
					phosphor="EnvelopeSimpleIcon"
					remixicon="RiMailLine"
					className={className}
				/>
			);
		case "card":
			return (
				<IconPlaceholder
					lucide="CreditCardIcon"
					tabler="IconCreditCard"
					hugeicons="CreditCardIcon"
					phosphor="CreditCardIcon"
					remixicon="RiBankCardLine"
					className={className}
				/>
			);
		case "server":
			return (
				<IconPlaceholder
					lucide="ServerIcon"
					tabler="IconServer"
					hugeicons="ServerStackIcon"
					phosphor="HardDrivesIcon"
					remixicon="RiHardDriveLine"
					className={className}
				/>
			);
		case "message":
			return (
				<IconPlaceholder
					lucide="MessageCircleIcon"
					tabler="IconMessageCircle"
					hugeicons="Message01Icon"
					phosphor="ChatCircleIcon"
					remixicon="RiMessageLine"
					className={className}
				/>
			);
	}
}
