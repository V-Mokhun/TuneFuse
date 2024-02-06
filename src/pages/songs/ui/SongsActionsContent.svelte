<script lang="ts">
  import { session, supabase, type Tables } from "@/shared/lib";
  import {
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    Input,
    Separator,
  } from "@/shared/ui";
  import {
    ChevronRight,
    Heart,
    ListPlus,
    Plus,
    PlusCircle,
    Search,
    Trash,
    XCircle,
  } from "lucide-svelte";
  import { toast } from "svelte-sonner";

  export let song: Tables<"songs">;
  export let playlists: Tables<"playlists">[] = [];
  export let playlistId: string | undefined = undefined;

  const buttonClasses =
    "flex items-center gap-1 w-full rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

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

  async function handleAddToPlaylist(playlistId: number) {
    //TODO: Check if song exists in a playlist, if so then open a modal to confirm the action
    const { count } = await supabase
      .from("playlist_song")
      .select("*", { count: "exact", head: true })
      .match({ playlist_id: playlistId, user_id: $session!.user.id });

    supabase
      .from("playlist_song")
      .insert({
        playlist_id: playlistId,
        song_id: song.id,
        user_id: $session!.user.id,
        position: (count ?? 0) + 1,
      })
      .then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        } else {
          toast.success("Song added to playlist");
        }
      });
  }

  async function handleAddToNewPlaylist() {
    try {
      const { data } = await supabase
        .from("playlists")
        .insert([
          {
            name: song.title,
            picture_path: song.picture_path,
            user_id: $session!.user.id,
          },
        ])
        .select("id");

      if (data) {
        await supabase.from("playlist_song").insert({
          playlist_id: data[0].id,
          song_id: song.id,
          user_id: $session!.user.id,
          position: 1,
        });

        toast.success("Song added to new playlist");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    }
  }
</script>

<DropdownMenuSub
  open={true || subMenuOpen}
  onOpenChange={(open) => (subMenuOpen = open)}
>
  <DropdownMenuSubTrigger
    class="gap-1"
    on:pointermove={() => {
      subMenuOpen = true;
    }}
    on:pointerleave={() => {
      subMenuOpen = false;
    }}
    on:focusin={() => {
      subMenuOpen = true;
    }}
    on:focusout={() => {
      subMenuOpen = false;
    }}
  >
    <Plus class="w-5 h-5" />
    <span class="flex-1 text-left">Add to playlist</span>
    <ChevronRight class="w-5 h-5" />
  </DropdownMenuSubTrigger>
  <DropdownMenuSubContent
    class="rounded-sm min-w-60"
    fitViewport
    overlap
    on:pointermove={() => (subMenuOpen = true)}
  >
    <div class="relative mb-1">
      <Search
        size={20}
        class="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400"
      />
      <Input type="text" class="pl-8 max-w-xs" placeholder="Find a playlist" />
    </div>
    <button
      class={buttonClasses}
      type="button"
      on:click={handleAddToNewPlaylist}
    >
      <PlusCircle class="w-5 h-5" />
      <span>New playlist</span>
    </button>
    <Separator />
    <ul>
      {#each playlists as playlist (playlist.id)}
        <li>
          <button
            class={buttonClasses}
            type="button"
            on:click={() => handleAddToPlaylist(playlist.id)}
          >
            <span>{playlist.name}</span>
          </button>
        </li>
      {/each}
    </ul>
  </DropdownMenuSubContent>
</DropdownMenuSub>
{#if playlistId}
  <button class={buttonClasses} type="button">
    <XCircle class="w-5 h-5" />
    <span>Remove from this playlist</span>
  </button>
{/if}
<button class={buttonClasses} type="button" on:click={handleLikeSong}>
  {#if song.isLiked}
    <PlusCircle class="w-5 h-5" />
  {:else}
    <Heart class="w-5 h-5" />
  {/if}
  <span>{song.isLiked ? "Remove from" : "Add to"} your Liked Songs</span
  ></button
>
<button class={buttonClasses} type="button">
  <ListPlus class="w-5 h-5" />
  <span>Add to queue</span>
</button>
<button class={buttonClasses} type="button" on:click={handleDeleteSong}>
  <Trash class="w-5 h-5" />
  <span>Delete this song</span>
</button>

<style>
</style>
