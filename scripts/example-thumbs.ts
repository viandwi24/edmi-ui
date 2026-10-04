/**
 * Regenerates the docs example thumbnails FROM THE LIVE RENDERS, so the index cards always match the
 * examples. No headless browser and no dependency: any browser you open does the rendering.
 *
 *   1. bun run --filter @edmi-ui/docs dev -- --port 4770        (or `astro preview` on a built site)
 *   2. bun scripts/example-thumbs.ts --url http://localhost:4770/edmi-ui [slug…]
 *   3. open the printed `…/__thumbs.html` URL in a browser (the in-app browser works) and leave it open
 *
 * The script writes a temporary driver page (apps/docs/public/__thumbs.html, removed on exit) and starts a
 * tiny receiver. The driver loads `/examples/<slug>/render/react/?mode=light|dark&base=&theme=` in a
 * 1440x1080 same-origin iframe (respecting each example's defaultBase / defaultTheme and a forced
 * defaultMode), waits for hydration, rasterises the iframe document (SVG foreignObject with the page CSS and
 * the Google Fonts inlined) and POSTs the PNG to the receiver, which stores it as
 * apps/docs/public/examples/<thumb>-{light,dark}.png and shrinks it to 800px wide with `sips -Z 800`.
 * Fine details (focus rings, canvas elements) are not captured; eyeball the result against `/examples/<slug>/`.
 */
import { spawnSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { EXAMPLES } from "../apps/docs/src/examples/index.ts";

const args = process.argv.slice(2);
const urlIdx = args.indexOf("--url");
const BASE =
	(urlIdx >= 0 ? args[urlIdx + 1] : undefined) ??
	"http://localhost:4321/edmi-ui";
const only = args.filter((a, i) => !a.startsWith("--") && i !== urlIdx + 1);
const PORT = 4791;
const PUBLIC = resolve(import.meta.dir, "../apps/docs/public");
const DRIVER = resolve(PUBLIC, "__thumbs.html");

const jobs = EXAMPLES.filter(
	(e) => !only.length || only.includes(e.slug),
).flatMap((e) =>
	(["light", "dark"] as const).map((mode) => ({
		thumb: e.thumb,
		mode,
		query: new URLSearchParams({
			mode: e.defaultMode ?? mode,
			base: e.defaultBase ?? "stone",
			theme: e.defaultTheme ?? "green",
		}).toString(),
		slug: e.slug,
	})),
);

const driver = `<!doctype html><meta charset="utf-8"><title>thumbs</title>
<body style="font:14px sans-serif"><p id="log">starting…</p>
<iframe id="f" style="width:1440px;height:1080px;border:0;position:absolute;left:0;top:60px"></iframe>
<script>
const JOBS = ${JSON.stringify(jobs)};
const RECEIVER = "http://localhost:${PORT}";
const W = 1440, H = 1080;
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

async function snap(doc, fonts) {
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
	c.width = W; c.height = H;
	c.getContext("2d").drawImage(img, 0, 0);
	return await new Promise((r) => c.toBlob(r, "image/png"));
}

(async () => {
	const fonts = await fontCss();
	const f = document.getElementById("f");
	let n = 0;
	for (const j of JOBS) {
		log("(" + ++n + "/" + JOBS.length + ") " + j.slug + " " + j.mode);
		await new Promise((res) => { f.onload = res; f.src = "${BASE}/examples/" + j.slug + "/render/react/?" + j.query; });
		await sleep(3500);
		// diagram examples (xyflow) mount their nodes late: wait until they are measured and visible
		const d = f.contentDocument;
		for (let k = 0; k < 40 && d.querySelector(".react-flow") && !(d.querySelector(".react-flow__node") && !d.querySelector('.react-flow__node[style*="hidden"]')); k++) await sleep(500);
		if (d.querySelector(".react-flow")) await sleep(1500);
		const png = await snap(f.contentDocument, fonts);
		await fetch(RECEIVER + "/?thumb=" + j.thumb + "&mode=" + j.mode, { method: "POST", body: png });
	}
	await fetch(RECEIVER + "/done", { method: "POST" });
	log("done");
})().catch((e) => { log("ERROR " + e); fetch(RECEIVER + "/error?m=" + encodeURIComponent(String(e)), { method: "POST" }); });
</script>`;

writeFileSync(DRIVER, driver);
console.log(
	`Open ${BASE}/__thumbs.html in a browser (${jobs.length} screenshots)…`,
);

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
		const file = resolve(
			PUBLIC,
			`examples/${u.searchParams.get("thumb")}-${u.searchParams.get("mode")}.png`,
		);
		await Bun.write(file, await req.arrayBuffer());
		spawnSync("sips", ["-Z", "800", file], { stdio: "ignore" });
		console.log(`ok ${++received}/${jobs.length} ${file.split("/").pop()}`);
		return new Response("ok", { headers: cors });
	},
});

function finish(code: number) {
	rmSync(DRIVER, { force: true });
	server.stop(true);
	process.exit(code);
}
process.on("SIGINT", () => finish(1));
