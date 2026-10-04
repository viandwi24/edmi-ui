"use client";

import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { useControllableState } from "@/registry/edmi/hooks/ai/use-controllable-state";
import { Button } from "@/registry/edmi/ui/button";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/registry/edmi/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/registry/edmi/ui/popover";

// Built on ui/popover + ui/command (DESIGN §5b): outline trigger, searchable list, hardware id in muted mono.

const deviceIdRegex = /\(([\da-fA-F]{4}:[\da-fA-F]{4})\)$/;

interface MicSelectorContextType {
	data: MediaDeviceInfo[];
	value: string | undefined;
	onValueChange?: (value: string) => void;
	open: boolean;
	onOpenChange?: (open: boolean) => void;
	width: number;
	setWidth?: (width: number) => void;
}

const MicSelectorContext = createContext<MicSelectorContextType>({
	data: [],
	onOpenChange: undefined,
	onValueChange: undefined,
	open: false,
	setWidth: undefined,
	value: undefined,
	width: 200,
});

export const useAudioDevices = () => {
	const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hasPermission, setHasPermission] = useState(false);

	const loadDevicesWithoutPermission = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const deviceList = await navigator.mediaDevices.enumerateDevices();
			const audioInputs = deviceList.filter(
				(device) => device.kind === "audioinput",
			);

			setDevices(audioInputs);
		} catch (caughtError) {
			const message =
				caughtError instanceof Error
					? caughtError.message
					: "Failed to get audio devices";

			setError(message);
			console.error("Error getting audio devices:", message);
		} finally {
			setLoading(false);
		}
	}, []);

	const loadDevicesWithPermission = useCallback(async () => {
		if (loading) {
			return;
		}

		try {
			setLoading(true);
			setError(null);

			const tempStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});

			for (const track of tempStream.getTracks()) {
				track.stop();
			}

			const deviceList = await navigator.mediaDevices.enumerateDevices();
			const audioInputs = deviceList.filter(
				(device) => device.kind === "audioinput",
			);

			setDevices(audioInputs);
			setHasPermission(true);
		} catch (caughtError) {
			const message =
				caughtError instanceof Error
					? caughtError.message
					: "Failed to get audio devices";

			setError(message);
			console.error("Error getting audio devices:", message);
		} finally {
			setLoading(false);
		}
	}, [loading]);

	useEffect(() => {
		loadDevicesWithoutPermission();
	}, [loadDevicesWithoutPermission]);

	useEffect(() => {
		const handleDeviceChange = () => {
			if (hasPermission) {
				loadDevicesWithPermission();
			} else {
				loadDevicesWithoutPermission();
			}
		};

		navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

		return () => {
			navigator.mediaDevices.removeEventListener(
				"devicechange",
				handleDeviceChange,
			);
		};
	}, [hasPermission, loadDevicesWithPermission, loadDevicesWithoutPermission]);

	return {
		devices,
		error,
		hasPermission,
		loadDevices: loadDevicesWithPermission,
		loading,
	};
};

export type MicSelectorProps = ComponentProps<typeof Popover> & {
	defaultValue?: string;
	value?: string | undefined;
	onValueChange?: (value: string | undefined) => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	/**
	 * Devices to list. When omitted the component enumerates the audio inputs itself (and asks for
	 * microphone permission the first time the list opens).
	 */
	devices?: MediaDeviceInfo[];
};

export const MicSelector = ({
	defaultValue,
	value: controlledValue,
	onValueChange: controlledOnValueChange,
	defaultOpen = false,
	open: controlledOpen,
	onOpenChange: controlledOnOpenChange,
	devices: devicesProp,
	...props
}: MicSelectorProps) => {
	const [value, onValueChange] = useControllableState<string | undefined>({
		defaultProp: defaultValue,
		onChange: controlledOnValueChange,
		prop: controlledValue,
	});
	const [open, onOpenChange] = useControllableState({
		defaultProp: defaultOpen,
		onChange: controlledOnOpenChange,
		prop: controlledOpen,
	});
	const [width, setWidth] = useState(200);
	const {
		devices: enumerated,
		loading,
		hasPermission,
		loadDevices,
	} = useAudioDevices();
	const devices = devicesProp ?? enumerated;

	useEffect(() => {
		if (!devicesProp && open && !hasPermission && !loading) {
			loadDevices();
		}
	}, [devicesProp, open, hasPermission, loading, loadDevices]);

	const contextValue = useMemo(
		() => ({
			data: devices,
			onOpenChange,
			onValueChange,
			open,
			setWidth,
			value,
			width,
		}),
		[devices, onOpenChange, onValueChange, open, value, width],
	);

	return (
		<MicSelectorContext.Provider value={contextValue}>
			<Popover {...props} onOpenChange={onOpenChange} open={open} />
		</MicSelectorContext.Provider>
	);
};

export type MicSelectorTriggerProps = ComponentProps<typeof PopoverTrigger>;

