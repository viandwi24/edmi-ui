"use client";

import { cn } from "cn";
import * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import { Card } from "@/registry/edmi/ui/card";

type CodeBlockProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
	/** Source text. */
	code: string;
	/** Header label (file name or tool). */
	title?: React.ReactNode;
	/** 1-based line numbers to highlight. */
	highlightLines?: number[];
	/** Show the copy button (default true). */
	copyable?: boolean;
	/** Called after a successful copy. */
	onCopy?: (code: string) => void;
};

function CodeBlock({
	className,
	code,
	title,
	highlightLines,
	copyable = true,
	onCopy,
	...props
}: CodeBlockProps) {
	const [copied, setCopied] = React.useState(false);
	const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	React.useEffect(() => () => clearTimeout(timer.current), []);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
		} catch {
			return;
		}
		onCopy?.(code);
		setCopied(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setCopied(false), 1500);
	}

	const lines = code.split("\n");
	return (
		<Card
			data-slot="code-block"
			className={cn("gap-0 overflow-hidden p-0", className)}
			{...props}
		>
			{title || copyable ? (
				<div className="flex items-center justify-between border-b border-border py-2 pr-2 pl-3.5">
					<span className="font-mono text-[11.5px] text-muted-foreground">
						{title}
					</span>
					{copyable ? (
						<Button
							variant="ghost"
							size="icon-xs"
							aria-label={copied ? "Copied" : "Copy code"}
							onClick={copy}
						>
							{copied ? (
								<IconPlaceholder
									lucide="CheckIcon"
									tabler="IconCheck"
									hugeicons="Tick02Icon"
									phosphor="CheckIcon"
									remixicon="RiCheckLine"
								/>
							) : (
								<IconPlaceholder
									lucide="CopyIcon"
									tabler="IconCopy"
									hugeicons="Copy01Icon"
									phosphor="CopyIcon"
									remixicon="RiFileCopyLine"
								/>
							)}
						</Button>
					) : null}
				</div>
			) : null}
			<pre className="m-0 overflow-x-auto py-3.5 font-mono text-[12.5px] leading-[1.65] whitespace-pre-wrap text-foreground-2">
				<code>
					{lines.map((line, i) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: static lines
							key={i}
							data-highlighted={
								highlightLines?.includes(i + 1) ? "" : undefined
							}
							className="block border-l-2 border-transparent px-3.5 data-[highlighted]:border-brand data-[highlighted]:bg-accent"
						>
							{line || "​"}
						</span>
					))}
				</code>
			</pre>
		</Card>
	);
}

export { CodeBlock };
