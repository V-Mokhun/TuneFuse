<script lang="ts">
  import { supabase, type Tables } from "@/shared/lib";
  import {
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
  } from "@/shared/ui";
  import {
    ChevronRight,
    Heart,
    ListPlus,
    Plus,
    PlusCircle,
    Trash,
    XCircle,
  } from "lucide-svelte";
  import { toast } from "svelte-sonner";

  export let song: Tables<"songs">;
  export let playlistId: string | undefined = undefined;

  let subMenuOpen = false;

  function handleLikeSong() {
    supabase
      .from("songs")
      .update({ isLiked: !song.isLiked })
      .eq("id", song.id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        } else {
          toast.success(
            `${song.isLiked ? "Removed from" : "Added to"} your Liked Songs`
          );
        }
      });
  }

  function handleDeleteSong() {
    supabase
      .from("songs")
      .delete()
      .eq("id", song.id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        } else {
          toast.success("Song deleted");
        }
      });
  }
</script>

<DropdownMenuItem asChild>
  <DropdownMenuSub
    open={subMenuOpen}
    onOpenChange={(open) => (subMenuOpen = open)}
  >
    <DropdownMenuSubTrigger
      on:pointermove={() => {
        subMenuOpen = true;
      }}
      on:pointerleave={() => {
        subMenuOpen = false;
      }}
    >
      <Plus class="w-5 h-5" />
      <span class="flex-1 text-left">Add to playlist</span>
      <ChevronRight class="w-5 h-5" />
    </DropdownMenuSubTrigger>
    <DropdownMenuSubContent
      class="rounded-sm"
      fitViewport
      overlap
      on:pointermove={() => (subMenuOpen = true)}
    >
      Hello</DropdownMenuSubContent
    >
  </DropdownMenuSub>
</DropdownMenuItem>
{#if playlistId}
  <DropdownMenuItem asChild>
    <button
      class="flex items-center gap-1 w-full rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      type="button"
    >
      <XCircle class="w-5 h-5" />
      <span>Remove from this playlist</span>
    </button>
  </DropdownMenuItem>
{/if}
<DropdownMenuItem asChild>
  <button
    class="flex items-center gap-1 w-full rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    type="button"
    on:click={handleLikeSong}
  >
    {#if song.isLiked}
      <PlusCircle class="w-5 h-5" />
    {:else}
      <Heart class="w-5 h-5" />
    {/if}
    <span>{song.isLiked ? "Remove from" : "Add to"} your Liked Songs</span
    ></button
  >
</DropdownMenuItem>
<DropdownMenuItem asChild>
  <button
    class="flex items-center gap-1 w-full rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    type="button"
  >
    <ListPlus class="w-5 h-5" />
    <span>Add to queue</span>
  </button>
</DropdownMenuItem>
<DropdownMenuItem asChild
  ><button
    class="flex items-center gap-1 w-full rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    type="button"
    on:click={handleDeleteSong}
  >
    <Trash class="w-5 h-5" />
    <span>Delete this song</span>
  </button></DropdownMenuItem
>

<style>
</style>
