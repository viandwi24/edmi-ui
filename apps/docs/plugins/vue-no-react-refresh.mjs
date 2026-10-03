// @vitejs/plugin-vue (6.0.x) transpiles the TS of every SFC itself by calling Vite's
// `transformWithOxc` with a spread of the *global* `config.oxc`. plugin-react turns
// `oxc.jsx.refresh` on globally and only applies its include/exclude filter inside Vite's own
// `vite:oxc` plugin, so Vue SFCs get React Fast Refresh calls (`var _s = $RefreshSig$()`), which
// throw "$RefreshSig$ is not defined" in the SSR runner. `include`/`exclude` on `react()` cannot
// stop this.
//
// `vite:oxc` destructures `config.oxc` when it is created (before `configResolved`), so it keeps its
// own `jsx.refresh: true` (React files still get Fast Refresh, filtered by `react({ include })`),
// while replacing the object here only changes what plugin-vue reads later. Remove once
// plugin-vue stops forwarding `jsx.refresh`.
export function vueNoReactRefresh() {
	return {
		name: "edmi:vue-no-react-refresh",
		enforce: "post",
		configResolved(config) {
			const jsx = config.oxc?.jsx;
			if (jsx && typeof jsx === "object" && jsx.refresh) {
				config.oxc.jsx = { ...jsx, refresh: false };
			}
		},
	};
}
