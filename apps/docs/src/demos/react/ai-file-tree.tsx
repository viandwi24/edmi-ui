import {
	FileTree,
	FileTreeFile,
	FileTreeFolder,
} from "@edmi-react/components/ai/file-tree";
import { useState } from "react";

export default function Demo() {
	const [selected, setSelected] = useState("src/lib/keeper.ts");

	return (
		<FileTree
			className="w-72"
			defaultExpanded={new Set(["src", "src/lib"])}
			onSelect={setSelected}
			selectedPath={selected}
		>
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
	);
}
