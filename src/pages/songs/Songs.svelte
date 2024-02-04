<script lang="ts">
  import { type Tables } from "@/shared/lib";
  import {
    Container,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/shared/ui";
  import { afterUpdate } from "svelte";
  import { AddSong } from "./ui";
  import {
    Render,
    Subscribe,
    createRender,
    createTable,
  } from "svelte-headless-table";
  import { readable } from "svelte/store";
  import { Clock } from "lucide-svelte";

  const songs: Tables<"songs">[] = [
    {
      id: 9,
      created_at: "2024-02-03T19:41:39.472273+00:00",
      updated_at: "2024-02-03T19:41:39.472273+00:00",
      title: "Forest",
      artist: "Twenty One Pilots",
      file_path: "844be2a3-9ed5-4f7f-a3fc-8241877707c8/Forest.mp3",
      user_id: "844be2a3-9ed5-4f7f-a3fc-8241877707c8",
      duration: 251,
      picture_path: "844be2a3-9ed5-4f7f-a3fc-8241877707c8/Forest.jpeg",
      position: 1,
    },
    {
      id: 13,
      created_at: "2024-02-04T09:40:32.84511+00:00",
      updated_at: "2024-02-04T09:40:32.84511+00:00",
      title: "Right Or Wrong | beatfakaza.com",
      artist: "Juice WRLD | beatfakaza.com",
      file_path:
        "844be2a3-9ed5-4f7f-a3fc-8241877707c8/Juice-WRLD - Right-Or-Wrong.mp3",
      user_id: "844be2a3-9ed5-4f7f-a3fc-8241877707c8",
      duration: 160,
      picture_path:
        "844be2a3-9ed5-4f7f-a3fc-8241877707c8/Right Or Wrong _ beatfakaza.com.jpeg",
      position: 2,
    },
  ];

  afterUpdate(async () => {
    // if ($session?.user?.id) {
    // console.log($session?.user?.id);
    // const songs = await supabase
    //   .from("songs")
    //   .select("*")
    //   .eq("user_id", $session?.user?.id ?? "");
    // console.log(songs.data);
    // }
  });

  const table = createTable(readable(songs));
  const columns = table.createColumns([
    table.column({
      accessor: "position",
      header: "#",
    }),
    table.column({
      accessor: "title",
      header: "Title",
    }),
    table.column({
      accessor: "artist",
      header: "Artist",
    }),
    table.column({
      accessor: "duration",
      header: createRender(Clock, { size: 24 }),
      cell: ({ value }) => {
        const minutes = Math.floor(value / 60);
        const seconds = value - minutes * 60;
        return `${minutes}:${seconds}`;
      },
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
    table.createViewModel(columns);
</script>

<section>
  <Container>
    <div class="py-4 flex items-center gap-4 mb-6">
      <h1 class="text-3xl font-semibold">Your Songs</h1>
      <AddSong />
    </div>
    <div class="rounded-md border">
      <Table {...$tableAttrs}>
        <TableHeader>
          {#each $headerRows as headerRow}
            <Subscribe rowAttrs={headerRow.attrs()}>
              <TableRow>
                {#each headerRow.cells as cell (cell.id)}
                  <Subscribe
                    attrs={cell.attrs()}
                    let:attrs
                    props={cell.props()}
                  >
                    <TableHead {...attrs}>
                      <Render of={cell.render()} />
                    </TableHead>
                  </Subscribe>
                {/each}
              </TableRow>
            </Subscribe>
          {/each}
        </TableHeader>
        <TableBody {...$tableBodyAttrs}>
          {#each $pageRows as row (row.id)}
            <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
              <TableRow {...rowAttrs}>
                {#each row.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs>
                    <TableCell {...attrs}>
                      <Render of={cell.render()} />
                    </TableCell>
                  </Subscribe>
                {/each}
              </TableRow>
            </Subscribe>
          {/each}
        </TableBody>
      </Table>
    </div>
  </Container>
</section>

<style>
</style>
