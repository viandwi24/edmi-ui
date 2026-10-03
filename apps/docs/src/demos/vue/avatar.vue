<script setup lang="ts">
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@edmi-vue/ui/avatar";
</script>

<template>
  <div class="flex flex-wrap items-center gap-8">
    <div class="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>DL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </div>
    <Avatar size="lg">
      <AvatarFallback>JB</AvatarFallback>
      <AvatarBadge />
    </Avatar>
    <AvatarGroup>
      <Avatar><AvatarFallback>NG</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>ER</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
      <AvatarGroupCount>+9</AvatarGroupCount>
    </AvatarGroup>
  </div>
</template>
