import { cva } from "class-variance-authority";

export { default as NavigationMenu } from "./NavigationMenu.vue";
export { default as NavigationMenuContent } from "./NavigationMenuContent.vue";
export { default as NavigationMenuIndicator } from "./NavigationMenuIndicator.vue";
export { default as NavigationMenuItem } from "./NavigationMenuItem.vue";
export { default as NavigationMenuLink } from "./NavigationMenuLink.vue";
export { default as NavigationMenuList } from "./NavigationMenuList.vue";
export { default as NavigationMenuTrigger } from "./NavigationMenuTrigger.vue";
export { default as NavigationMenuViewport } from "./NavigationMenuViewport.vue";

export const navigationMenuTriggerStyle = cva(
    "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-md px-3 text-[13.5px] font-medium text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-foreground",
);
