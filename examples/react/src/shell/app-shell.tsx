import { useState } from "react";
import {
	getLayoutCookie,
	type Layout,
	LayoutPickerToast,
} from "@/components/layout-picker";
import { ElevationProvider } from "@/components/ui/elevation";
import { DashboardLayout } from "./dashboard-layout";
import { NavbarLayout } from "./navbar-layout";

// Layered elevation: every role takes its level (actions up, fields down, overlays float).
// First visit: dashboard + a corner toast to pick a layout; the choice lives in a cookie (DESIGN §6).
export function AppShell({ children }: { children: React.ReactNode }) {
	const [layout, setLayout] = useState<Layout>(
		() => getLayoutCookie() ?? "dashboard",
	);
	const Shell = layout === "navbar" ? NavbarLayout : DashboardLayout;
	return (
		<ElevationProvider mode="layered">
			<Shell>{children}</Shell>
			<LayoutPickerToast onValueChange={setLayout} />
		</ElevationProvider>
	);
}
