import {
	PackageInfo,
	PackageInfoChangeType,
	PackageInfoContent,
	PackageInfoDependencies,
	PackageInfoDependency,
	PackageInfoDescription,
	PackageInfoHeader,
	PackageInfoName,
	PackageInfoVersion,
} from "@edmi-react/components/ai/package-info";

const changes = [
	{
		name: "react",
		from: "18.3.1",
		to: "19.0.0",
		type: "major",
		note: "Breaking: new JSX transform, ref as prop.",
	},
	{
		name: "@solana/web3.js",
		from: "1.95.2",
		to: "1.98.0",
		type: "minor",
		note: "Adds versioned transaction helpers.",
	},
	{
		name: "zod",
		from: "3.23.8",
		to: "3.23.9",
		type: "patch",
		note: "Fixes an edge case in unions.",
	},
	{
		name: "@jup-ag/api",
		from: undefined,
		to: "6.0.30",
		type: "added",
		note: "Quote and swap API client.",
	},
] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-md flex-col gap-2.5">
			{changes.map((c) => (
				<PackageInfo
					changeType={c.type}
					currentVersion={c.from}
					key={c.name}
					name={c.name}
					newVersion={c.to}
				>
					<PackageInfoHeader>
						<PackageInfoName />
						<PackageInfoChangeType />
						<PackageInfoVersion />
					</PackageInfoHeader>
					<PackageInfoDescription>{c.note}</PackageInfoDescription>
				</PackageInfo>
			))}
			<PackageInfo
				changeType="minor"
				currentVersion="1.2.0"
				name="@edmi-ui/tokens"
				newVersion="1.3.0"
			>
				<PackageInfoHeader>
					<PackageInfoName />
					<PackageInfoChangeType />
					<PackageInfoVersion />
				</PackageInfoHeader>
				<PackageInfoContent>
					<PackageInfoDependencies>
						<PackageInfoDependency name="tailwindcss" version="^4.1.0" />
						<PackageInfoDependency name="shiki" version="^4.5.0" />
					</PackageInfoDependencies>
				</PackageInfoContent>
			</PackageInfo>
		</div>
	);
}
