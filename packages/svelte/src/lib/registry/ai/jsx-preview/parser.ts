// Edmi ✦ port: AI Elements has no Vue JSX Preview, so this is a small, sandboxed markup renderer.
// It parses JSX-like markup (tags, quoted attributes, `{literal}` / `{binding}` attributes, `{binding}`
// text) into a tree and never evaluates code. Streamed markup is repaired (unclosed tags are closed, a
// trailing half-written tag is dropped); components come from an explicit map.

export type JsxAttr = string | number | boolean | null | { binding: string };

export type JsxNode =
	| { type: "text"; value: string }
	| { type: "binding"; name: string }
	| {
			type: "element";
			tag: string;
			attrs: Record<string, JsxAttr>;
			children: JsxNode[];
			line: number;
	  };

export class JsxPreviewParseError extends Error {
	line: number;
	constructor(message: string, line: number) {
		super(message);
		this.name = "JsxPreviewParseError";
		this.line = line;
	}
}

export const VOID_TAGS = new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"source",
	"track",
	"wbr",
]);

const ENTITIES: Record<string, string> = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": '"',
	"&#39;": "'",
	"&nbsp;": " ",
};

const decode = (text: string) =>
	text.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m);

const lineAt = (source: string, index: number) => {
	let line = 1;
	for (let i = 0; i < index; i++) {
		if (source.charCodeAt(i) === 10) {
			line++;
		}
	}
	return line;
};

const NAME = /[A-Za-z][\w.-]*/y;
const ATTR_NAME = /[\w:@.-]+/y;

/** Reads `{ ... }` starting at `start` (the `{`), honouring nested braces and quoted strings. Returns the end index (after `}`) or -1. */
const readBraces = (source: string, start: number) => {
	let depth = 0;
	let quote = "";
	for (let i = start; i < source.length; i++) {
		const ch = source[i];
		if (quote) {
			if (ch === "\\") {
				i++;
			} else if (ch === quote) {
				quote = "";
			}
		} else if (ch === '"' || ch === "'" || ch === "`") {
			quote = ch;
		} else if (ch === "{") {
			depth++;
		} else if (ch === "}") {
			depth--;
			if (depth === 0) {
				return i + 1;
			}
		}
	}
	return -1;
};