export const MicSelectorTrigger = ({
	children,
	className,
	...props
}: MicSelectorTriggerProps) => {
	const { setWidth } = useContext(MicSelectorContext);
	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		// Track the trigger width so the list below matches it.
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const newWidth = (entry.target as HTMLElement).offsetWidth;
				if (newWidth) {
					setWidth?.(newWidth);
				}
			}
		});

		if (ref.current) {
			resizeObserver.observe(ref.current);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, [setWidth]);

	return (
		<PopoverTrigger
			data-slot="ai-mic-selector-trigger"
			ref={ref}
			render={
				<Button
					variant="outline"
					className={cn("justify-start font-normal", className)}
				/>
			}
			{...props}
		>
			{children}
			<IconPlaceholder
				lucide="ChevronsUpDownIcon"
				tabler="IconSelector"
				hugeicons="UnfoldMoreIcon"
				phosphor="CaretUpDownIcon"
				remixicon="RiArrowUpDownLine"
				className="ml-auto size-3.5 shrink-0 text-muted-foreground"
			/>
		</PopoverTrigger>
	);
};

export type MicSelectorContentProps = ComponentProps<typeof Command> & {
	popoverOptions?: ComponentProps<typeof PopoverContent>;
};

export const MicSelectorContent = ({
	className,
	popoverOptions,
	...props
}: MicSelectorContentProps) => {
	const { width } = useContext(MicSelectorContext);
	const {
		className: popoverClassName,
		style: popoverStyle,
		...popoverRest
	} = popoverOptions ?? {};

	return (
		<PopoverContent
			data-slot="ai-mic-selector-content"
			align="start"
			className={cn(
				"w-auto gap-0 overflow-hidden p-0",
				popoverClassName as string,
			)}
			style={{ minWidth: 320, width, ...(popoverStyle as object) }}
			{...popoverRest}
		>
			<Command
				className={cn(
					"rounded-xl **:data-[slot=command-input-wrapper]:h-10",
					className,
				)}
				{...props}
			/>
		</PopoverContent>
	);
};

export type MicSelectorInputProps = ComponentProps<typeof CommandInput>;

export const MicSelectorInput = ({ ...props }: MicSelectorInputProps) => (
	<CommandInput placeholder="Search microphones..." {...props} />
);

export type MicSelectorListProps = Omit<
	ComponentProps<typeof CommandList>,
	"children"
> & {
	children: (devices: MediaDeviceInfo[]) => ReactNode;
};

export const MicSelectorList = ({
	children,
	...props
}: MicSelectorListProps) => {
	const { data } = useContext(MicSelectorContext);

	return <CommandList {...props}>{children(data)}</CommandList>;
};

export type MicSelectorEmptyProps = ComponentProps<typeof CommandEmpty>;

export const MicSelectorEmpty = ({
	children = "No microphone found.",
	...props
}: MicSelectorEmptyProps) => <CommandEmpty {...props}>{children}</CommandEmpty>;

export type MicSelectorItemProps = ComponentProps<typeof CommandItem>;

/** `value` is the device id; the selected item shows the check. */
export const MicSelectorItem = ({
	value,
	onSelect,
	...props
}: MicSelectorItemProps) => {
	const {
		value: selected,
		onValueChange,
		onOpenChange,
	} = useContext(MicSelectorContext);

	const handleSelect = useCallback(
		(currentValue: string) => {
			onValueChange?.(currentValue);
			onOpenChange?.(false);
			onSelect?.(currentValue);
		},
		[onValueChange, onOpenChange, onSelect],
	);

	return (
		<CommandItem
			data-checked={value !== undefined && value === selected}
			onSelect={handleSelect}
			value={value}
			{...props}
		/>
	);
};

export type MicSelectorLabelProps = ComponentProps<"span"> & {
	device: MediaDeviceInfo;
	/** Show the hardware id (`1a2b:3c4d`) in muted mono after the name. Default true. */
	showId?: boolean;
};

export const MicSelectorLabel = ({
	device,
	showId = true,
	className,
	...props
}: MicSelectorLabelProps) => {
	const matches = device.label.match(deviceIdRegex);

	if (!matches) {
		return (
			<span className={cn("min-w-0 truncate", className)} {...props}>
				{device.label}
			</span>
		);
	}

	const [, deviceId] = matches;
	const name = device.label.replace(deviceIdRegex, "").trim();

	return (
		<span
			className={cn("flex min-w-0 flex-1 items-center gap-2", className)}
			{...props}
		>
			<span className="truncate">{name}</span>
			{showId && (
				<span className="ml-auto shrink-0 font-mono text-[11.5px] text-muted-foreground">
					{deviceId}
				</span>
			)}
		</span>
	);
};

export type MicSelectorValueProps = ComponentProps<"span">;

export const MicSelectorValue = ({
	className,
	...props
}: MicSelectorValueProps) => {
	const { data, value } = useContext(MicSelectorContext);
	const currentDevice = data.find((d) => d.deviceId === value);

	if (!currentDevice) {
		return (
			<span
				className={cn(
					"flex-1 truncate text-left text-muted-foreground",
					className,
				)}
				{...props}
			>
				Select microphone...
			</span>
		);
	}

	return (
		<MicSelectorLabel
			className={cn("flex-1 truncate text-left", className)}
			device={currentDevice}
			showId={false}
			{...props}
		/>
	);
};
