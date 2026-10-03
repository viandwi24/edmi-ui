declare module "virtual:edmi-phosphor-icons" {
	const load: (
		name: string,
	) =>
		| Promise<{ default: import("svelte").Component<Record<string, unknown>> }>
		| undefined;
	export default load;
}
