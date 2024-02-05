<script lang="ts">
  import { Input } from "@/shared/ui";
  import { Search } from "lucide-svelte";
  import type { Writable } from "svelte/store";

  export let filterValue: Writable<string>;
</script>

<div class="relative">
  <Search
    size={24}
    class="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400"
  />
  <Input
    type="text"
    bind:value={$filterValue}
    class="pl-8 max-w-xs"
    placeholder="Search songs"
  />
</div>

<style>
</style>
