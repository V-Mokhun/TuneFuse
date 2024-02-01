<script lang="ts">
  import { Toaster } from "@/shared/ui";
  import { Header, Sidebar } from "@/widgets";
  export let showBasicHeader = false;
</script>

<Toaster richColors />

<Sidebar />
<div class="h-full flex flex-col flex-1">
  <Header {showBasicHeader} />
  <main class="flex-1 px-4">
    <slot />
  </main>
  <footer></footer>
</div>

<style>
</style>
