// Runs the `registry:build` script of every workspace package that defines one.
// Packages (react/vue/svelte) are added by later plans; with none present this is a no-op.
import { Glob } from "bun";

const root = new URL("..", import.meta.url).pathname;
let ran = 0;
for (const pattern of [
	"packages/*/package.json",
	"apps/*/package.json",
	"examples/*/package.json",
]) {
	for await (const file of new Glob(pattern).scan({ cwd: root })) {
		const pkg = await Bun.file(`${root}${file}`).json();
		if (!pkg.scripts?.["registry:build"]) continue;
		console.log(`registry:build -> ${pkg.name}`);
		const proc = Bun.spawn(["bun", "run", "registry:build"], {
			cwd: `${root}${file.replace("/package.json", "")}`,
			stdout: "inherit",
			stderr: "inherit",
		});
		if ((await proc.exited) !== 0) process.exit(1);
		ran++;
	}
}
if (ran === 0)
	console.log("build-registry: no package defines registry:build yet");
