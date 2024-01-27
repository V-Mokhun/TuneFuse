<script lang="ts">
  import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Separator,
  } from "@/shared/ui";
  import { Link, navigate } from "svelte-routing";
  import type { AuthSchema } from "../schema";
  import { Context, supabase } from "@/shared/lib";
  import { AuthForm } from "../ui";
  import { getContext } from "svelte";

  const session = getContext(Context.AUTH_SESSION);
  if (session) navigate("/", { replace: true });

  const onSignIn = async (data: AuthSchema) => {
    return supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  };
</script>

<section class="flex flex-col justify-center items-center h-full">
  <Card class="mx-auto max-w-sm w-full">
    <CardHeader>
      <CardTitle class="text-3xl text-center">Sign In</CardTitle>
    </CardHeader>
    <CardContent class="w-full">
      <ul class="space-y-2">
        <li>
          <Button class="w-full" variant="outline">Sign in with Google</Button>
        </li>
        <li>
          <Button class="w-full" variant="outline">Sign in with GitHub</Button>
        </li>
        <li>
          <Button class="w-full" variant="outline">Sign in with Spotify</Button>
        </li>
      </ul>
      <Separator class="my-6" />
      <AuthForm onSubmit={onSignIn} />
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <Link class="underline hover:no-underline" to="/sign-up">Sign up</Link>
      </div>
    </CardContent>
  </Card>
</section>

<style>
</style>
