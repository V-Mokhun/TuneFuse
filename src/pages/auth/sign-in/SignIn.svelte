<script lang="ts">
  import { Context, getSessionContext, supabase } from "@/shared/lib";
  import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Separator,
  } from "@/shared/ui";
  import { Link, navigate } from "svelte-routing";
  import type { AuthSchema } from "../schema";
  import { AuthForm, SocialAuthForm } from "../ui";
  import { SIGN_UP_ROUTE } from "@/shared/consts";

  const session = getSessionContext();

  $: if ($session) navigate("/", { replace: true });

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
      <SocialAuthForm />
      <Separator class="my-6" />
      <AuthForm onSubmit={onSignIn} />
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <Link class="underline hover:no-underline" to={SIGN_UP_ROUTE}>Sign up</Link>
      </div>
    </CardContent>
  </Card>
</section>

<style>
</style>
