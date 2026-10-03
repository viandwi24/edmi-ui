<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { Toaster, toast } from "@edmi-vue/ui/sonner";
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Toaster />
    <Button variant="outline" @click="toast('Copied to clipboard')">Default</Button>
    <Button
      variant="outline"
      @click="toast.success('Joined MAG4', { description: '98,209 shares - tx 4f9a...c21' })"
    >
      Success
    </Button>
    <Button
      variant="outline"
      @click="toast.info('Rebalance scheduled', { description: 'Next keeper run at 09:00 UTC' })"
    >
      Info
    </Button>
    <Button
      variant="outline"
      @click="toast.warning('Drift is 6.2%', { description: 'Above your 5% limit.' })"
    >
      Warning
    </Button>
    <Button
      variant="outline"
      @click="toast.error('Signature rejected', { description: 'The wallet closed the request.' })"
    >
      Error
    </Button>
    <Button
      variant="outline"
      @click="
        toast.promise(new Promise((r) => setTimeout(r, 2000)), {
          loading: 'Deploying vault...',
          success: () => 'Vault deployed',
          error: () => 'Deploy failed',
        })
      "
    >
      Promise
    </Button>
  </div>
</template>
