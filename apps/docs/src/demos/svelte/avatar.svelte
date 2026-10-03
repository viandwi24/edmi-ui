<script lang="ts">
	import * as Avatar from "@edmi-svelte/ui/avatar";
</script>

<div class="flex flex-wrap items-center gap-8">
	<div class="flex items-center gap-3">
		<Avatar.Root size="sm">
			<Avatar.Fallback>DL</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Fallback>SC</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<Avatar.Root size="lg">
		<Avatar.Fallback>JB</Avatar.Fallback>
		<Avatar.Badge />
	</Avatar.Root>
	<Avatar.Group>
		<Avatar.Root><Avatar.Fallback>NG</Avatar.Fallback></Avatar.Root>
		<Avatar.Root><Avatar.Fallback>ER</Avatar.Fallback></Avatar.Root>
		<Avatar.Root><Avatar.Fallback>SC</Avatar.Fallback></Avatar.Root>
		<Avatar.GroupCount>+9</Avatar.GroupCount>
	</Avatar.Group>
</div>
