// Builds the versioned registries that get published to npm as @edmi/registry-<fw>.
// For each framework: generate registry.json with EDMI_URL pointing at the jsDelivr CDN path of the
// package (so URL dependencies, e.g. Svelte's, resolve to the pinned major), then run the port's
// registry build into packages/registry-<fw>/r. The Pages build is separate (EDMI_URL = Pages URL).
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const frameworks = {
	react: ["bunx", "shadcn", "build"],
	vue: ["bunx", "shadcn-vue", "build"],
	svelte: ["bunx", "--bun", "shadcn-svelte", "registry", "build"],
} as const;

async function run(
	cmd: string[],
	cwd: string,
	env: Record<string, string> = {},
) {
	const proc = Bun.spawn(cmd, {
		cwd,
		env: { ...process.env, ...env },
		stdin: "ignore",
		stdout: "inherit",
		stderr: "inherit",
	});
	if ((await proc.exited) !== 0) {
		console.error(`pack-registries: failed: ${cmd.join(" ")}`);
		process.exit(1);
	}
}

const only = process.argv.slice(2).filter((a) => a in frameworks);
const work = mkdtempSync(join(tmpdir(), "edmi-pack-"));
try {
	for (const fw of Object.keys(frameworks) as (keyof typeof frameworks)[]) {
		if (only.length && !only.includes(fw)) continue;
		const pkgDir = join(root, "packages", `registry-${fw}`);
		const pkg = await Bun.file(join(pkgDir, "package.json")).json();
		const major = String(pkg.version).split(".")[0];
		const edmiUrl = `https://cdn.jsdelivr.net/npm/${pkg.name}@${major}`;
		const out = join(pkgDir, "r");
		rmSync(out, { recursive: true, force: true });
		console.log(`pack-registries: ${fw} -> ${out} (EDMI_URL=${edmiUrl})`);
		const gen = join(work, fw);
		// The npm package ships the files directly under `r/`, so URLs use the flat layout.
		await run(
			[
				"bun",
				"run",
				"scripts/gen-registry.ts",
				"--strict",
				"--out",
				gen,
				"--url-layout",
				"flat",
			],
			root,
			{ EDMI_URL: edmiUrl },
		);
		await run(
			[
				...frameworks[fw],
				join(gen, fw, "registry.json"),
				"--cwd",
				join(root, "packages", fw),
				"--output",
				out,
			],
			join(root, "packages", fw),
		);
	}
} finally {
	rmSync(work, { recursive: true, force: true });
}
