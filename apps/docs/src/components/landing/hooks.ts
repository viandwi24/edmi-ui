import { useEffect, useState } from "react";
import {
	FRAMEWORKS,
	type Framework,
	type PackageManager,
	PM_KEY,
	PMS,
} from "../../config";

export function useFramework(): [Framework, (f: Framework) => void] {
	const [fw, setFw] = useState<Framework>("react");
	useEffect(() => {
		try {
			const v = localStorage.getItem("edmi-framework") as Framework | null;
			if (v && FRAMEWORKS.includes(v)) setFw(v);
		} catch {}
		const on = (e: Event) => setFw((e as CustomEvent<Framework>).detail);
		window.addEventListener("edmi-framework", on);
		return () => window.removeEventListener("edmi-framework", on);
	}, []);
	return [
		fw,
		(f) => {
			setFw(f);
			try {
				localStorage.setItem("edmi-framework", f);
			} catch {}
			window.dispatchEvent(new CustomEvent("edmi-framework", { detail: f }));
		},
	];
}

/** Current global package manager (head script sets html[data-pm]; synced through the edmi-pm event). */
export function usePm(): PackageManager {
	const [pm, setPm] = useState<PackageManager>("npm");
	useEffect(() => {
		const read = () => {
			const v = document.documentElement.dataset.pm as
				| PackageManager
				| undefined;
			if (v && PMS.includes(v)) setPm(v);
		};
		read();
		window.addEventListener(PM_KEY, read);
		return () => window.removeEventListener(PM_KEY, read);
	}, []);
	return pm;
}

/** Set the global package manager (head script + every tab strip follow through the edmi-pm event). */
export function setPm(pm: PackageManager) {
	document.documentElement.dataset.pm = pm;
	try {
		localStorage.setItem(PM_KEY, pm);
	} catch {}
	window.dispatchEvent(new CustomEvent(PM_KEY, { detail: pm }));
}
