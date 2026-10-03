import Animated from "./Animated.vue";
import Temporary from "./Temporary.vue";

export { Animated, Temporary };

/** Same shape as the React port: `edgeTypes = { animated: Edge.Animated, temporary: Edge.Temporary }` (wrap in `markRaw`). */
export const Edge = { Animated, Temporary };
