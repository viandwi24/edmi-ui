<script setup lang="ts">
import { ArrowRight, Plus } from "@lucide/vue";
import { Badge } from "@/registry/edmi/ui/badge";
import { Button } from "@/registry/edmi/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/edmi/ui/card";
import { Input } from "@/registry/edmi/ui/input";
import {
	InsetPanel,
	InsetPanelBody,
	InsetPanelFooter,
	InsetPanelHeader,
} from "@/registry/edmi/ui/inset-panel";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/registry/edmi/ui/tabs";

const variants = ["default", "secondary", "outline", "ghost", "destructive", "link", "brand"] as const;
const sizes = ["xs", "sm", "default", "lg"] as const;
const badges = ["default", "secondary", "destructive", "outline", "ghost", "link", "brand", "warning", "info"] as const;
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" class="flex flex-wrap items-center gap-3">
      <Button v-for="v in variants" :key="v" :variant="v" :size="size">{{ v }}</Button>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <Button><Plus data-icon="inline-start" />With icon</Button>
      <Button variant="brand">Continue<ArrowRight data-icon="inline-end" /></Button>
      <Button disabled>Disabled</Button>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <Badge v-for="b in badges" :key="b" :variant="b">{{ b }}</Badge>
      <Badge variant="brand" shape="pill">pill</Badge>
      <Badge variant="secondary" shape="number">12</Badge>
    </div>
    <div class="flex max-w-sm flex-col gap-3">
      <Input placeholder="Email" />
      <Input placeholder="Invalid" aria-invalid="true" />
      <Input placeholder="Disabled" disabled />
    </div>
    <Tabs default-value="a" class="max-w-sm">
      <TabsList>
        <TabsTrigger value="a">Overview</TabsTrigger>
        <TabsTrigger value="b">Activity</TabsTrigger>
        <TabsTrigger value="c">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Overview panel</TabsContent>
      <TabsContent value="b">Activity panel</TabsContent>
      <TabsContent value="c">Settings panel</TabsContent>
    </Tabs>
    <Tabs default-value="a" class="max-w-sm">
      <TabsList variant="line">
        <TabsTrigger value="a">Overview</TabsTrigger>
        <TabsTrigger value="b">Activity</TabsTrigger>
      </TabsList>
    </Tabs>
    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card description</CardDescription>
          <CardAction><Badge variant="brand">New</Badge></CardAction>
        </CardHeader>
        <CardContent>Content goes here.</CardContent>
        <CardFooter><Button size="sm">Save</Button></CardFooter>
      </Card>
      <InsetPanel>
        <InsetPanelHeader>Inset panel</InsetPanelHeader>
        <InsetPanelBody fade class="h-32 p-4">Body on card surface.</InsetPanelBody>
        <InsetPanelFooter>Footer</InsetPanelFooter>
      </InsetPanel>
    </div>
  </div>
</template>
