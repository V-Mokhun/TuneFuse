<script lang="ts">
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from "@/shared/ui";
  import { MoreHorizontal } from "lucide-svelte";

  export let id: number;
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
    <DropdownMenuItem>Add to playlist</DropdownMenuItem>
    <DropdownMenuItem>Remove from this playlist</DropdownMenuItem>
    <DropdownMenuItem>Save to your Liked Songs</DropdownMenuItem>
    <DropdownMenuItem>Add to queue</DropdownMenuItem>
    <DropdownMenuItem>Delete this song</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

<style>
</style>
