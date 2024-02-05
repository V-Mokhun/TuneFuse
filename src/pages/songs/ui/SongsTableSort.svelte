<script lang="ts">
  import { cn } from "@/shared/lib";
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/shared/ui";
  import { ArrowDown, ArrowUp, Check, List } from "lucide-svelte";
  import type { WritableSortKeys } from "svelte-headless-table/plugins";

  const SORT_KEYS = [
    { id: "created_at", text: "Date added" },
    { id: "title", text: "Title" },
    { id: "artist", text: "Artist" },
    { id: "duration", text: "Duration" },
  ];

  export let sortKeys: WritableSortKeys;
  $: console.log($sortKeys);

  const onSortClick = (id: string) => {
    sortKeys.toggleId(id, {
      multiSort: false,
      toggleOrder: ["asc", "desc"],
    });
  };
</script>

<DropdownMenu>
  <DropdownMenuTrigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      class="px-1 flex items-center gap-1 h-8"
    >
      <List class="w-4 h-4" />
      <span>{$sortKeys[0].id}</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem
        class={cn("flex items-center gap-1", {
          "text-primary data-[highlighted]:text-primary":
            $sortKeys[0].id === "position",
        })}
        on:click={() =>
          sortKeys.toggleId("position", {
            multiSort: false,
            toggleOrder: ["asc"],
          })}
      >
        <span>Custom order</span>
        {#if $sortKeys[0].id === "position"}
          <Check class="w-4 h-4" />
        {/if}
      </DropdownMenuItem>
      {#each SORT_KEYS as sortKey}
        <DropdownMenuItem
          class={cn("flex items-center gap-1", {
            "text-primary data-[highlighted]:text-primary":
              $sortKeys[0].id === sortKey.id,
          })}
          on:click={() => onSortClick(sortKey.id)}
        >
          <span>{sortKey.text}</span>
          {#if $sortKeys[0].id === sortKey.id}
            {#if $sortKeys[0].order === "asc"}
              <ArrowUp class="w-4 h-4" />
            {:else}
              <ArrowDown class="w-4 h-4" />
            {/if}
          {/if}
        </DropdownMenuItem>
      {/each}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>

<style>
</style>
