<script lang="ts">
	import { FileTree, FileTreeFile, FileTreeFolder } from "@edmi-svelte/ai/file-tree";

	let selected = $state("src/lib/keeper.ts");
	let expanded = $state(new Set(["src", "src/lib"]));
</script>

<FileTree class="w-72" bind:expanded selectedPath={selected} onSelect={(p) => (selected = p)}>
	<FileTreeFolder name="src" path="src">
		<FileTreeFolder name="lib" path="src/lib">
			<FileTreeFile name="keeper.ts" path="src/lib/keeper.ts" />
			<FileTreeFile name="drift.ts" path="src/lib/drift.ts" />
		</FileTreeFolder>
		<FileTreeFolder name="components" path="src/components">
			<FileTreeFile name="ticker.tsx" path="src/components/ticker.tsx" />
		</FileTreeFolder>
		<FileTreeFile name="app.tsx" path="src/app.tsx" />
	</FileTreeFolder>
	<FileTreeFolder name="tests" path="tests">
		<FileTreeFile name="keeper.test.ts" path="tests/keeper.test.ts" />
	</FileTreeFolder>
	<FileTreeFile name="package.json" path="package.json" />
</FileTree>
