<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { DirectionProvider } from "@edmi-vue/ui/direction";
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <DirectionProvider direction="ltr">
      <div dir="ltr">
        <div class="w-64 rounded-xl border border-border bg-card p-4">
          <div class="text-sm font-medium">Magnificent Four</div>
          <div class="text-xs text-muted-foreground">4 tokens · rebalanced weekly</div>
          <div class="mt-3 flex gap-2">
            <Button size="sm">Join</Button>
            <Button size="sm" variant="secondary">Share</Button>
          </div>
        </div>
      </div>
    </DirectionProvider>
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <div class="w-64 rounded-xl border border-border bg-card p-4">
          <div class="text-sm font-medium">مؤشر الأربعة العظماء</div>
          <div class="text-xs text-muted-foreground">٤ رموز · إعادة توازن أسبوعية</div>
          <div class="mt-3 flex gap-2">
            <Button size="sm">انضم</Button>
            <Button size="sm" variant="secondary">مشاركة</Button>
          </div>
        </div>
      </div>
    </DirectionProvider>
  </div>
</template>
