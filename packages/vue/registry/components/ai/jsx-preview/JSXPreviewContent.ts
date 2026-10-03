// Edmi ✦ port: renders the parsed tree with `h()`. Event handlers and `javascript:` URLs are dropped.
import type { Component, HTMLAttributes, PropType, VNodeChild } from "vue";
import { defineComponent, h } from "vue";
import { cn } from "@/registry/edmi/lib/utils";
import { useJSXPreview } from "./context";
import type { JsxAttr, JsxNode } from "./parser";

const ATTR_ALIASES: Record<string, string> = {
	className: "class",
	htmlFor: "for",
};

const resolveBinding = (
	bindings: Record<string, unknown> | undefined,
	path: string,
) =>
	path
		.split(".")
		.reduce<unknown>(
			(acc, key) => (acc as Record<string, unknown> | undefined)?.[key],
			bindings,
		);

const resolveAttr = (
	value: JsxAttr,
	bindings: Record<string, unknown> | undefined,
) =>
	typeof value === "object" && value !== null
		? resolveBinding(bindings, value.binding)
		: value;

function renderNodes(
	nodes: JsxNode[],
	components: Record<string, Component | string> | undefined,
	bindings: Record<string, unknown> | undefined,
): VNodeChild[] {
	return nodes.map((node) => {
		if (node.type === "text") {
			return node.value;
		}
		if (node.type === "binding") {
			const value = resolveBinding(bindings, node.name);
			return value == null ? "" : String(value);
		}

		const props: Record<string, unknown> = {};
		for (const [key, raw] of Object.entries(node.attrs)) {
			if (/^on[A-Z@]/.test(key) || key.startsWith("@")) {
				continue;
			}
			const name = ATTR_ALIASES[key] ?? key;
			const value = resolveAttr(raw, bindings);
			if (
				typeof value === "string" &&
				/^(href|src|action)$/i.test(name) &&
				/^\s*javascript:/i.test(value)
			) {
				continue;
			}
			props[name] = value;
		}

		const children = renderNodes(node.children, components, bindings);
		const target = components?.[node.tag];
		if (target && typeof target !== "string") {
			return h(target, props, { default: () => children });
		}
		return h(typeof target === "string" ? target : node.tag, props, children);
	});
}

export default defineComponent({
	name: "JSXPreviewContent",
	props: {
		class: {
			type: [String, Array, Object] as PropType<HTMLAttributes["class"]>,
			default: undefined,
		},
	},
	setup(props) {
		const { nodes, components, bindings } = useJSXPreview();
		return () =>
			h(
				"div",
				{
					class: cn("jsx-preview-content", props.class),
					"data-slot": "ai-jsx-preview-content",
				},
				renderNodes(nodes.value, components.value, bindings.value),
			);
	},
});