const parseBraceValue = (raw: string): JsxAttr => {
	const expr = raw.trim();
	if (expr === "true") {
		return true;
	}
	if (expr === "false") {
		return false;
	}
	if (expr === "null") {
		return null;
	}
	if (/^-?\d+(\.\d+)?$/.test(expr)) {
		return Number(expr);
	}
	const quoted = expr.match(/^(["'`])([\s\S]*)\1$/);
	if (quoted) {
		return quoted[2] ?? "";
	}
	return { binding: expr };
};

const pushText = (target: JsxNode[], text: string) => {
	if (!text || (/^\s*$/.test(text) && text.includes("\n"))) {
		return;
	}
	let last = 0;
	for (const m of text.matchAll(/\{([\w.$]+)\}/g)) {
		if (m.index > last) {
			target.push({ type: "text", value: decode(text.slice(last, m.index)) });
		}
		target.push({ type: "binding", name: m[1] as string });
		last = m.index + m[0].length;
	}
	if (last < text.length) {
		target.push({ type: "text", value: decode(text.slice(last)) });
	}
};

export interface ParseOptions {
	/** Closes unclosed tags and drops a half-written trailing tag instead of throwing. */
	streaming?: boolean;
}

/** Parses markup into a node tree. Throws `JsxPreviewParseError` (with a line number) on malformed markup. */
export function parseJsx(
	source: string,
	options: ParseOptions = {},
): JsxNode[] {
	const root: JsxNode[] = [];
	const stack: { tag: string; line: number; children: JsxNode[] }[] = [];
	const current = () => stack[stack.length - 1]?.children ?? root;
	const fail = (message: string, index: number) => {
		throw new JsxPreviewParseError(message, lineAt(source, index));
	};

	let i = 0;
	while (i < source.length) {
		if (source[i] !== "<") {
			const next = source.indexOf("<", i);
			const end = next === -1 ? source.length : next;
			pushText(current(), source.slice(i, end));
			i = end;
			continue;
		}

		if (source.startsWith("<!--", i)) {
			const end = source.indexOf("-->", i);
			if (end === -1) {
				if (options.streaming) {
					break;
				}
				fail("Unterminated comment", i);
			}
			i = end + 3;
			continue;
		}

		const tagStart = i;
		if (source[i + 1] === "/") {
			const end = source.indexOf(">", i);
			if (end === -1) {
				if (options.streaming) {
					break;
				}
				fail("Unterminated closing tag", tagStart);
			}
			const name = source.slice(i + 2, end).trim();
			const open = stack.pop();
			if (!open || open.tag !== name) {
				if (options.streaming) {
					if (open) {
						stack.push(open);
					}
				} else {
					fail(
						open
							? `Expected </${open.tag}> but found </${name}>`
							: `Unexpected closing tag </${name}>`,
						tagStart,
					);
				}
			}
			i = end + 1;
			continue;
		}

		NAME.lastIndex = i + 1;
		const nameMatch = NAME.exec(source);
		if (!nameMatch) {
			// A lone "<" in text.
			if (options.streaming && i + 1 >= source.length) {
				break;
			}
			pushText(current(), "<");
			i++;
			continue;
		}
		const tag = nameMatch[0];
		i = NAME.lastIndex;

		const attrs: Record<string, JsxAttr> = {};
		let selfClosing = false;
		let closed = false;
		while (i < source.length) {
			while (i < source.length && /\s/.test(source[i] as string)) {
				i++;
			}
			if (source[i] === ">") {
				i++;
				closed = true;
				break;
			}
			if (source[i] === "/" && source[i + 1] === ">") {
				i += 2;
				selfClosing = true;
				closed = true;
				break;
			}
			ATTR_NAME.lastIndex = i;
			const attrMatch = ATTR_NAME.exec(source);
			if (!attrMatch) {
				if (i >= source.length) {
					break;
				}
				fail(`Unexpected character "${source[i]}" in <${tag}>`, i);
			}
			const attrName = (attrMatch as RegExpExecArray)[0];
			i = ATTR_NAME.lastIndex;
			if (source[i] !== "=") {
				attrs[attrName] = true;
				continue;
			}
			i++;
			const q = source[i];
			if (q === '"' || q === "'") {
				const end = source.indexOf(q, i + 1);
				if (end === -1) {
					i = source.length;
					break;
				}
				attrs[attrName] = decode(source.slice(i + 1, end));
				i = end + 1;
			} else if (q === "{") {
				const end = readBraces(source, i);
				if (end === -1) {
					i = source.length;
					break;
				}
				attrs[attrName] = parseBraceValue(source.slice(i + 1, end - 1));
				i = end;
			} else if (i >= source.length) {
				break;
			} else {
				fail(`Attribute ${attrName} needs a quoted or {braced} value`, i);
			}
		}

		if (!closed) {
			// The tag itself is still being written.
			if (options.streaming) {
				break;
			}
			fail(`Unterminated <${tag}>`, tagStart);
		}

		const element: JsxNode = {
			type: "element",
			tag,
			attrs,
			children: [],
			line: lineAt(source, tagStart),
		};
		current().push(element);
		if (!(selfClosing || VOID_TAGS.has(tag))) {
			stack.push({ tag, line: element.line, children: element.children });
		}
	}

	if (stack.length > 0 && !options.streaming) {
		const open = stack[stack.length - 1] as { tag: string; line: number };
		throw new JsxPreviewParseError(
			`Unclosed <${open.tag}> on line ${open.line}`,
			open.line,
		);
	}
	return root;
}

/** First capitalised tag that is not in `components`, as an error. Lowercase tags are native elements. */
export function findUnknownComponent(
	nodes: JsxNode[],
	components: Record<string, unknown> | undefined,
): JsxPreviewParseError | null {
	for (const node of nodes) {
		if (node.type !== "element") {
			continue;
		}
		if (/^[A-Z]/.test(node.tag) && !components?.[node.tag]) {
			return new JsxPreviewParseError(
				`Unknown component <${node.tag}> on line ${node.line}.`,
				node.line,
			);
		}
		const nested = findUnknownComponent(node.children, components);
		if (nested) {
			return nested;
		}
	}
	return null;
}
