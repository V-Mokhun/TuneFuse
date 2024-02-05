<script lang="ts">
  import { cn, supabase, type Tables } from "@/shared/lib";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/shared/ui";
  import { Clock } from "lucide-svelte";
  import {
    Render,
    Subscribe,
    createRender,
    createTable,
  } from "svelte-headless-table";
  import { addSortBy } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import SongsTableActions from "./SongsTableActions.svelte";
  import SongsTableTitleCol from "./SongsTableTitleCol.svelte";
  import SongsTableSort from "./SongsTableSort.svelte";

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
      isLiked: false,
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
      isLiked: false,
    },
  ];

  const table = createTable(readable(songs), {
    sort: addSortBy({
      disableMultiSort: true,
      toggleOrder: ["asc", "desc"],
      initialSortKeys: [
        {
          id: "created_at",
          order: "desc",
        },
      ],
    }),
  });
  const columns = table.createColumns([
    table.column({
      accessor: "created_at",
      header: "",
    }),
    table.column({
      accessor: "position",
      header: "#",
    }),
    table.column({
      id: "title",
      accessor: (item) => ({
        pictureUrl: item.picture_path,
        title: item.title,
      }),
      header: "Title",
      cell: ({ value: { pictureUrl, title } }) => {
        const publicUrl = pictureUrl
          ? supabase.storage.from("songs-pictures").getPublicUrl(pictureUrl)
          : null;

        return createRender(SongsTableTitleCol, {
          pictureUrl: publicUrl?.data.publicUrl,
          title,
        });
      },
      plugins: {
        sort: {
          getSortValue: (item) => item.title,
        },
      },
    }),
    table.column({
      accessor: "artist",
      header: "Artist",
    }),
    table.column({
      accessor: "duration",
      header: createRender(Clock, { size: 24, class: "block w-full" }),
      cell: ({ value }) => {
        const minutes = Math.floor(value / 60);
        const seconds = value - minutes * 60;
        return `${minutes}:${seconds}`;
      },
    }),
    table.column({
      accessor: (item) => item,
      header: "",
      cell: ({ value }) => {
        return createRender(SongsTableActions, { song: value });
      },
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
  const { sortKeys } = pluginStates.sort;
</script>

<div class="flex items-center justify-between gap-4">
  <SongsTableSort {sortKeys} />
</div>
<div class="rounded-md border">
  <Table {...$tableAttrs}>
    <TableHeader>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <TableRow>
            {#each headerRow.cells as cell (cell.id)}
              {#if cell.id !== "created_at"}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <TableHead {...attrs}>
                    <Render of={cell.render()} />
                  </TableHead>
                </Subscribe>
              {/if}
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
              {#if cell.id !== "created_at"}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <TableCell
                    class={cn({
                      "truncate max-w-56": true,
                      "py-4 px-2 text-center":
                        cell.id === "" || cell.id === "duration",
                    })}
                    {...attrs}
                  >
                    <Render of={cell.render()} />
                  </TableCell>
                </Subscribe>
              {/if}
            {/each}
          </TableRow>
        </Subscribe>
      {/each}
    </TableBody>
  </Table>
</div>

<style>
</style>
