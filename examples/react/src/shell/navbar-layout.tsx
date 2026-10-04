import type * as React from "react";
import { AppHeader } from "@/components/app-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/data/markets";

export function NavbarLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-svh">
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
					<AppHeader
						className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
						items={nav}
						active="#explore"
						onConnect={() => {}}
					/>
					<ThemeToggle />
				</div>
			</div>
			{children}
		</div>
	);
}
