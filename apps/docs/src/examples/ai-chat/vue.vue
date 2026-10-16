<script setup lang="ts">
import { ElevationProvider } from "@edmi-vue/ui/elevation";
import {
  AppWindowIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  ChevronDownIcon,
  FileTextIcon,
  GlobeIcon,
  LayoutGridIcon,
  LockIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PaletteIcon,
  PanelLeft,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "@lucide/vue";
import { computed, ref } from "vue";
import { AgentAvatar } from "@edmi-vue/components/ai/agent-avatar";
import {
  ArtifactCard,
  ArtifactCardActions,
  ArtifactCardBody,
  ArtifactCardIcon,
  ArtifactCardMeta,
  ArtifactCardThumbnail,
  ArtifactCardTitle,
} from "@edmi-vue/components/ai/artifact-card";
import { ArtifactStack, ArtifactStackDownloadAll } from "@edmi-vue/components/ai/artifact-stack";
import {
  ArtifactViewer,
  ArtifactViewerClose,
  ArtifactViewerContent,
  ArtifactViewerDownload,
  ArtifactViewerExpand,
  ArtifactViewerHeader,
  ArtifactViewerOpenIn,
  ArtifactViewerPaper,
  ArtifactViewerTitle,
} from "@edmi-vue/components/ai/artifact-viewer";
import { ChatComposer } from "@edmi-vue/components/ai/chat-composer";
import {
  ChatHeader,
  ChatHeaderActions,
  ChatHeaderMenu,
  ChatHeaderProject,
  ChatHeaderShare,
  ChatHeaderTitle,
} from "@edmi-vue/components/ai/chat-header";
import { CodeBlock } from "@edmi-vue/components/ai/code-block";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationItem,
  ConversationScrollButton,
} from "@edmi-vue/components/ai/conversation";
import { Message, MessageContent, MessageResponse } from "@edmi-vue/components/ai/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@edmi-vue/components/ai/prompt-input";
import { PromptInputAgent } from "@edmi-vue/components/ai/prompt-input-agent";
import {
  Queue,
  QueueItem,
  QueueItemAvatar,
  QueueItemContent,
  QueueItemStatus,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from "@edmi-vue/components/ai/queue";
import { Suggestion, Suggestions } from "@edmi-vue/components/ai/suggestion";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@edmi-vue/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@edmi-vue/ui/item";
import { Spinner } from "@edmi-vue/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import {
  type ArtifactType,
  agent,
  appName,
  banner,
  composer,
  docs,
  greeting,
  groups,
  menu,
  nav,
  project,
  recents,
  suggestions,
  tabs,
  tasks,
  thread,
  tiles,
  title,
  type View,
} from "./data";

const tone: Record<ArtifactType, string> = {
  docs: "bg-[color-mix(in_srgb,var(--chart-2)_14%,var(--card))] text-chart-2",
  slides: "bg-[color-mix(in_srgb,var(--chart-3)_14%,var(--card))] text-chart-3",
  design: "bg-[color-mix(in_srgb,var(--chart-4)_14%,var(--card))] text-chart-4",
};
const typeIcon = { docs: FileTextIcon, slides: AppWindowIcon, design: PaletteIcon };

const view = ref<View>("thread");
const openId = ref<string | null>(null);
const expanded = ref(false);
const navOpen = ref(false);
const tab = ref("all");
const bannerOpen = ref(true);
const doc = computed(() => docs.find((d) => d.id === openId.value));
const visible = computed(() =>
  groups
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (i) => tab.value === "all" || (tab.value === "shared" ? i.shared : !i.shared),
      ),
    }))
    .filter((g) => g.items.length > 0),
);

function go(next: View) {
  view.value = next;
  openId.value = null;
  expanded.value = false;
  navOpen.value = false;
}
function close() {
  expanded.value = false;
  openId.value = null;
}
function docById(id: string) {
  return docs.find((x) => x.id === id);
}
</script>

