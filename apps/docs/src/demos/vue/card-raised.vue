<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@edmi-vue/ui/card";
</script>

<template>
  <div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Flat</CardTitle>
        <CardDescription>Border only (default).</CardDescription>
      </CardHeader>
      <CardContent>NAV 59.9998</CardContent>
    </Card>
    <Card raised>
      <CardHeader>
        <CardTitle>Raised</CardTitle>
        <CardDescription>Hard lip + top highlight.</CardDescription>
      </CardHeader>
      <CardContent>NAV 59.9998</CardContent>
    </Card>
  </div>
</template>
