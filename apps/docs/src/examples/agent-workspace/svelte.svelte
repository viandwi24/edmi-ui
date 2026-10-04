<script lang="ts">
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { AgentAvatar } from "@edmi-svelte/ai/agent-avatar";
	import {
		Message,
		MessageContent,
		MessageResponse,
	} from "@edmi-svelte/ai/message";
	import {
		PromptInput,
		PromptInputBody,
		PromptInputFooter,
		PromptInputHeader,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
	} from "@edmi-svelte/ai/prompt-input";
	import { PromptInputAgent } from "@edmi-svelte/ai/prompt-input-agent";
	import { Reasoning, ReasoningContent, ReasoningTrigger } from "@edmi-svelte/ai/reasoning";
	import { Suggestion } from "@edmi-svelte/ai/suggestion";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import * as InsetPanel from "@edmi-svelte/ui/inset-panel";
	import * as Item from "@edmi-svelte/ui/item";
	import * as Tabs from "@edmi-svelte/ui/tabs";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		agent,
		agentReply,
		composerPlaceholder,
		index,
		reasoning,
		reply,
		suggestions,
		tabs,
		userMessage,
	} from "./data";

	const sectionLabel = "mt-[22px] mb-2.5 text-[15px] text-foreground-2";
	const panels = ["agent", "index"];
</script>

