<script lang="ts">
	import { cn } from "@/shared/lib";
	import type { HTMLTableAttributes } from "svelte/elements";

	type $$Props = HTMLTableAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div class="w-full overflow-auto">
	<table class={cn("w-full caption-bottom", className)} {...$$restProps}>
		<slot />
	</table>
</div>
