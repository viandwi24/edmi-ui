"use client";

import { cn } from "cn";
import type { ComponentProps, HTMLAttributes } from "react";
import { createContext, useContext, useMemo } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Badge } from "@/registry/edmi/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface SchemaParameter {
	name: string;
	type: string;
	required?: boolean;
	description?: string;
	location?: "path" | "query" | "header";
}

interface SchemaProperty {
	name: string;
	type: string;
	required?: boolean;
	description?: string;
	properties?: SchemaProperty[];
	items?: SchemaProperty;
}

interface SchemaDisplayContextType {
	method: HttpMethod;
	path: string;
	description?: string;
	parameters?: SchemaParameter[];
	requestBody?: SchemaProperty[];
	responseBody?: SchemaProperty[];
}

const SchemaDisplayContext = createContext<SchemaDisplayContextType>({
	method: "GET",
	path: "",
});

// Solid soft fills, never /NN opacity (DESIGN §4.16). GET success, POST info, PUT/PATCH warning, DELETE destructive.
const methodStyles: Record<HttpMethod, string> = {
	DELETE: "bg-destructive-soft text-destructive-text",
	GET: "bg-success-soft text-success-text",
	PATCH: "bg-warning-soft text-warning-text",
	POST: "bg-info-soft text-info-text",
	PUT: "bg-warning-soft text-warning-text",
};

const sectionTrigger =
	"group/ai-schema-trigger flex w-full items-center gap-2 px-4 py-2 text-left text-[13.5px] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring";

const sectionChevron =
	"size-3.5 shrink-0 transition-transform group-data-[panel-open]/ai-schema-trigger:rotate-180";

const panel =
	"h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0";

const RequiredBadge = () => (
	<Badge className="h-[18px] text-[10.5px]" variant="warning">
		required
	</Badge>
);

const SectionChevron = ({ className }: { className?: string }) => (
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconChevronDown"
		hugeicons="ArrowDown01Icon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
		className={cn(sectionChevron, className)}
	/>
);

export type SchemaDisplayHeaderProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayHeader = ({
	className,
	children,
	...props
}: SchemaDisplayHeaderProps) => (
	<div
		data-slot="ai-schema-display-header"
		className={cn("flex items-center gap-2.5 px-4 py-3.5", className)}
		{...props}
	>
		{children}
	</div>
);

export type SchemaDisplayMethodProps = HTMLAttributes<HTMLSpanElement>;

export const SchemaDisplayMethod = ({
	className,
	children,
	...props
}: SchemaDisplayMethodProps) => {
	const { method } = useContext(SchemaDisplayContext);

	return (
		<span
			data-slot="ai-schema-display-method"
			data-method={method}
			className={cn(
				"inline-flex rounded-[5px] px-[7px] py-0.5 font-mono text-[11px] font-semibold",
				methodStyles[method],
				className,
			)}
			{...props}
		>
			{children ?? method}
		</span>
	);
};

const PATH_PARAM = /(\{[^}]+\})/g;

export type SchemaDisplayPathProps = HTMLAttributes<HTMLSpanElement>;

export const SchemaDisplayPath = ({
	className,
	children,
	...props
}: SchemaDisplayPathProps) => {
	const { path } = useContext(SchemaDisplayContext);

	return (
		<span
			data-slot="ai-schema-display-path"
			className={cn("font-mono text-[13.5px]", className)}
			{...props}
		>
			{children ??
				path.split(PATH_PARAM).map((part, index) =>
					part.startsWith("{") ? (
						// biome-ignore lint/suspicious/noArrayIndexKey: static split of the path string
						<span className="text-chart-2" key={`${part}-${index}`}>
							{part}
						</span>
					) : (
						part
					),
				)}
		</span>
	);
};

export type SchemaDisplayDescriptionProps =
	HTMLAttributes<HTMLParagraphElement>;

export const SchemaDisplayDescription = ({
	className,
	children,
	...props
}: SchemaDisplayDescriptionProps) => {
	const { description } = useContext(SchemaDisplayContext);

	return (
		<p
			data-slot="ai-schema-display-description"
			className={cn(
				"-mt-2 px-4 pb-3.5 text-xs text-muted-foreground",
				className,
			)}
			{...props}
		>
			{children ?? description}
		</p>
	);
};

