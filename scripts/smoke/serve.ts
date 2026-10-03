// Tiny static server with CORS for the smoke tests.
// Usage: bun scripts/smoke/serve.ts <dir> <portfile>   (random free port, written to <portfile>)
import { join, normalize } from "node:path";

const [dir, portFile] = process.argv.slice(2);
if (!dir || !portFile) {
	console.error("usage: serve.ts <dir> <portfile>");
	process.exit(2);
}
const root = normalize(dir);
const server = Bun.serve({
	port: 0,
	async fetch(req) {
		const url = new URL(req.url);
		const path = normalize(join(root, decodeURIComponent(url.pathname)));
		const headers = { "Access-Control-Allow-Origin": "*" };
		if (!path.startsWith(root))
			return new Response("forbidden", { status: 403 });
		const file = Bun.file(path);
		if (!(await file.exists()))
			return new Response("not found", { status: 404, headers });
		return new Response(file, { headers });
	},
});
await Bun.write(portFile, String(server.port));
console.log(`serving ${root} on http://localhost:${server.port}`);
