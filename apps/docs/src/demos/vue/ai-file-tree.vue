<script setup lang="ts">
import { ref } from "vue";
import { FileTree, FileTreeFile, FileTreeFolder } from "@edmi-vue/components/ai/file-tree";

const selected = ref("src/lib/keeper.ts");
const expanded = ref(new Set(["src", "src/lib"]));
</script>

<template>
  <FileTree
    v-model:expanded="expanded"
    class="w-72"
    :selected-path="selected"
    @select="selected = $event"
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
</template>
