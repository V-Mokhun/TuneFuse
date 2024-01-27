<script lang="ts">
  import { supabase } from "@/shared/lib";
  import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Separator,
  } from "@/shared/ui";
  import { Link } from "svelte-routing";
  import type { AuthSchema } from "../schema";
  import { AuthForm } from "../ui";

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
      <ul class="space-y-2">
        <li>
          <Button class="w-full" variant="outline">Sign up with Google</Button>
        </li>
        <li>
          <Button class="w-full" variant="outline">Sign up with GitHub</Button>
        </li>
        <li>
          <Button class="w-full" variant="outline">Sign up with Spotify</Button>
        </li>
      </ul>
      <Separator class="my-6" />
      <AuthForm onSubmit={onSignUp} authType="sign-up" />
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <Link class="underline hover:no-underline" to="/sign-in">Sign in</Link>
      </div>
    </CardContent>
  </Card>
</section>

<style>
</style>
