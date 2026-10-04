<script lang="ts">
	import {
		Commit,
		CommitAuthor,
		CommitAuthorAvatar,
		CommitContent,
		CommitCopyButton,
		CommitFile,
		CommitFileAdditions,
		CommitFileChanges,
		CommitFileDeletions,
		CommitFileInfo,
		CommitFilePath,
		CommitFiles,
		CommitFilesToggle,
		CommitFileStatus,
		CommitHash,
		CommitHeader,
		CommitInfo,
		CommitMessage,
		CommitMetadata,
		CommitSeparator,
		CommitTimestamp,
	} from "@edmi-svelte/ai/commit";

	const files = [
		{ path: "lib/keeper.ts", status: "modified", add: 12, del: 3 },
		{ path: "lib/drift.ts", status: "added", add: 28, del: 0 },
		{ path: "tests/keeper.test.ts", status: "renamed", add: 4, del: 4 },
		{ path: "lib/old-keeper.ts", status: "deleted", add: 0, del: 41 },
	] as const;

	const date = new Date("2026-03-14T09:30:00Z");
</script>

<Commit class="max-w-lg" open>
	<CommitHeader>
		<CommitAuthor>
			<CommitAuthorAvatar initials="DL" />
		</CommitAuthor>
		<CommitInfo>
			<CommitMessage>feat(keeper): skip rebalance under 2% drift</CommitMessage>
			<CommitMetadata>
				<span>Dewi Lestari</span>
				<CommitSeparator />
				<CommitTimestamp {date} />
			</CommitMetadata>
		</CommitInfo>
		<CommitHash>
			a3f9c21
			<CommitCopyButton hash="a3f9c21" />
		</CommitHash>
	</CommitHeader>
	<CommitFilesToggle count={files.length} />
	<CommitContent>
		<CommitFiles>
			{#each files as f (f.path)}
				<CommitFile>
					<CommitFileInfo>
						<CommitFileStatus status={f.status} />
						<CommitFilePath>{f.path}</CommitFilePath>
					</CommitFileInfo>
					<CommitFileChanges>
						<CommitFileAdditions count={f.add} />
						<CommitFileDeletions count={f.del} />
					</CommitFileChanges>
				</CommitFile>
			{/each}
		</CommitFiles>
	</CommitContent>
</Commit>
