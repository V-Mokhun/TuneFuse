<script lang="ts">
  import { session, supabase } from "@/shared/lib";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Separator,
  } from "@/shared/ui";
  import { Link, navigate } from "svelte-routing";
  import type { AuthSchema } from "../schema";
  import { AuthForm, SocialAuthForm } from "../ui";
  import { SIGN_IN_ROUTE } from "@/shared/consts";

  $: if ($session) navigate("/", { replace: true });

  const onSignUp = async (data: AuthSchema) => {
    return supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: "http://localhost:5173/",
      },
    });
  };
</script>

<section class="flex flex-col justify-center items-center h-full">
  <Card class="mx-auto max-w-sm w-full">
    <CardHeader>
      <CardTitle class="text-3xl text-center">Sign Up</CardTitle>
    </CardHeader>
    <CardContent class="w-full">
      <SocialAuthForm authType="sign-up" />
      <Separator class="my-6" />
      <AuthForm onSubmit={onSignUp} authType="sign-up" />
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <Link class="underline hover:no-underline" to={SIGN_IN_ROUTE}
          >Sign in</Link
        >
      </div>
    </CardContent>
  </Card>
</section>

<style>
</style>
