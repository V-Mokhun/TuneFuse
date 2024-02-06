<script lang="ts">
  import { type Tables } from "@/shared/lib";
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/shared/ui";
  import { MoreHorizontal } from "lucide-svelte";
  import SongsActionsContent from "./SongsActionsContent.svelte";

  export let song: Tables<"songs">;
  export let playlistId: number | undefined = undefined;
</script>

<DropdownMenu>
  <DropdownMenuTrigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative w-6 h-6 p-0"
    >
      <span class="sr-only">Open menu</span>
      <MoreHorizontal class="w-4 h-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <SongsActionsContent {song} {playlistId} />
  </DropdownMenuContent>
</DropdownMenu>

<style>
</style>
