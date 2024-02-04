<script lang="ts">
  import { SignIn, SignUp, Songs } from "@/pages";
  import {
    HOME_ROUTE,
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE,
    SONGS_ROUTE,
  } from "@/shared/consts";
  import { session, supabase } from "@/shared/lib";
  import { onMount } from "svelte";
  import { Route, Router } from "svelte-routing";
  import Layout from "./Layout.svelte";

  export let url = "";

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      $session = data.session;
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      $session = _session;
    });
  });
</script>

<Router {url}>
  <Route path={SIGN_IN_ROUTE}>
    <Layout showSidebar={false} showBasicHeader>
      <SignIn />
    </Layout>
  </Route>
  <Route path={SIGN_UP_ROUTE}>
    <Layout showSidebar={false} showBasicHeader>
      <SignUp />
    </Layout>
  </Route>
  <Route path={HOME_ROUTE}>
    <Layout>
      <h1>Home</h1>
    </Layout>
  </Route>
  <Route path={SONGS_ROUTE}>
    <Layout>
      <Songs />
    </Layout>
  </Route>
</Router>

<style>
</style>
