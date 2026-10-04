import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getTheme, setTheme } from "@/lib/theme";

export function ThemeToggle() {
	const [theme, set] = useState(getTheme);
	return (
		<Button
			variant="outline"
			size="icon"
			aria-label="Toggle theme"
			onClick={() => {
				const next = theme === "dark" ? "light" : "dark";
				setTheme(next);
				set(next);
			}}
		>
			{theme === "dark" ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
}
