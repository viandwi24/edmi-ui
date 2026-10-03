import { useState } from "react";
import {
	getLayoutCookie,
	type Layout,
	LayoutPickerToast,
} from "@/components/layout-picker";
import { DashboardLayout } from "./dashboard-layout";
import { NavbarLayout } from "./navbar-layout";

// First visit: dashboard + a corner toast to pick a layout; the choice lives in a cookie (DESIGN §6).
export function AppShell({ children }: { children: React.ReactNode }) {
	const [layout, setLayout] = useState<Layout>(
		() => getLayoutCookie() ?? "dashboard",
	);
	const Shell = layout === "navbar" ? NavbarLayout : DashboardLayout;
	return (
		<>
			<Shell>{children}</Shell>
			<LayoutPickerToast raised onValueChange={setLayout} />
		</>
	);
}
