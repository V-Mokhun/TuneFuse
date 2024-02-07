<script lang="ts">
  import {
    parseAudioMetadata,
    session,
    supabase,
    type TablesInsert,
  } from "@/shared/lib";
  import { buttonVariants } from "@/shared/ui";
  import { toast } from "svelte-sonner";

  let songs: FileList;

  const onAddSong = async () => {
    if (!songs) return;
    if (!$session) {
      return toast.error("You need to be signed in to add a song");
    }

    const song = songs[0];
    const metadata = ((await parseAudioMetadata(song)) ?? {}) as any;

    const invalidCharsRegex = /[^a-zA-Z0-9-_.]/g;
    const filePath = `${$session.user.id}/${song.name.replace(
      invalidCharsRegex,
      ""
    )}`;
    const picturePath = metadata.picture
      ? `${$session.user.id}/${metadata.title.replace(invalidCharsRegex, "")}.${
          metadata.picture.type.split("/")[1]
        }`
      : null;

    const lastSong = await supabase
      .from("songs")
      .select("position")
      .eq("user_id", $session.user.id)
      .order("position", { ascending: false })
      .limit(1)
      .single();

    let position = lastSong.data?.position ? lastSong.data.position + 1 : 1;

    const songData: TablesInsert<"songs"> = {
      duration: metadata.duration,
      title: metadata.title ?? "Unknown Title",
      user_id: $session.user.id,
      artist: metadata?.artist ?? "Unknown Artist",
      file_path: filePath,
      picture_path: picturePath,
      position,
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
</script>

<label class={buttonVariants({ class: "cursor-pointer" })} for="song-upload">
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

<style>
</style>
