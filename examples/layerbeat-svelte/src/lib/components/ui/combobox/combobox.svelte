<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { setComboboxContext } from "./context.js";

	let {
		open = $bindable(false),
		value = $bindable(),
		...restProps
	}: ComboboxPrimitive.RootProps = $props();

	setComboboxContext({
		clear: () => {
			value = (restProps.type === "multiple" ? [] : "") as never;
		},
	});
</script>

<ComboboxPrimitive.Root bind:open bind:value={value as never} {...restProps} />
