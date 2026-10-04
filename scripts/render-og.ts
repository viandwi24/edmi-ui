/**
 * Renders docs helper pages (README hero, OpenGraph card) to PNG. No headless browser, no dependency: any
 * browser you open does the rendering (same approach as scripts/example-thumbs.ts).
 *
 *   1. bun run --filter @edmi-ui/docs dev -- --port 4321        (or `astro preview` on a built site)
 *   2. bun scripts/render-og.ts --url http://localhost:4321/edmi-ui            # both presets
 *      bun scripts/render-og.ts --url … --job "og/card/?theme=dark,1200x630,1,apps/docs/public/og.png"
 *   3. open the printed `…/__og.html` URL in a browser (the in-app browser works) and leave it open
 *
 * Presets (default): README hero dark + light (1280x640 at 2x -> .github/assets/hero-{dark,light}.png) and the
 * OpenGraph card (1200x630 at 1x -> apps/docs/public/og.png). A `--job` is `<page path>,<WxH>,<scale>,<out>`
 * (repeatable). The driver writes apps/docs/public/__og.html (removed on exit), loads each page in a same-origin
 * iframe, waits for hydration, rasterises the iframe document (SVG foreignObject, page CSS and the Google
 * Fonts inlined) and POSTs the PNG to a tiny receiver on port 4792 that stores it at <out>.
 */
import { rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");
const args = process.argv.slice(2);
const val = (flag: string) => {
	const i = args.indexOf(flag);
	return i >= 0 ? args[i + 1] : undefined;
};
const BASE = val("--url") ?? "http://localhost:4321/edmi-ui";
const PORT = 4792;
const PUBLIC = resolve(ROOT, "apps/docs/public");
const DRIVER = resolve(PUBLIC, "__og.html");

const custom = args.flatMap((a, i) => (a === "--job" ? [args[i + 1]] : []));
const specs = custom.length
	? custom
	: [
			"og/hero/?theme=dark,1280x640,2,.github/assets/hero-dark.png",
			"og/hero/?theme=light,1280x640,2,.github/assets/hero-light.png",
			"og/card/?theme=dark,1200x630,1,apps/docs/public/og.png",
		];
const jobs = specs.map((s, i) => {
	const [page, size, scale, out] = s.split(",");
	const [w, h] = size.split("x").map(Number);
	return { id: i, page, w, h, scale: Number(scale), out: resolve(ROOT, out) };
});

const driver = `<!doctype html><meta charset="utf-8"><title>og</title>
<body style="font:14px sans-serif;margin:0"><p id="log" style="margin:8px">starting…</p>
<iframe id="f" style="border:0;position:absolute;left:0;top:40px"></iframe>
<script>
const JOBS = ${JSON.stringify(jobs.map(({ out, ...j }) => j))};
const RECEIVER = "http://localhost:${PORT}";
const log = (t) => (document.getElementById("log").textContent = t);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b64 = (buf) => { let s = ""; const u = new Uint8Array(buf); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };

async function fontCss() {
	const href = "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Sora:wght@600&display=swap";
	let css = await (await fetch(href)).text();
	const urls = [...new Set([...css.matchAll(/url\\((https:[^)]+)\\)/g)].map((m) => m[1]))];
	for (const u of urls) {
		const buf = await (await fetch(u)).arrayBuffer();
		css = css.split(u).join("data:font/woff2;base64," + b64(buf));
	}
	return css;
}

function pageCss(doc) {
	let out = "";
	for (const sheet of doc.styleSheets) {
		try { for (const r of sheet.cssRules) out += r.cssText + "\\n"; } catch (e) {}
	}
	return out;
}

async function snap(doc, fonts, W, H, scale) {
	const root = doc.documentElement.cloneNode(true);
	root.querySelectorAll("script,link,noscript,iframe").forEach((n) => n.remove());
	const head = root.querySelector("head") || root.insertBefore(doc.createElement("head"), root.firstChild);
	head.querySelectorAll("style").forEach((n) => n.remove());
	const st = doc.createElement("style");
	st.textContent = fonts + "\\n" + pageCss(doc) + "\\nhtml,body{margin:0;overflow:hidden;width:" + W + "px;height:" + H + "px}";
	head.appendChild(st);
	root.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
	const xml = new XMLSerializer().serializeToString(root);
	const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '"><foreignObject x="0" y="0" width="100%" height="100%">' + xml + "</foreignObject></svg>";
	const img = new Image();
	img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
	await img.decode();
	const c = document.createElement("canvas");
	c.width = W * scale; c.height = H * scale;
	const ctx = c.getContext("2d");
	ctx.scale(scale, scale);
	ctx.drawImage(img, 0, 0, W, H);
	return await new Promise((r) => c.toBlob(r, "image/png"));
}

(async () => {
	const fonts = await fontCss();
	const f = document.getElementById("f");
	let n = 0;
	for (const j of JOBS) {
		log("(" + ++n + "/" + JOBS.length + ") " + j.page);
		f.style.width = j.w + "px"; f.style.height = j.h + "px";
		await new Promise((res) => { f.onload = res; f.src = "${BASE}/" + j.page; });
		await sleep(3500);
		const png = await snap(f.contentDocument, fonts, j.w, j.h, j.scale);
		await fetch(RECEIVER + "/?id=" + j.id, { method: "POST", body: png });
	}
	await fetch(RECEIVER + "/done", { method: "POST" });
	log("done");
})().catch((e) => { log("ERROR " + e); fetch(RECEIVER + "/error?m=" + encodeURIComponent(String(e)), { method: "POST" }); });
</script>`;

writeFileSync(DRIVER, driver);
console.log(`Open ${BASE}/__og.html in a browser (${jobs.length} images)…`);

let received = 0;
const server = Bun.serve({
	port: PORT,
	async fetch(req) {
		const cors = {
			"access-control-allow-origin": "*",
			"access-control-allow-methods": "POST, OPTIONS",
			"access-control-allow-headers": "*",
		};
		if (req.method === "OPTIONS") return new Response(null, { headers: cors });
		const u = new URL(req.url);
		if (u.pathname === "/done") {
			setTimeout(() => finish(0), 100);
			return new Response("ok", { headers: cors });
		}
		if (u.pathname === "/error") {
			console.error(u.searchParams.get("m"));
			setTimeout(() => finish(1), 100);
			return new Response("ok", { headers: cors });
		}
		const job = jobs[Number(u.searchParams.get("id"))];
		await Bun.write(job.out, await req.arrayBuffer());
		console.log(`ok ${++received}/${jobs.length} ${job.out}`);
		return new Response("ok", { headers: cors });
	},
});

function finish(code: number) {
	rmSync(DRIVER, { force: true });
	server.stop(true);
	process.exit(code);
}
process.on("SIGINT", () => finish(1));
