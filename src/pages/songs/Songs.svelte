<script lang="ts">
  import {
    parseAudioMetadata,
    supabase,
    type TablesInsert,
    session,
  } from "@/shared/lib";
  import { buttonVariants, Container } from "@/shared/ui";
  import { afterUpdate, onMount } from "svelte";
  import { toast } from "svelte-sonner";

  let songs: FileList;

  const onAddSong = async () => {
    if (!songs) return;
    if (!$session) {
      return toast.error("You need to be signed in to add a song");
    }

    const song = songs[0];
    const metadata = ((await parseAudioMetadata(song)) ?? {}) as any;
    const filePath = `${$session.user.id}/${song.name}`;
    const picturePath = metadata.picture
      ? `${$session.user.id}/${metadata.title.replace(/[<>:"/\\|?*]/g, "_")}.${
          metadata.picture.type.split("/")[1]
        }`
      : null;

    const songData: TablesInsert<"songs"> = {
      duration: metadata.duration,
      title: metadata.title ?? "Unknown Title",
      user_id: $session.user.id,
      artist: metadata?.artist ?? "Unknown Artist",
      file_path: filePath,
      picture_path: picturePath,
      position: 2,
    };

    const promiseArray = [
      supabase.storage.from("songs").upload(filePath, song, {
        upsert: true,
      }),
      supabase.from("songs").insert(songData),
    ];

    if (picturePath) {
      promiseArray.push(
        supabase.storage
          .from("songs-pictures")
          .upload(picturePath, metadata.picture, {
            upsert: true,
          })
      );
    }

    try {
      const arr = await Promise.all(promiseArray);

      arr.forEach((res) => {
        if (res.error) {
          throw res.error;
        }
      });

      toast.success(`Song ${song.name} uploaded successfully`);
    } catch (error) {
      console.log("Upload song error", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to upload song");
      }
    }
  };

  afterUpdate(async () => {
    if ($session?.user?.id) {
      console.log($session?.user?.id);
      // const songs = await supabase
      //   .from("songs")
      //   .select("*")
      //   .eq("user_id", $session?.user?.id ?? "");
    }
  });
</script>

<section>
  <Container>
    <div class="py-4 flex items-center gap-4 mb-6">
      <h1 class="text-3xl font-semibold">Your Songs</h1>
      <label
        class={buttonVariants({ class: "cursor-pointer" })}
        for="song-upload"
      >
        <span>Add a Song</span>
        <input
          id="song-upload"
          type="file"
          accept="audio/*"
          class="visually-hidden"
          bind:files={songs}
          on:change={onAddSong}
        />
      </label>
    </div>
  </Container>
</section>

<style>
</style>
