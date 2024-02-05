<script lang="ts">
  import { cn } from "@/shared/lib";
  import type { Action } from "svelte/action";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLTableRowElement> & {
    "data-state"?: unknown;
    action?: Action;
  };

  let className: $$Props["class"] = undefined;
  export let action: Action = () => {};
  export { className as class };
</script>

<tr
  class={cn(
    "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
    className
  )}
  {...$$restProps}
  on:click
  on:keydown
  use:action
>
  <slot />
</tr>