<template>
  <ElevationProvider mode="layered">
    <div class="flex h-svh bg-background text-foreground">
      <button
        v-if="navOpen"
        type="button"
        aria-label="Close menu"
        class="fixed inset-0 z-30 bg-overlay md:hidden"
        @click="navOpen = false"
      />
      <aside
        :class="`flex w-60 shrink-0 flex-col gap-1 border-r border-sidebar-border bg-sidebar p-3 text-sidebar-foreground max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 ${navOpen ? '' : 'max-md:-translate-x-full'}`"
      >
        <div class="flex items-center gap-2 px-2 pt-1 pb-3 font-serif text-lg">{{ appName }}</div>
        <Button class="w-full justify-start" type="button" variant="outline" @click="go('home')">
          <PlusIcon class="size-4" />
          New chat
        </Button>
        <div class="mt-2 flex flex-col gap-0.5">
          <Button
            v-for="n in nav"
            :key="n.view"
            :class="`w-full justify-start ${view === n.view ? 'bg-sidebar-accent' : ''}`"
            type="button"
            variant="ghost"
            @click="go(n.view)"
          >
            <MessageSquareIcon v-if="n.view === 'thread'" class="size-4" />
            <BookOpenIcon v-else class="size-4" />
            {{ n.label }}
          </Button>
        </div>
        <div class="mt-4 px-2 text-xs text-muted-foreground">Recents</div>
        <div class="flex min-h-0 flex-col gap-0.5 overflow-y-auto">
          <Button
            v-for="r in recents"
            :key="r"
            class="w-full justify-start font-normal"
            type="button"
            variant="ghost"
            @click="go('thread')"
          >
            <span class="truncate">{{ r }}</span>
          </Button>
        </div>
      </aside>

      <div class="flex min-w-0 flex-1">
        <div class="flex min-w-0 flex-1 flex-col">
          <div class="flex items-center p-2 pb-0 md:hidden">
            <Button aria-label="Open menu" size="icon-sm" type="button" variant="ghost" @click="navOpen = true">
              <PanelLeft class="size-4" />
            </Button>
          </div>

          <div v-if="view === 'home'" class="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <div class="mx-auto flex min-h-full w-full max-w-2xl flex-col gap-4 p-4">
              <ConversationEmptyState variant="home" :title="greeting" description="" class="flex-1 gap-8 p-2">
                <Badge variant="secondary" class="-mt-5 gap-1.5">
                  <BookOpenIcon class="size-3" />
                  {{ project }}
                </Badge>
                <Queue variant="flat" class="w-full text-left">
                  <QueueSection>
                    <QueueSectionTrigger class="font-normal text-muted-foreground">
                      <QueueSectionLabel label="Tasks" :chevron="false" />
                    </QueueSectionTrigger>
                    <QueueSectionContent>
                      <QueueList>
                        <QueueItem v-for="task in tasks" :key="task.id">
                          <div class="flex items-center gap-2">
                            <QueueItemAvatar>
                              <AgentAvatar :seed="task.agent.id" :color="task.agent.color" :size="22" :tile="false" />
                            </QueueItemAvatar>
                            <QueueItemContent>{{ task.title }}</QueueItemContent>
                            <QueueItemStatus>
                              <span class="font-mono">{{ task.age }}</span>
                              <Spinner v-if="task.status === 'running'" class="size-3.5" />
                              <span v-else class="size-1.5 rounded-full bg-success" />
                            </QueueItemStatus>
                          </div>
                        </QueueItem>
                      </QueueList>
                    </QueueSectionContent>
                  </QueueSection>
                </Queue>
                <div class="flex w-full items-center gap-2">
                  <span class="shrink-0 text-xs text-muted-foreground">Suggested</span>
                  <Suggestions>
                    <Suggestion v-for="s in suggestions" :key="s" :suggestion="s" @click="go('thread')" />
                  </Suggestions>
                </div>
              </ConversationEmptyState>

              <PromptInput @submit="go('thread')">
                <PromptInputHeader>
                  <PromptInputAgent :agent="agent" />
                </PromptInputHeader>
                <PromptInputBody>
                  <PromptInputTextarea :placeholder="`Ask ${agent.name} anything about your index…`" class="min-h-20" />
                </PromptInputBody>
                <PromptInputFooter>
                  <PromptInputTools>
                    <Button aria-label="Attach" size="icon-sm" type="button" variant="ghost">
                      <PlusIcon class="size-4" />
                    </Button>
                  </PromptInputTools>
                  <PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </div>

          <div v-else-if="view === 'thread'" class="flex min-h-0 flex-1 flex-col gap-2 p-3">
            <ChatHeader>
              <ChatHeaderTitle>
                <span class="truncate">{{ title }}</span>
                <ChatHeaderProject status="connected" />
                <ChatHeaderMenu>
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem>Move to project</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </ChatHeaderMenu>
              </ChatHeaderTitle>
              <ChatHeaderActions>
                <Button aria-label="Web access" size="icon-sm" type="button" variant="ghost">
                  <GlobeIcon class="size-4" />
                </Button>
                <Button size="sm" type="button" variant="ghost">
                  <FileTextIcon class="size-3.5" />
                  {{ docs.length }}
                </Button>
                <ChatHeaderShare />
              </ChatHeaderActions>
            </ChatHeader>

            <Conversation class="min-h-0">
              <ConversationContent class="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
                <ConversationItem v-for="turn in thread" :key="turn.id" :message-id="turn.id">
                  <Message :from="turn.role">
                    <MessageContent class="gap-4">
                      <template v-for="(block, i) in turn.blocks" :key="i">
                        <template v-if="block.type === 'markdown'">
                          <template v-if="turn.role === 'user'">{{ block.text }}</template>
                          <MessageResponse v-else :content="block.text" />
                        </template>
                        <CodeBlock v-else-if="block.type === 'code'" :code="block.code" :language="block.language" />
                        <ArtifactCard v-else-if="block.type === 'archive'">
                          <ArtifactCardIcon kind="archive" />
                          <ArtifactCardBody>
                            <ArtifactCardTitle>{{ block.title }}</ArtifactCardTitle>
                            <ArtifactCardMeta>{{ block.meta }}</ArtifactCardMeta>
                          </ArtifactCardBody>
                          <ArtifactCardActions>
                            <DropdownMenuItem>Copy link</DropdownMenuItem>
                            <DropdownMenuItem>Open</DropdownMenuItem>
                          </ArtifactCardActions>
                        </ArtifactCard>
                        <ArtifactStack v-else>
                          <template v-for="id in block.ids" :key="id">
                            <ArtifactCard v-if="docById(id)" class="cursor-pointer" @click="openId = id">
                              <ArtifactCardThumbnail v-if="docById(id)?.thumbnail" />
                              <ArtifactCardIcon v-else kind="document" />
                              <ArtifactCardBody>
                                <ArtifactCardTitle>{{ docById(id)?.title }}</ArtifactCardTitle>
                                <ArtifactCardMeta>{{ docById(id)?.meta }}</ArtifactCardMeta>
                              </ArtifactCardBody>
                              <ArtifactCardActions>
                                <DropdownMenuItem>Copy link</DropdownMenuItem>
                                <DropdownMenuItem @click="openId = id">Open</DropdownMenuItem>
                              </ArtifactCardActions>
                            </ArtifactCard>
                          </template>
                          <ArtifactStackDownloadAll />
                        </ArtifactStack>
                      </template>
                    </MessageContent>
                  </Message>
                </ConversationItem>
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <ChatComposer
              class="mx-auto max-w-3xl"
              :disclaimer="composer.disclaimer"
              :models="composer.models"
              :efforts="composer.efforts"
              default-effort="medium"
              :modes="composer.modes"
              @attach="() => {}"
              @speech="() => {}"
            />
          </div>

          <div v-else class="min-h-0 flex-1 overflow-y-auto">
            <div class="mx-auto w-full max-w-[920px] px-5 py-[30px] sm:px-[34px]">
              <h1 class="font-serif text-[30px] leading-tight font-normal tracking-[-0.3px]">Library</h1>

              <div class="mt-[18px] flex flex-wrap items-center justify-between gap-2">
                <Tabs v-model="tab">
                  <TabsList variant="pills">
                    <TabsTrigger v-for="t in tabs" :key="t.value" :value="t.value">{{ t.label }}</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div class="flex items-center gap-1">
                  <Button aria-label="Search" size="icon-sm" type="button" variant="ghost">
                    <SearchIcon class="size-4" />
                  </Button>
                  <Button aria-label="Grid view" size="icon-sm" type="button" variant="ghost">
                    <LayoutGridIcon class="size-4" />
                  </Button>
                  <Button size="sm" type="button" variant="secondary">
                    Edmi Design
                    <ChevronDownIcon />
                  </Button>
                </div>
              </div>

              <Card v-if="bannerOpen" class="mt-[18px] flex-row items-start justify-between gap-3 px-4 py-3.5">
                <div>
                  <div class="text-sm font-semibold">{{ banner.title }}</div>
                  <div class="mt-0.5 text-[13.5px] text-muted-foreground">{{ banner.text }}</div>
                  <Button class="mt-2.5" size="sm" type="button" variant="secondary">
                    {{ banner.action }}
                    <ArrowUpRightIcon />
                  </Button>
                </div>
                <Button aria-label="Dismiss" size="icon-sm" type="button" variant="ghost" @click="bannerOpen = false">
                  <XIcon class="size-4" />
                </Button>
              </Card>

              <div class="mt-[22px] mb-2.5 text-[13px] text-muted-foreground">Make something new</div>
              <div class="grid grid-cols-3 gap-3.5 sm:max-w-[538px]">
                <div v-for="t in tiles" :key="t.type" class="flex flex-col gap-2">
                  <div
                    :class="`flex h-[118px] w-full items-center justify-center rounded-[calc(var(--radius)*1.4)] border border-border ${tone[t.type]}`"
                  >
                    <component :is="typeIcon[t.type]" class="size-6" />
                  </div>
                  <div class="flex items-center gap-1.5 text-sm">
                    {{ t.label }}
                    <Badge variant="secondary" class="h-[18px] text-[10.5px]">Beta</Badge>
                  </div>
                </div>
              </div>

              <section v-for="g in visible" :key="g.label">
                <div class="mt-[22px] mb-0.5 text-[13px] text-muted-foreground">{{ g.label }}</div>
                <ItemGroup>
                  <Item v-for="i in g.items" :key="i.id" class="cursor-pointer px-0 py-3" @click="openId = i.docId">
                    <span
                      :class="`inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] ${tone[i.type]}`"
                    >
                      <component :is="typeIcon[i.type]" class="size-[18px]" />
                    </span>
                    <ItemContent>
                      <ItemTitle class="text-[15px] font-normal">{{ i.title }}</ItemTitle>
                      <ItemDescription v-if="i.note">{{ i.note }}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <span class="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                        <LockIcon class="size-3.5" />
                        <span class="max-sm:hidden">{{ i.viewed }}</span>
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                          <Button aria-label="More" size="icon-sm" type="button" variant="ghost" @click.stop>
                            <MoreHorizontalIcon class="size-4 rotate-90" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            v-for="m in menu"
                            :key="m"
                            :variant="m === 'Delete' ? 'destructive' : 'default'"
                          >
                            {{ m }}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ItemActions>
                  </Item>
                </ItemGroup>
              </section>
            </div>
          </div>
        </div>

        <div
          v-if="doc"
          :class="
            expanded
              ? 'fixed inset-0 z-50 flex'
              : 'flex border-l border-border max-md:fixed max-md:inset-0 max-md:z-50 md:w-1/2 md:shrink-0'
          "
        >
          <ArtifactViewer class="h-full w-full rounded-none border-0">
            <ArtifactViewerHeader>
              <ArtifactViewerTitle :format="doc.format">{{ doc.title }}</ArtifactViewerTitle>
              <ArtifactViewerOpenIn />
              <ArtifactViewerDownload />
              <ArtifactViewerExpand @click="expanded = !expanded" />
              <ArtifactViewerClose @click="close" />
            </ArtifactViewerHeader>
            <ArtifactViewerContent>
              <ArtifactViewerPaper class="px-8 py-[30px]">
                <div class="font-mono text-[10.5px] tracking-[2px] text-[#7a7974]">
                  {{ doc.paper.kicker }}
                </div>
                <div class="mt-2.5 font-serif text-2xl leading-[1.15] font-bold">
                  {{ doc.paper.headline }}
                </div>
                <p class="mt-3 text-[12.5px] leading-[1.7] text-[#3d3c38]">
                  <template v-for="s in doc.paper.lead" :key="s.t">
                    <b v-if="s.b">{{ s.t }}</b>
                    <span v-else-if="s.link" class="text-[#3b6fd6]">{{ s.t }}</span>
                    <template v-else>{{ s.t }}</template>
                  </template>
                </p>
                <div class="mt-4 mb-2.5 h-0.5 bg-[#22406b]" />
                <div class="font-serif text-base font-bold text-[#22406b]">
                  {{ doc.paper.heading }}
                </div>
                <p class="mt-3 text-[12.5px] leading-[1.7] text-[#3d3c38]">
                  <template v-for="s in doc.paper.body" :key="s.t">
                    <b v-if="s.b">{{ s.t }}</b>
                    <template v-else>{{ s.t }}</template>
                  </template>
                </p>
              </ArtifactViewerPaper>
            </ArtifactViewerContent>
          </ArtifactViewer>
        </div>
      </div>
    </div>
  </ElevationProvider>
</template>
