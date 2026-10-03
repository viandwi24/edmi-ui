<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/edmi/ui/navigation-menu";
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Product</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[320px] gap-1">
            <li>
              <NavigationMenuLink href="#explore" class="flex-col items-start gap-0">
                <span class="font-medium">Explore</span>
                <span class="text-xs text-muted-foreground">Browse every live index.</span>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="#create" class="flex-col items-start gap-0">
                <span class="font-medium">Create index</span>
                <span class="text-xs text-muted-foreground">Pick tokens, set weights.</span>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#docs" class="h-9 px-3 font-medium">Docs</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
