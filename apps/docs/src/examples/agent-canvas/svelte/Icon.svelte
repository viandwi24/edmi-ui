<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let { name, class: className }: { name: string; class?: string } = $props();

	const extra: Record<string, { lucide: string; tabler: string; hugeicons: string; phosphor: string; remixicon: string }> = {
		settings: { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "Settings01Icon", phosphor: "GearIcon", remixicon: "RiSettingsLine" },
		lightbulb: { lucide: "LightbulbIcon", tabler: "IconBulb", hugeicons: "BulbIcon", phosphor: "LightbulbIcon", remixicon: "RiLightbulbLine" },
		plug: { lucide: "PlugIcon", tabler: "IconPlug", hugeicons: "PlugSocketIcon", phosphor: "PlugsConnectedIcon", remixicon: "RiPlugLine" },
		gift: { lucide: "GiftIcon", tabler: "IconGift", hugeicons: "GiftIcon", phosphor: "GiftIcon", remixicon: "RiGiftLine" },
		database: { lucide: "DatabaseIcon", tabler: "IconDatabase", hugeicons: "Database01Icon", phosphor: "DatabaseIcon", remixicon: "RiDatabase2Line" },
		coins: { lucide: "CoinsIcon", tabler: "IconCoins", hugeicons: "Coins01Icon", phosphor: "CoinsIcon", remixicon: "RiCoinsLine" },
		book: { lucide: "BookOpenIcon", tabler: "IconBook", hugeicons: "BookOpen02Icon", phosphor: "BookOpenIcon", remixicon: "RiBookOpenLine" },
		users: { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserGroupIcon", phosphor: "UsersThreeIcon", remixicon: "RiGroupLine" },
		lifebuoy: { lucide: "LifeBuoyIcon", tabler: "IconLifebuoy", hugeicons: "ChartRingIcon", phosphor: "LifebuoyIcon", remixicon: "RiLifebuoyLine" },
		archive: { lucide: "ArchiveIcon", tabler: "IconArchive", hugeicons: "Archive02Icon", phosphor: "ArchiveIcon", remixicon: "RiArchiveLine" },
		paperclip: { lucide: "PaperclipIcon", tabler: "IconPaperclip", hugeicons: "AttachmentIcon", phosphor: "PaperclipIcon", remixicon: "RiAttachmentLine" },
		listChecks: { lucide: "ListChecksIcon", tabler: "IconListCheck", hugeicons: "TaskDone01Icon", phosphor: "ListChecksIcon", remixicon: "RiListCheck2" },
		trash: { lucide: "Trash2Icon", tabler: "IconTrash", hugeicons: "Delete02Icon", phosphor: "TrashIcon", remixicon: "RiDeleteBinLine" },
		check: { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine" },
	};

</script>

{#if extra[name]}
	<IconPlaceholder {...extra[name]} class={className} />
{:else if name === "search"}
	<IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="Search01Icon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" class={className} />
{:else if name === "map"}
	<IconPlaceholder lucide="MapIcon" tabler="IconMap" hugeicons="MapsIcon" phosphor="MapTrifoldIcon" remixicon="RiMapLine" class={className} />
{:else if name === "sun"}
	<IconPlaceholder lucide="SunIcon" tabler="IconSun" hugeicons="Sun01Icon" phosphor="SunIcon" remixicon="RiSunLine" class={className} />
{:else if name === "plus"}
	<IconPlaceholder lucide="PlusIcon" tabler="IconPlus" hugeicons="Add01Icon" phosphor="PlusIcon" remixicon="RiAddLine" class={className} />
{:else if name === "chevronDown"}
	<IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" class={className} />
{:else if name === "chevronRight"}
	<IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" class={className} />
{:else if name === "home"}
	<IconPlaceholder lucide="HomeIcon" tabler="IconHome" hugeicons="Home01Icon" phosphor="HouseIcon" remixicon="RiHomeLine" class={className} />
{:else if name === "minus"}
	<IconPlaceholder lucide="MinusIcon" tabler="IconMinus" hugeicons="MinusSignIcon" phosphor="MinusIcon" remixicon="RiSubtractLine" class={className} />
{:else if name === "keyboard"}
	<IconPlaceholder lucide="KeyboardIcon" tabler="IconKeyboard" hugeicons="KeyboardIcon" phosphor="KeyboardIcon" remixicon="RiKeyboardLine" class={className} />
{:else if name === "bell"}
	<IconPlaceholder lucide="BellIcon" tabler="IconBell" hugeicons="Notification01Icon" phosphor="BellIcon" remixicon="RiNotificationLine" class={className} />
{:else if name === "more"}
	<IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeIcon" remixicon="RiMoreLine" class={className} />
{:else if name === "arrowUp"}
	<IconPlaceholder lucide="ArrowUpIcon" tabler="IconArrowUp" hugeicons="ArrowUp01Icon" phosphor="ArrowUpIcon" remixicon="RiArrowUpLine" class={className} />
{:else if name === "upload"}
	<IconPlaceholder lucide="UploadIcon" tabler="IconUpload" hugeicons="Upload01Icon" phosphor="UploadSimpleIcon" remixicon="RiUploadLine" class={className} />
{:else if name === "grid"}
	<IconPlaceholder lucide="LayoutGridIcon" tabler="IconLayoutGrid" hugeicons="GridViewIcon" phosphor="SquaresFourIcon" remixicon="RiLayoutGridLine" class={className} />
{:else if name === "list"}
	<IconPlaceholder lucide="ListIcon" tabler="IconList" hugeicons="ListViewIcon" phosphor="ListIcon" remixicon="RiListUnordered" class={className} />
{:else if name === "info"}
	<IconPlaceholder lucide="InfoIcon" tabler="IconInfoCircle" hugeicons="InformationCircleIcon" phosphor="InfoIcon" remixicon="RiInformationLine" class={className} />
{:else if name === "close"}
	<IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" class={className} />
{:else if name === "pencil"}
	<IconPlaceholder lucide="PencilIcon" tabler="IconPencil" hugeicons="PencilEdit01Icon" phosphor="PencilSimpleIcon" remixicon="RiPencilLine" class={className} />
{:else if name === "globe"}
	<IconPlaceholder lucide="GlobeIcon" tabler="IconWorld" hugeicons="Globe02Icon" phosphor="GlobeIcon" remixicon="RiGlobalLine" class={className} />
{:else if name === "mail"}
	<IconPlaceholder lucide="MailIcon" tabler="IconMail" hugeicons="Mail01Icon" phosphor="EnvelopeSimpleIcon" remixicon="RiMailLine" class={className} />
{:else if name === "card"}
	<IconPlaceholder lucide="CreditCardIcon" tabler="IconCreditCard" hugeicons="CreditCardIcon" phosphor="CreditCardIcon" remixicon="RiBankCardLine" class={className} />
{:else if name === "server"}
	<IconPlaceholder lucide="ServerIcon" tabler="IconServer" hugeicons="ServerStackIcon" phosphor="HardDrivesIcon" remixicon="RiHardDriveLine" class={className} />
{:else if name === "message"}
	<IconPlaceholder lucide="MessageCircleIcon" tabler="IconMessageCircle" hugeicons="Message01Icon" phosphor="ChatCircleIcon" remixicon="RiMessageLine" class={className} />
{/if}
