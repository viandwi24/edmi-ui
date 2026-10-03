<script setup lang="ts">
import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion,
} from "@edmi-vue/components/ai/package-info";

const changes = [
  { name: "react", from: "18.3.1", to: "19.0.0", type: "major", note: "Breaking: new JSX transform, ref as prop." },
  { name: "@solana/web3.js", from: "1.95.2", to: "1.98.0", type: "minor", note: "Adds versioned transaction helpers." },
  { name: "zod", from: "3.23.8", to: "3.23.9", type: "patch", note: "Fixes an edge case in unions." },
  { name: "@jup-ag/api", from: undefined, to: "6.0.30", type: "added", note: "Quote and swap API client." },
] as const;
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-2.5">
    <PackageInfo
      v-for="c in changes"
      :key="c.name"
      :change-type="c.type"
      :current-version="c.from"
      :name="c.name"
      :new-version="c.to"
    >
      <PackageInfoHeader>
        <PackageInfoName />
        <PackageInfoChangeType />
        <PackageInfoVersion />
      </PackageInfoHeader>
      <PackageInfoDescription>{{ c.note }}</PackageInfoDescription>
    </PackageInfo>
    <PackageInfo change-type="minor" current-version="1.2.0" name="@edmi-ui/tokens" new-version="1.3.0">
      <PackageInfoHeader>
        <PackageInfoName />
        <PackageInfoChangeType />
        <PackageInfoVersion />
      </PackageInfoHeader>
      <PackageInfoContent>
        <PackageInfoDependencies>
          <PackageInfoDependency name="tailwindcss" version="^4.1.0" />
          <PackageInfoDependency name="shiki" version="^4.5.0" />
        </PackageInfoDependencies>
      </PackageInfoContent>
    </PackageInfo>
  </div>
</template>