export type SchemaDisplayContentProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayContent = ({
	className,
	children,
	...props
}: SchemaDisplayContentProps) => (
	<div
		data-slot="ai-schema-display-content"
		className={cn(
			"divide-y divide-border-2 border-t border-border-2",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

export type SchemaDisplayParameterProps = HTMLAttributes<HTMLDivElement> &
	SchemaParameter;

export const SchemaDisplayParameter = ({
	name,
	type,
	required,
	description,
	location,
	className,
	...props
}: SchemaDisplayParameterProps) => (
	<div
		data-slot="ai-schema-display-parameter"
		className={cn("flex items-center gap-2 py-1.5 text-[12.5px]", className)}
		{...props}
	>
		<span className="font-mono font-medium">{name}</span>
		<span className="font-mono text-muted-foreground">{type}</span>
		{location && (
			<Badge className="h-[18px] text-[10.5px]" variant="secondary">
				{location}
			</Badge>
		)}
		{required && <RequiredBadge />}
		{description && (
			<span className="ml-auto text-right text-xs text-muted-foreground">
				{description}
			</span>
		)}
	</div>
);

export type SchemaDisplayParametersProps = ComponentProps<typeof Collapsible>;

export const SchemaDisplayParameters = ({
	className,
	children,
	...props
}: SchemaDisplayParametersProps) => {
	const { parameters } = useContext(SchemaDisplayContext);

	return (
		<Collapsible
			data-slot="ai-schema-display-parameters"
			className={className}
			defaultOpen
			{...props}
		>
			<CollapsibleTrigger className={sectionTrigger}>
				<SectionChevron />
				<span>Parameters</span>
			</CollapsibleTrigger>
			<CollapsibleContent className={panel}>
				<div className="px-4 pb-2.5">
					{children ??
						parameters?.map((param) => (
							<SchemaDisplayParameter key={param.name} {...param} />
						))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

export type SchemaDisplayPropertyProps = HTMLAttributes<HTMLDivElement> &
	SchemaProperty & {
		depth?: number;
	};

export const SchemaDisplayProperty = ({
	name,
	type,
	required,
	description,
	properties,
	items,
	depth = 0,
	className,
	...props
}: SchemaDisplayPropertyProps) => {
	const hasChildren = properties || items;
	const paddingLeft = depth * 16;

	if (hasChildren) {
		return (
			<Collapsible defaultOpen={depth < 2}>
				<CollapsibleTrigger
					className={cn(
						"group/ai-schema-property flex w-full items-center gap-2 py-1.5 text-left text-[12.5px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
						className,
					)}
					style={{ paddingLeft }}
				>
					<IconPlaceholder
						lucide="ChevronDownIcon"
						tabler="IconChevronDown"
						hugeicons="ArrowDown01Icon"
						phosphor="CaretDownIcon"
						remixicon="RiArrowDownSLine"
						className="size-3.5 shrink-0 -rotate-90 text-muted-foreground transition-transform group-data-[panel-open]/ai-schema-property:rotate-0"
					/>
					<span className="font-mono font-medium">{name}</span>
					<span className="font-mono text-muted-foreground">{type}</span>
					{required && <RequiredBadge />}
					{description && (
						<span className="ml-auto text-right text-xs text-muted-foreground">
							{description}
						</span>
					)}
				</CollapsibleTrigger>
				<CollapsibleContent className={panel}>
					<div>
						{properties?.map((prop) => (
							<SchemaDisplayProperty
								key={prop.name}
								{...prop}
								depth={depth + 1}
							/>
						))}
						{items && (
							<SchemaDisplayProperty
								{...items}
								depth={depth + 1}
								name={`${name}[]`}
							/>
						)}
					</div>
				</CollapsibleContent>
			</Collapsible>
		);
	}

	return (
		<div
			data-slot="ai-schema-display-property"
			className={cn("flex items-center gap-2 py-1.5 text-[12.5px]", className)}
			style={{ paddingLeft: paddingLeft + (depth > 0 ? 22 : 0) }}
			{...props}
		>
			<span className="font-mono font-medium">{name}</span>
			<span className="font-mono text-muted-foreground">{type}</span>
			{required && <RequiredBadge />}
			{description && (
				<span className="ml-auto text-right text-xs text-muted-foreground">
					{description}
				</span>
			)}
		</div>
	);
};

export type SchemaDisplayRequestProps = ComponentProps<typeof Collapsible>;

export const SchemaDisplayRequest = ({
	className,
	children,
	...props
}: SchemaDisplayRequestProps) => {
	const { requestBody } = useContext(SchemaDisplayContext);

	return (
		<Collapsible
			data-slot="ai-schema-display-request"
			className={className}
			defaultOpen
			{...props}
		>
			<CollapsibleTrigger className={sectionTrigger}>
				<SectionChevron />
				<span>Request body</span>
			</CollapsibleTrigger>
			<CollapsibleContent className={panel}>
				<div className="px-4 pb-2.5">
					{children ??
						requestBody?.map((prop) => (
							<SchemaDisplayProperty key={prop.name} {...prop} depth={0} />
						))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

export type SchemaDisplayResponseProps = ComponentProps<typeof Collapsible>;

export const SchemaDisplayResponse = ({
	className,
	children,
	...props
}: SchemaDisplayResponseProps) => {
	const { responseBody } = useContext(SchemaDisplayContext);

	return (
		<Collapsible
			data-slot="ai-schema-display-response"
			className={className}
			defaultOpen
			{...props}
		>
			<CollapsibleTrigger className={sectionTrigger}>
				<SectionChevron />
				<span>Response</span>
			</CollapsibleTrigger>
			<CollapsibleContent className={panel}>
				<div className="px-4 pb-2.5">
					{children ??
						responseBody?.map((prop) => (
							<SchemaDisplayProperty key={prop.name} {...prop} depth={0} />
						))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

export type SchemaDisplayProps = HTMLAttributes<HTMLDivElement> & {
	method: HttpMethod;
	path: string;
	description?: string;
	parameters?: SchemaParameter[];
	requestBody?: SchemaProperty[];
	responseBody?: SchemaProperty[];
};

export const SchemaDisplay = ({
	method,
	path,
	description,
	parameters,
	requestBody,
	responseBody,
	className,
	children,
	...props
}: SchemaDisplayProps) => {
	const contextValue = useMemo(
		() => ({
			description,
			method,
			parameters,
			path,
			requestBody,
			responseBody,
		}),
		[description, method, parameters, path, requestBody, responseBody],
	);

	return (
		<SchemaDisplayContext.Provider value={contextValue}>
			<div
				data-slot="ai-schema-display"
				className={cn(
					"overflow-hidden rounded-xl border border-border bg-card",
					className,
				)}
				{...props}
			>
				{children ?? (
					<>
						<SchemaDisplayHeader>
							<SchemaDisplayMethod />
							<SchemaDisplayPath />
						</SchemaDisplayHeader>
						{description && <SchemaDisplayDescription />}
						<SchemaDisplayContent>
							{parameters && parameters.length > 0 && (
								<SchemaDisplayParameters />
							)}
							{requestBody && requestBody.length > 0 && (
								<SchemaDisplayRequest />
							)}
							{responseBody && responseBody.length > 0 && (
								<SchemaDisplayResponse />
							)}
						</SchemaDisplayContent>
					</>
				)}
			</div>
		</SchemaDisplayContext.Provider>
	);
};

export type SchemaDisplayBodyProps = HTMLAttributes<HTMLDivElement>;

export const SchemaDisplayBody = ({
	className,
	children,
	...props
}: SchemaDisplayBodyProps) => (
	<div className={cn("divide-y divide-border-2", className)} {...props}>
		{children}
	</div>
);

export type SchemaDisplayExampleProps = HTMLAttributes<HTMLPreElement>;

export const SchemaDisplayExample = ({
	className,
	children,
	...props
}: SchemaDisplayExampleProps) => (
	<pre
		data-slot="ai-schema-display-example"
		className={cn(
			"mx-4 mb-3.5 overflow-auto rounded-md bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6]",
			className,
		)}
		{...props}
	>
		{children}
	</pre>
);
