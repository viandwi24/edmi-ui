<script setup lang="ts">
import Breadcrumb from "./_navigation/breadcrumb.vue";
import Command from "./_navigation/command.vue";
import ContextMenu from "./_navigation/context-menu.vue";
import DropdownMenu from "./_navigation/dropdown-menu.vue";
import Menubar from "./_navigation/menubar.vue";
import NavigationMenu from "./_navigation/navigation-menu.vue";
import Pagination from "./_navigation/pagination.vue";
import DemoList from "./_demo-list.vue";
import Sidebar from "./_navigation/sidebar.vue";
import SidebarFloating from "./_navigation/sidebar-floating.vue";
</script>

<template>
	<div class="flex flex-col gap-6">
		<Breadcrumb />
		<Pagination />
		<div class="flex flex-wrap items-start gap-6">
			<DropdownMenu />
			<Menubar />
			<NavigationMenu />
			<ContextMenu />
		</div>
		<Command />
		<Sidebar />
		<SidebarFloating />
		<DemoList :names="['menubar-raised', 'pagination-raised']" />
	</div>
</template>