<ElevationProvider mode="layered">
<div class="flex min-h-svh items-start justify-center gap-6 bg-background p-6 text-foreground">
	{#each panels as value, n (value)}
		<div class={n === 0 ? "w-full max-w-[440px]" : "hidden w-full max-w-[440px] min-[960px]:block"}>
			<Tabs.Root {value} class="h-[calc(100svh-3rem)] max-h-[900px] w-full max-w-[440px] gap-0">
				<InsetPanel.Root class="h-full">
					<InsetPanel.Header class="px-3.5">
						<Tabs.List variant="pills">
							{#each tabs as t (t)}
								<Tabs.Trigger value={t.toLowerCase()}>{t}</Tabs.Trigger>
							{/each}
						</Tabs.List>
					</InsetPanel.Header>
					<InsetPanel.Body class="flex flex-col">
						<Tabs.Content value="agent" class="flex min-h-0 flex-1 flex-col">
							<div class="min-h-0 flex-1 overflow-y-auto px-5 py-4">
								<div class="flex items-center justify-between gap-2">
									<Reasoning defaultOpen={false} duration={4} class="min-w-0 flex-1">
										<ReasoningTrigger getThinkingMessage={() => reasoning.label} />
										<ReasoningContent content={reasoning.text} />
									</Reasoning>
									<Button aria-label="More" size="icon-xs" type="button" variant="ghost">
										<IconPlaceholder
											lucide="MoreHorizontalIcon"
											tabler="IconDots"
											hugeicons="MoreHorizontalCircle01Icon"
											phosphor="DotsThreeOutlineIcon"
											remixicon="RiMoreLine"
											class="size-4"
										/>
									</Button>
								</div>
								<div class="mt-3 flex flex-col gap-[18px]">
									<Message from="assistant">
										<MessageContent>
											<MessageResponse content={reply} />
										</MessageContent>
									</Message>
									<Message from="user">
										<MessageContent>{userMessage}</MessageContent>
									</Message>
									<Message from="assistant">
										<div class="flex items-center gap-2 text-sm text-muted-foreground">
											<AgentAvatar seed={agent.id} color={agent.color} size={19} tile={false} />
											{agent.name}
										</div>
										<MessageContent>{agentReply}</MessageContent>
									</Message>
									<div class="flex flex-col gap-2">
										{#each suggestions as s (s.title)}
											<Suggestion suggestion={s.title} variant="card" class="w-full bg-card">
												{s.note}
											</Suggestion>
										{/each}
									</div>
								</div>
							</div>
							<div class="px-2.5 pb-2.5">
								<PromptInput onSubmit={() => {}} class="[&_[data-slot=input-group]]:bg-muted">
									<PromptInputHeader>
										<PromptInputAgent {agent} />
									</PromptInputHeader>
									<PromptInputBody>
										<PromptInputTextarea placeholder={composerPlaceholder} />
									</PromptInputBody>
									<PromptInputFooter>
										<PromptInputTools />
										<PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
									</PromptInputFooter>
								</PromptInput>
							</div>
						</Tabs.Content>

						<Tabs.Content value="index" class="flex min-h-0 flex-1 flex-col">
							<div class="min-h-0 flex-1 overflow-y-auto px-[18px] pt-[18px] pb-6">
								<div class="flex items-center justify-between">
									<span class="text-xl font-medium">{index.name}</span>
									<Button
										aria-label="Edit"
										size="icon-sm"
										type="button"
										variant="outline"
										class="rounded-full"
									>
										<IconPlaceholder
											lucide="PencilIcon"
											tabler="IconPencil"
											hugeicons="PencilEdit01Icon"
											phosphor="PencilSimpleIcon"
											remixicon="RiPencilLine"
											class="size-4"
										/>
									</Button>
								</div>

								<div class={sectionLabel}>Stack</div>
								<Card class="gap-0 py-0">
									<Item.Group>
										{#each index.stack as row, i (row.title)}
											<div>
												{#if i > 0}<Item.Separator class="my-0" />{/if}
												<Item.Root>
													<Item.Media variant="icon">
														{#if row.icon === "domain"}
															<IconPlaceholder
																lucide="GlobeIcon"
																tabler="IconWorld"
																hugeicons="Globe02Icon"
																phosphor="GlobeIcon"
																remixicon="RiGlobalLine"
															/>
														{:else if row.icon === "email"}
															<IconPlaceholder
																lucide="MailIcon"
																tabler="IconMail"
																hugeicons="Mail01Icon"
																phosphor="EnvelopeSimpleIcon"
																remixicon="RiMailLine"
															/>
														{:else if row.icon === "fees"}
															<IconPlaceholder
																lucide="CreditCardIcon"
																tabler="IconCreditCard"
																hugeicons="CreditCardIcon"
																phosphor="CreditCardIcon"
																remixicon="RiBankCardLine"
															/>
														{:else}
															<IconPlaceholder
																lucide="ServerIcon"
																tabler="IconServer"
																hugeicons="ServerStackIcon"
																phosphor="HardDrivesIcon"
																remixicon="RiHardDriveLine"
															/>
														{/if}
													</Item.Media>
													<Item.Content>
														<Item.Title>{row.title}</Item.Title>
														<Item.Description>{row.note}</Item.Description>
													</Item.Content>
													<Item.Actions>
														<Button elevation="raised" size="sm" type="button" variant="outline">{row.action}</Button>
													</Item.Actions>
												</Item.Root>
											</div>
										{/each}
									</Item.Group>
								</Card>

								<div class={sectionLabel}>Important links</div>
								<Card class="gap-0 py-0">
									<Item.Group>
										{#each index.links as row, i (row.title)}
											<div>
												{#if i > 0}<Item.Separator class="my-0" />{/if}
												<Item.Root size="sm">
													<Item.Content>
														<Item.Title>{row.title}</Item.Title>
														<Item.Description>{row.note}</Item.Description>
													</Item.Content>
													<IconPlaceholder
														lucide="ChevronRightIcon"
														tabler="IconChevronRight"
														hugeicons="ArrowRight01Icon"
														phosphor="CaretRightIcon"
														remixicon="RiArrowRightSLine"
														class="size-4 text-muted-foreground"
													/>
												</Item.Root>
											</div>
										{/each}
									</Item.Group>
								</Card>

								<div class={sectionLabel}>Agents</div>
								<Card class="gap-0 py-0">
									<Item.Group>
										{#each index.agents as row, i (row.id)}
											<div>
												{#if i > 0}<Item.Separator class="my-0" />{/if}
												<Item.Root>
													<Item.Media>
														<AgentAvatar seed={row.id} color={row.color} size={40} />
													</Item.Media>
													<Item.Content>
														<Item.Title>{row.name}</Item.Title>
														<Item.Description>{row.note}</Item.Description>
													</Item.Content>
												</Item.Root>
											</div>
										{/each}
									</Item.Group>
								</Card>
							</div>
						</Tabs.Content>

						{#each ["tasks", "library"] as v (v)}
							<Tabs.Content value={v} class="p-5 text-sm text-muted-foreground">
								Nothing here yet.
							</Tabs.Content>
						{/each}
					</InsetPanel.Body>
				</InsetPanel.Root>
			</Tabs.Root>
		</div>
	{/each}
</div>
</ElevationProvider>
