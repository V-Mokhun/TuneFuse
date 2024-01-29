<script lang="ts" context="module">
  export type AuthType = "sign-in" | "sign-up";
</script>

<script lang="ts">
  import { Button, Input, Label } from "@/shared/ui";
  import { AuthError, type AuthResponse } from "@supabase/supabase-js";
  import { ZodError } from "zod";
  import { authSchema, type AuthSchema } from "../schema";
  import { navigate } from "svelte-routing";
  export let onSubmit: (data: AuthSchema) => Promise<AuthResponse>;
  export let authType: AuthType = "sign-in";

  let loading = false;
  let email = "";
  let password = "";
  let emailError = "";
  let passwordError = "";

  const handleSubmit = async () => {
    loading = true;
    emailError = "";
    passwordError = "";

    try {
      const formData = authSchema.parse({ email, password });
      await onSubmit(formData);

      emailError = "";
      passwordError = "";
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0] === "email") {
            emailError = err.message;
          } else if (err.path[0] === "password") {
            passwordError = err.message;
          }
        });
      } else if (error instanceof AuthError) {
      }
    } finally {
      loading = false;
    }
  };
</script>

<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
  <div class="space-y-2">
    <Label for="email">Email</Label>
    <Input
      disabled={loading}
      bind:value={email}
      id="email"
      placeholder="m@example.com"
      type="email"
    />
    {#if emailError}
      <p class="text-xs font-light text-destructive">{emailError}</p>
    {/if}
  </div>
  <div class="space-y-2">
    <Label for="password">Password</Label>
    <Input
      disabled={loading}
      bind:value={password}
      id="password"
      type="password"
    />
    {#if passwordError}
      <p class="text-xs font-light text-destructive">{passwordError}</p>
    {/if}
  </div>
  <Button disabled={loading} class="w-full" type="submit"
    >Sign {authType === "sign-in" ? "in" : "up"}</Button
  >
</form>

<style>
</style>
